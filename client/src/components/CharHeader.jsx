import React from 'react';
import { Link } from '@reach/router';
import './details.css';

const CharHeader = () => {
    return (
      <nav id="navbar-homepage" className="navbar justify-content-between flex-nowrap flex-row">
      <div className="container">
        <Link className ="navbar-brand float-left nav-item-home" to="/" >Home</Link> 
        <ul className="nav navbar-nav flex-row float-right">
            <li className="nav-item"><Link className ="nav-link pr-3 nav-item-home" to="/charity-dashboard">Dashboard </Link></li>
            <li className="nav-item"><Link className ="nav-link nav-item-home" to="">Logout </Link></li>
        </ul>
      </div>
    </nav>
    );
};

export default CharHeader;