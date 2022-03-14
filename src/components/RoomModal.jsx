import { useRef, useState } from "react"
import { FaTimes } from "react-icons/fa"
import { useDispatch } from "react-redux"
import { createRoom } from "../http"
import { addARoom } from "../features/roomsSlice"
import { useHistory } from "react-router-dom"

const roomTypes = [
    { src: 'globe.png', text: 'Open' },
    { src: 'users.png', text: 'Social' },
    { src: 'lock.png', text: 'Closed' },
]

const RoomModal = ({ setShowModal }) => {
    const dispatch = useDispatch()
    const history = useHistory()
    const inputRef = useRef(null);
    const [roomType, setRoomType] = useState("Open")

    const generateRoom = async () => {
        try {
            if (!inputRef.current.value) {
                return;
            }
            const payload = { roomType, roomName: inputRef.current.value }
            const { data } = await createRoom(payload)
            dispatch(addARoom(data))
            history.push(`/room/${data._id}`)
            inputRef.current.value = null;
            setShowModal(false)
        } catch (error) {
            console.log(error)
        }

    }

    return (
        <div className="roomModal">
            <div className="roomModal__overlay" onClick={() => setShowModal(false)} />
            <div className="roomModal__container">
                <div className="roomModal__content" >
                    <div className="roomModal__header">
                        <h2 className="roomModal__heading">Enter the topic to be discussed</h2>
                        <input ref={inputRef} type="text" className="roomModal__input" placeholder="Enter Room Name" />
                        <h2 className="roomModal__heading">Room type</h2>
                        <div className="roomModal__type">
                            {roomTypes.map(({ src, text }) => (
                                <div className={`roomModal__type__box ${roomType === text && "active"}`} key={text}
                                    onClick={() => setRoomType(text)}
                                >
                                    <img src={`/images/${src}`} alt={text.toLowerCase()} />
                                    <p>{text}</p>
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="roomModal__footer">
                        <h2 className="roomModal__heading">
                            Start a room, open to everyone
                        </h2>
                        <button className="btnprimary rooms__button" onClick={generateRoom}>
                            <img src="/images/celebrate.png" alt="celebrate" />
                            <h3>Let's Go</h3>
                        </button>
                    </div>
                </div>
                <FaTimes className="roomModal__close" onClick={() => setShowModal(false)} />
            </div>
        </div>
    )
}

export default RoomModal
