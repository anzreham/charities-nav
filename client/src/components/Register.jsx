import React, {useState} from 'react';
import UserRegister from './UserRegister';
import CharityRegister from './CharityRegister';
import { Link } from '@reach/router';
import HomeLogo from '../images/home.png';
import Home from '../images/house.png';


const Register = () => {
    const [currentUserState, setCurrentUserState]  = useState(true)
    const [currentCharityState, setCurrentCharityState]  = useState(false)

    const toggleClass=()=>{
        setCurrentUserState(!currentUserState);
        setCurrentCharityState(!currentCharityState);
    };

    return (
        <>
        <nav id="navbar-transparent" className="navbar">
            <Link className ="navbar-brand  pl-5" to="/" ><img src={`${Home}`} className="img-logo"/></Link>
        </nav>
        <div className="container register">
            <div className="row">
                <div className="col-md-3 register-left">
                    <img src={`${HomeLogo}`} alt="logo"/>
                    <h3>Welcome</h3>
                    <p>Thank you for joining us </p>
                </div>
                <div className="col-md-9 register-right">
                    <ul className="nav nav-tabs nav-justified">
                        <li className="nav-item">
                            <Link to="/register" className={`nav-link ${currentUserState ? 'active': ''}`} onClick={toggleClass}>User</Link>
                        </li>
                        <li className="nav-item">
                            <Link to="/register" className={`nav-link ${currentCharityState ? 'active': ''}`} onClick={toggleClass}>Charity</Link>
                        </li>
                    </ul>
                    <div>
                        {currentUserState==true?<UserRegister/>:<CharityRegister/>}
                        <p className="have-account">Already have an account? <Link to="/login"><span>Sign in</span></Link></p>
                    </div>
                </div>
            </div>
        </div>
        </>
    )
};

export default Register;