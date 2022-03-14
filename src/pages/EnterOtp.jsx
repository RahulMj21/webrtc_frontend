import React, { useRef } from 'react'
import { MdArrowForward } from 'react-icons/md'
import Card from '../components/Card'
import { useSelector, useDispatch } from 'react-redux'
import { selectOtp, setUser } from '../features/authSlice'
import { sendOTP } from '../http'

const EnterPin = ({ changeStep }) => {
    const otpRef = useRef(null)
    const servedOtp = useSelector(selectOtp)
    const dispatch = useDispatch()

    const sendOtp = (e) => {
        e.preventDefault()
        if (!otpRef.current.value) {
            alert("enter the otp that we have sent")
        } else {
            const data = {
                hash: servedOtp.hash,
                phone: servedOtp.phone,
                otp: otpRef.current.value
            }
            sendOTP(data).then(res => {
                const user = res.data.user
                dispatch(setUser(user))
            }).catch(err => {
                console.log(err)
            })

        }
    }

    return (
        <section className="enterpin container section__card">
            <Card logo="lock" text="Enter the Code We Just Texted You">
                <div className="inputbox" onClick={() => otpRef.current.focus()}>
                    <input type="text" ref={otpRef} className="inputbox__input" placeholder="4 digit OTP" />
                </div>
                <button className="button btnprimary" onClick={sendOtp}>
                    <p>Next</p>
                    <MdArrowForward className="btnprimary__icon" />
                </button>
                <p className="card__message">
                    By entering the code, you’re agreeing to our Terms of Service and Privacy Policy. Thank you !
                </p>
            </Card>
        </section>
    )
}

export default EnterPin
