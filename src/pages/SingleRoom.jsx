import { useEffect, useState } from "react";
import { FaArrowLeft, FaHandPeace, FaHome, FaMicrophone } from "react-icons/fa";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import ImageWithBorder from "../components/ImageWithBorder";
import { colors } from "../components/RoomsCard";
import { selectUser } from "../features/authSlice";
import { useWebRTC } from "../hooks/useWebRTC";
import { fetchCurrentRoom } from "../http";

const SingleRoom = () => {
  const { _id } = useParams();
  const user = useSelector(selectUser);
  const { clients, provideRef, handleMute } = useWebRTC(_id, user);
  const [room, setRoom] = useState(null);
  const [isMuted, setIsMuted] = useState(true);

  // this is for generate random colours
  let count;
  const getColor = () => {
    const current = Math.floor(Math.random() * 4);
    current === count ? (count = current + 1) : (count = current);
    return count;
  };

  useEffect(() => {
    handleMute(isMuted, user.id);
  }, [isMuted]);

  const handleMuteClick = (clientId) => {
    if (clientId !== user.id) return;
    setIsMuted(!isMuted);
  };

  useEffect(() => {
    const getCurrentRoom = async () => {
      try {
        const { data } = await fetchCurrentRoom(_id);
        setRoom(data.room);
      } catch (error) {
        console.log(error);
      }
    };
    getCurrentRoom();
  }, []);

  return (
    clients && (
      <section className="singleRoom">
        <div className="container">
          <Link to="/rooms">
            <h2 className="heading">
              <FaArrowLeft />
              all voice rooms
            </h2>
          </Link>
        </div>
        <div className="singleRoom__users">
          <div className="container">
            <div className="top">
              <h3 className="roomName">
                <FaHome />
                {room?.roomName}
              </h3>
              <div className="right">
                <Link to="/rooms">
                  <button>
                    <FaHandPeace />
                    leave quitely
                  </button>
                </Link>
              </div>
            </div>
            <div className="singleRoom__clients">
              {clients.map((client) => (
                <div key={client.id} className="singleRoom__client">
                  <audio
                    ref={(instance) => provideRef(instance, client.id)}
                    autoPlay
                  ></audio>
                  <div className="img">
                    <ImageWithBorder
                      src={client.userAvatar}
                      big={true}
                      color={colors[getColor()]}
                    />
                    <div
                      className="micContainer"
                      onClick={() => handleMuteClick(client.id)}
                    >
                      <span className={`mic ${client.muted ? "off" : ""}`}>
                        <FaMicrophone />
                      </span>
                    </div>
                  </div>
                  <p>{client.userName}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  );
};

export default SingleRoom;
