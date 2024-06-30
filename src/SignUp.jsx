import React from 'react'
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useState } from 'react';
import { createRoot } from 'react-dom/client';
import Message from './Message';

const SignUp = () => {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");
    const [email,setEmail] = useState("");
    const navigate = useNavigate();

    const handleRegister = (e) => {
        e.preventDefault();
        console.log({ name, password });
        axios.post("http://localhost:3001/users", { name, password, email})
            .then((result) => {
                console.log(result)
                const root = createRoot(document.getElementById('mainSingle'));
                root.render(<Message message={"Successfully Registered"} status={true} />);
                sessionStorage.setItem("userName",name);
                setTimeout(()=>{navigate(`/home/${name}`)}, 800);
            }).catch((err) => {
                console.log(err)
                const root = createRoot(document.getElementById('mainSingle'));
                root.render(<Message message={"Cannot Register"} status={false} />);
                setTimeout(()=>{navigate("/login")}, 800);
            });
    }

    return (
        <div id='mainSingle' className="loginMainPage">
            <div className="loginBox">
                <div className="logoContainer"></div>
                <div className="kceNameContainer mt-2">
                    <h1 className="kceName">KARPAGAM</h1>
                    <p className="kceCollege">COLLEGE OF ENGINEERING</p>
                    <p className="kceCollegeQuotes">Rediscover | Refine | Redefine</p>
                </div>
                <hr className="hrLine" />
                <div className="loginInputContainer">
                    <h1 className="loginHeading text-[35px] mt-6 mb-3">Sign Up</h1>
                    <form onSubmit={handleRegister}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inputBox"
                            placeholder="User Name"
                            name="username"
                        />
                        <br />
                        <input
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            type="text"
                            className="inputBox"
                            placeholder="Email"
                            name="password"
                        />
                        <br />
                        <input
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            type="password"
                            className="inputBox"
                            placeholder="Password"
                            name="password"
                        />
                        <br />
                        <div className="buttonContainer">
                            <button className="clearButton">Clear</button>
                            <button className="loginButton" type='submit'>Sign Up</button>
                        </div>
                    </form>
                    <p className="deicignedByLine signUpPageByLINE">
                        &#169; Created by Gajendran A (22-26) CSE-B
                    </p>
                </div>
            </div>
        </div>
    )
}

export default SignUp;