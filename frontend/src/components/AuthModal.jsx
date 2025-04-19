import SignUp from "../page/SignUp";
import EmailVerification from "../page/EmailVerify";
import { useState } from "react";


const AuthModal = ({onClose}) => {

    const [step, setStep] = useState("signUp");

    return (
        <>
          {step === "signup" && <SignUp onNext={() => setStep("verify")} onClose={onClose} />}
          {step === "verify" && <EmailVerification onClose={onClose} />}
        </>
  )
}

export default AuthModal