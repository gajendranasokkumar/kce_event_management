// import { Link } from "react-router-dom";

import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { createRoot } from "react-dom/client";
import Message from "./Message";
import Loader from "./Loader"


function Login() {
    const [name, setName] = useState("");
    const [password, setPassword] = useState("");


    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();
        console.log({ name, password });
        axios.post("https://emsbackend-ten.vercel.app/login", { name, password })
            .then((result) => {
                console.log(result)
                if(result.data === "Success")
                {
                    sessionStorage.setItem("userName",name);
                    const root = createRoot(document.getElementById('mainSingle'));
                    root.render(<Message message={"Login Successful"} status={true} />);
                    setTimeout(()=>{root.render(<Loader display={true} />)}, 500)
                    setTimeout(()=>{navigate(`/home/${name}`)}, 2000);  
                }
                else
                {
                    const root = createRoot(document.getElementById('mainSingle'));
                    root.render(<Message message={"No Records Found"} status={false} />);
                    setTimeout(()=>{location.reload()}, 700); 
                }
            }).catch((err) => {
                const root = createRoot(document.getElementById('mainSingle'));
                root.render(<Message message={"Login Failed"} status={false} />);
                setTimeout(()=>{navigate("/login")}, 800);  
                console.log(err)
            });
    };


    return (
        <div id="mainSingle" className="loginMainPage">
            <div className="loginBox">
                <div className="logoContainer"></div>
                <div className="kceNameContainer mt-1">
                    <h1 className="kceName">KARPAGAM</h1>
                    <p className="kceCollege">COLLEGE OF ENGINEERING</p>
                    <p className="kceCollegeQuotes">Rediscover | Refine | Redefine</p>
                </div>
                <hr className="hrLine" />
                <div className="loginInputContainer">
                    <h1 className="loginHeading text-[35px] mt-5 mb-2">Login</h1>
                    <form onSubmit={handleLogin}>
                        <input
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            className="inputBox"
                            placeholder="User Name"
                            name="name"
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
                            <button className="loginButton">Login</button>
                        </div>
                    </form>
                    <p className="singUplink mt-2">New User? <Link to="/register" className="signuplinkword">SignUp</Link> Here</p>
                    <p className="deicignedByLine mt-3">
                        {/* &#169; Created by Gajendran A (22-26) CSE-B */}
                        &#169; Developed by KCE - CSE 2024
                    </p>
                </div>
            </div>
        </div>
    );
}

export default Login;
