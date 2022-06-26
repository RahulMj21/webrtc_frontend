import React, { useState, useRef } from "react";
import Button from "../components/Button";
import Card from "../components/Card";
import { MdPhoneIphone, MdMailOutline, MdArrowForward } from "react-icons/md";
import { sendEmail, sendPhone } from "../http";
import { setOtp } from "../features/authSlice";
import { useDispatch } from "react-redux";

const EnterPhone = ({ changeStep }) => {
  const [isPhoneLogin, setIsPhoneLogin] = useState(false);
  const phoneInputRef = useRef(null);
  const emailInputRef = useRef(null);
  const dispatch = useDispatch();

  const sendPhoneNo = async (e) => {
    e.preventDefault();
    setIsPhoneLogin(false);
    //if (!phoneInputRef.current.value) {
    //alert("please enter phone no");
    // return;
    //}
    //try {
    //const { data } = await sendPhone({ phone: phoneInputRef.current.value });
    //dispatch(setOtp(data));
    //phoneInputRef.current.value = null;
    //changeStep();
    //} catch (err) {
    //  console.log(err);
    //}
  };
  const handleSubmitEmail = async (e) => {
    try {
      e.preventDefault();
      if (!emailInputRef.current.value) return;
      const { data } = await sendEmail({ email: emailInputRef.current.value });
      dispatch(setOtp(data?.data));
      emailInputRef.current.value = null;
      alert("otp has been sent to your email");
      changeStep();
    } catch (err) {
      console.log("email sending error :", err);
    }
  };

  return (
    <section className="enterphone container section__card">
      <div className="swipe">
        <div
          onClick={() => setIsPhoneLogin(!isPhoneLogin)}
          className={`swipe__phone ${isPhoneLogin && "active"}`}
        >
          <MdPhoneIphone />
        </div>
        <div
          onClick={() => setIsPhoneLogin(!isPhoneLogin)}
          className={`swipe__email ${!isPhoneLogin && "active"}`}
        >
          <MdMailOutline />
        </div>
      </div>
      {isPhoneLogin ? (
        <Card logo="telephone" text="Enter Phone Number">
          <form action="" className="input__form">
            <div
              className="inputbox"
              onClick={() => phoneInputRef.current.focus()}
            >
              <img
                src="/images/flag.svg"
                className="inputbox__logo"
                alt="flag"
              />
              <input
                type="text"
                ref={phoneInputRef}
                className="inputbox__input"
                placeholder="+91 12345 67890"
              />
            </div>
            <button className="button btnprimary" onClick={sendPhoneNo}>
              <p>Next</p>
              <MdArrowForward className="btnprimary__icon" />
            </button>
          </form>
          <p className="card__message">
            This is Feature will be added soon. Untill then you are requested to
            continue with your email.
          </p>
        </Card>
      ) : (
        <Card logo="messages" text="Enter Your Email Id">
          <form action="" className="input__form">
            <div
              className="inputbox"
              onClick={() => emailInputRef.current.focus()}
            >
              <input
                type="email"
                ref={emailInputRef}
                className="inputbox__input"
                placeholder="youremail@email.com"
              />
            </div>
            <Button text={"Next"} changeStep={handleSubmitEmail} />
          </form>
          <p className="card__message">
            By entering your email, you’re agreeing to our Terms of Service and
            Privacy Policy. Thank you !
          </p>
        </Card>
      )}
    </section>
  );
};

export default EnterPhone;
