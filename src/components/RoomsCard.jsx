import ImageWithBorder from '../components/ImageWithBorder'
import { MdPerson } from "react-icons/md"
import { useHistory } from 'react-router'
export const colors = ["#0077ff", "#f4ab36", "#20BD5F", "#E91E63", "#5453E0"]

const RoomsCard = ({ data }) => {
    const history = useHistory()
    let count;

    const getColor = () => {
        const current = Math.floor(Math.random() * 4);
        current === count ? count = current + 1 : count = current;
        return count;
    }

    const handleClick = () => {
        history.push(`/room/${data._id}`)
    }

    return (
        <div className="rooms__card" onClick={handleClick}>
            <h2>{data.roomName}</h2>
            <div className="rooms__persons">
                <div className="person__img">
                    <div>
                        <ImageWithBorder src="/images/monkey-avatar.png" color={colors[getColor()]} />
                    </div>
                    <div className="overlaped__img">
                        <ImageWithBorder src="/images/monkey-avatar.png" color={colors[getColor()]} />
                    </div>
                </div>
                <div className="person__name">
                    <p>
                        Virat Kohli
                        <img src="/images/chat.png" alt="chat" />
                    </p>
                    <p>
                        Anushka sharma
                        <img src="/images/chat.png" alt="chat" />
                    </p>
                </div>
            </div>
            <p className="rooms__personCount">
                10
                <MdPerson />
            </p>
        </div>
    )
}

export default RoomsCard
