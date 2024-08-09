import React from 'react'
import { FaBars } from "react-icons/fa6";
import { Link } from 'react-router-dom';
import Message from './Message';
import { useNavigate } from "react-router-dom";


const NavBar = ({name}) => {


    const navigate = useNavigate();

    const logoutFun = () => {
        sessionStorage.removeItem("userName");
        navigate("/login");
    }


  return (
    <div className='navContainer'>
    <nav className='homeNav'>
            <div className='navLogoContainer'>
                <img className='logo' src="https://res.cloudinary.com/dkbwdkthr/image/upload/v1694825929/kce_logo_png.png" />
                {/* <img className='logo' src="https://res.cloudinary.com/dkbwdkthr/image/upload/v1722827807/jai1.png" /> */}
                <p className='welcomeText'>Welcome! <span className='displayname'>{name}</span> </p>
            </div>
            <div className='hamburgerContainer'>
            <FaBars className='barsIcon' />

            </div>
            <div className='navOptions'>
                <ul className='optionsList'>
                    <Link to="/home" className='nav-link nav-link-ltr'>Home</Link>
                    <button className='nav-link nav-link-ltr' onClick={()=>{logoutFun()}}>Logout</button>
                </ul>
            </div>
            <div className='optionsSmallContainer'>
                <ul className='optionsList smallPopupbox'>
                    <Link to="/home" className='nav-link nav-link-ltr smallLink'>Home</Link>
                    <li className='nav-link nav-link-ltr smallLink' onClick={()=>{logoutFun()}}>Logout</li>
                </ul>
            </div>
        </nav>
    </div>
  )
}

export default NavBar