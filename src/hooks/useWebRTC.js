import { useEffect, useRef, useCallback } from "react";
import { useStateWithCallback } from "./useStateWithCallback";
import { socketInit } from "../socket";
import freeice from "freeice";

export const useWebRTC = (roomId, user) => {
  const [clients, setClients] = useStateWithCallback([]);
  const audioElements = useRef({});
  const connections = useRef({});
  const localMediaStream = useRef(null);
  const socket = useRef();
  const clientsRef = useRef([]);

  // socket initialization
  useEffect(() => {
    socket.current = socketInit();
  }, []);

  // capture media and add new user
  const addNewClient = useCallback(
    (newClient, cb) => {
      const lookingFor = clients.find((client) => client.id === newClient.id);
      if (lookingFor === undefined) {
        setClients((prev) => [...prev, newClient], cb);
      }
    },
    [clients, setClients]
  );
  useEffect(() => {
    const startCapture = async () => {
      localMediaStream.current = await navigator.mediaDevices.getUserMedia({
        audio: true,
      });
    };

    startCapture().then(() =>
      addNewClient({ ...user, muted: true }, () => {
        const localElement = audioElements.current[user.id];
        if (localElement) {
          localElement.volume = 0;
          localElement.srcObject = localMediaStream.current;
        }
        socket.current.emit("join", { roomId, user });
      })
    );

    return () => {
      // leave room
      localMediaStream.current.getTracks().forEach((track) => track.stop());
      socket.current.emit("leave");
    };
  }, []);

  // handle new Peer
  useEffect(() => {
    const handleNewPeer = async ({
      socketId,
      createOffer,
      user: remoteUser,
    }) => {
      // if already connected give warning
      if (socketId in connections.current) {
        return console.warn(
          `you are already connected with ${socketId} ${remoteUser.name}`
        );
      }

      // else create new RTCPeerConnection and do the rest
      connections.current[socketId] = new RTCPeerConnection({
        iceServers: freeice(),
      });

      // handle new icecandidates
      connections.current[socketId].onicecandidate = (e) => {
        socket.current.emit("relay_ice", {
          socketId,
          icecandidate: e.candidate,
        });
      };

      // handle ontrack on this connection add the remoteStream the remote user's audioElement
      connections.current[socketId].ontrack = ({ streams: [remoteStream] }) => {
        addNewClient({ ...remoteUser, muted: true }, () => {
          if (audioElements.current[remoteUser.id]) {
            audioElements.current[remoteUser.id].srcObject = remoteStream;
          } else {
            let setteled;
            const interval = setInterval(() => {
              if (audioElements.current[remoteUser.id]) {
                audioElements.current[remoteUser.id].srcObject = remoteStream;
                setteled = true;
              }
            }, 1000);
            if (setteled) clearInterval(interval);
          }
        });
      };

      // add all local tracks to the remote remote connection
      localMediaStream.current.getTracks().forEach((track) => {
        connections.current[socketId].addTrack(track, localMediaStream.current);
      });

      //create offer
      if (createOffer) {
        const offer = await connections.current[socketId].createOffer();

        // set offer to local description
        await connections.current[socketId].setLocalDescription(offer);

        // send offer to other clients
        socket.current.emit("relay_sdp", {
          socketId,
          sessionDescription: offer,
        });
      }
    };
    socket.current.on("add_peer", handleNewPeer);

    return () => socket.current.off("add_peer");
  }, []);

  // handle icecandidate
  useEffect(() => {
    socket.current.on("icecandidate", ({ socketId, icecandidate }) => {
      if (icecandidate)
        connections.current[socketId].addIceCandidate(icecandidate);
    });
    return () => {
      socket.current.off("icecandidate");
    };
  }, []);

  // handle sessionDescription
  useEffect(() => {
    const handleRemoteSDP = async ({
      socketId,
      sessionDescription: remoteSessionDescription,
    }) => {
      await connections.current[socketId].setRemoteDescription(
        new RTCSessionDescription(remoteSessionDescription)
      );

      // if session description type of offer then create an offer
      if (remoteSessionDescription.type === "offer") {
        const answer = await connections.current[socketId].createAnswer();
        await connections.current[socketId].setLocalDescription(answer);
        socket.current.emit("relay_sdp", {
          socketId,
          sessionDescription: answer,
        });
      }
    };
    socket.current.on("session_description", handleRemoteSDP);
    return () => {
      socket.current.off("session_description");
    };
  }, []);

  // handle remove peer
  useEffect(() => {
    const handleRemovePeer = async ({ socketId, userId }) => {
      if (connections.current[socketId]) {
        connections.current[socketId].close();
        delete connections.current[socketId];
      }
      delete audioElements.current[socketId];

      setClients((prev) => prev.filter((client) => client.id !== userId));
    };

    socket.current.on("remove_peer", handleRemovePeer);
    return () => {
      socket.current.off("remove_peer");
    };
  }, []);

  // available clients to the clientsRef
  useEffect(() => {
    clientsRef.current = clients;
  }, [clients]);

  // listen for mute/unmute
  useEffect(() => {
    const setMute = (mute, userId) => {
      const newClients = clientsRef.current.map((client) => {
        if (client.id === userId) return { ...client, muted: mute };
        return client;
      });
      setClients(newClients);
    };

    // mute
    socket.current.on("mute", ({ userId }) => {
      setMute(true, userId);
    });

    // unmute
    socket.current.on("un_mute", ({ userId }) => {
      setMute(false, userId);
    });
  }, []);

  // handling mute
  const handleMute = (isMuted, userId) => {
    console.log("handleMute", isMuted, userId);
    if (localMediaStream.current) {
      localMediaStream.current.getTracks()[0].enabled = !isMuted;
    } else {
      let setteled = false;
      const interval = setInterval(() => {
        if (localMediaStream.current) {
          localMediaStream.current.getTracks()[0].enabled = !isMuted;
          setteled = true;
        }
        if (setteled) clearInterval(interval);
      }, 200);
    }
    if (isMuted) {
      socket.current.emit("mute", {
        roomId,
        userId,
      });
    } else {
      socket.current.emit("un_mute", {
        roomId,
        userId,
      });
    }
  };

  // providing audio element
  const provideRef = (instance, userId) => {
    audioElements.current[userId] = instance;
  };

  return { clients, provideRef, handleMute };
};
