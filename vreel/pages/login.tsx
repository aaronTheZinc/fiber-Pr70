import React, { useState } from "react"
import { PrimaryButton, PrimaryInput, SecretInput } from "../components"

export default function Login(): JSX.Element {

    const [email, setEmail] = useState<string>("")
    const [password, setPassword] = useState<string>("")

    function handleLogin() {
        alert("Login Button Clicked!")
    }
    return (
        <div>
            <div>
                <PrimaryInput setValue={setEmail} placeHolder="Email" value={email} />
            </div>
            <div>
                <SecretInput setValue={setPassword} placeHolder="Password" value={password} />
            </div>
            <div>
                <PrimaryButton action={handleLogin} title="Login" />
            </div>
        </div>
    )
}