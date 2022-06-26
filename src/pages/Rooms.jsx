import React, { useEffect, useRef, useState } from "react";
import { MdSearch, MdRecordVoiceOver } from "react-icons/md";
import RoomModal from "../components/RoomModal";
import RoomsCard from "../components/RoomsCard";
import { fetchRoom } from "../http";
import { useSelector, useDispatch } from "react-redux";
import { setRooms, selectRooms } from "../features/roomsSlice";

const Rooms = () => {
  const dispatch = useDispatch();
  const rooms = useSelector(selectRooms);
  const [showModal, setShowModal] = useState(false);
  const inputRef = useRef(null);

  const fetchRoomsFromApi = async () => {
    try {
      const { data } = await fetchRoom();
      dispatch(setRooms(data));
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(async () => {
    fetchRoomsFromApi();
  }, []);

  return (
    <section className="rooms container">
      {showModal && <RoomModal setShowModal={setShowModal} />}
      <div className="rooms__head flex__between">
        <div className="flex__between">
          <h2>All Voice Rooms</h2>
        </div>
        <button
          className="btnprimary rooms__button"
          onClick={() => setShowModal(true)}
        >
          <MdRecordVoiceOver />
          <span>Start a Room</span>
        </button>
      </div>
      <div className="rooms__body">
        {!rooms || rooms.length === 0 ? (
          <h1>No Rooms to Show</h1>
        ) : (
          rooms?.map((room) => {
            return <RoomsCard key={room._id} data={room} />;
          })
        )}
      </div>
    </section>
  );
};

export default Rooms;
