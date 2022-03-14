import React, { useState } from 'react'
import PhoneOrEmail from "./PhoneOrEmail"
import EnterOtp from "./EnterOtp"

const Login = () => {
    const [step, setStep] = useState(1)

    const steps = {
        1: PhoneOrEmail,
        2: EnterOtp,
    }
    const changeStep = () => setStep(step + 1)

    const Step = steps[step]

    return (
        <Step changeStep={changeStep} />
    )
}

export default Login
