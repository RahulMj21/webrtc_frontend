import React from 'react'
import { MdArrowForward } from "react-icons/md"


const Button = ({ text, changeStep }) => {
    return (
        <button className="button btnprimary" onClick={changeStep && changeStep}>
            <p>{text}</p>
            <MdArrowForward className="btnprimary__icon" />
        </button>
    )
}

export default Button
