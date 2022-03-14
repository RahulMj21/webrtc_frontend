import React, { useState } from 'react'
import EnterName from "./EnterName"
import SelectAvatar from "./SelectAvatar"

const Register = () => {
    const [step, setStep] = useState(1)

    const changeStep = () => setStep(step + 1)

    const steps = {
        1: EnterName,
        2: SelectAvatar,
    }

    const Step = steps[step]

    return (
        <Step changeStep={changeStep} />
    )
}

export default Register
