import React, { useRef } from 'react'
import Card from '../components/Card'
import { MdArrowForward } from "react-icons/md"
import { useDispatch } from "react-redux"
import { setUserName } from '../features/activateSlice'

const EnterName = ({ changeStep }) => {
    const dispatch = useDispatch()
    const nameRef = useRef(null)
    const sendUserName = () => {
        if (!nameRef.current.value) {
            return;
        } else {
            dispatch(setUserName(nameRef.current.value))
            changeStep()
        }
    }

    return (
        <section className="name container section__card">
            <Card logo="coolface" text="Enter Your Full Name">
                <form action="" className="input__form">
                    <div className="inputbox" onClick={() => nameRef.current.focus()}>
                        <input type="text" ref={nameRef} className="inputbox__input" placeholder="Your Name" />
                    </div>
                    <button className="button btnprimary" onClick={sendUserName}>
                        <p>Next</p>
                        <MdArrowForward className="btnprimary__icon" />
                    </button>
                </form>
                <p className="card__message">
                    People uses their Name at Codershouse :)
                </p>
            </Card>
        </section>
    )
}

export default EnterName
