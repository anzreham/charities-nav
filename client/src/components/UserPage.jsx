import React, {useState, useEffect} from 'react';
import {Link } from '@reach/router';
import Man from '../images/man.png';
import Woman from '../images/woman.png';
import Home from '../images/house.png';
import EditUser from './EditUser';
import EditUserLocation from './EditUserLocation';
import UserActivities from './UserActivities';
import UserAppointments from './UserAppointments';
import UserBookAppointment from './UserBookAppointment';
import UserInfo from './UserInfo';
import Storage from './Storage';
import axios from 'axios';

const UserPage = (props) => {
    const {handleLogout} =props
    const [userid, setid] = useState(Storage.get("id"));
    const [currentTab, setCurrentTab] = useState('home')
    const [clientData, setClientData] = useState([])
    const [userData, setUserData] = useState([])
    const [userAddress, setAddress] = useState([])
    const [allActivities, setAllActivities] = useState([])
    const [userActivities, setUserActivities] = useState([])
    const [userBookings, setUserBookings] = useState([])
    const [all_categories, setAllCategory]  = useState([])
    const [all_Charities, setAllCharities]  = useState([])


    useEffect(() => {
      getUserInfo();
      getUserAddress();
      getAllActivities();
      getUserActivities();
      getUserBookings();
      getAllCharities();
      getAllCategories();
    },[ ]);
    
    const getUserInfo=()=>{
      axios
      .get(`http://localhost:7000/api/client/${userid}/?format=json`)
      .then((res) => {
          setClientData(res.data)
          setUserData(res.data.user)
        })
      .catch((err) => console.error(err));
    }
    const getUserAddress=()=>{
      axios
      .get(`http://localhost:7000/api/client/${userid}/location?format=json`)
      .then((res) => {
          setAddress(res.data)
        })
      .catch((err) => console.error(err));
    }
    const getUserActivities=()=>{
      axios
      .get(`http://localhost:7000/api/volunteers?format=json`)
      .then((res) => {
        const arr=[]
          for(let x in res.data){
            if(res.data[x].user === userid){
              arr.push(res.data[x])
            }
          }
          setUserActivities(arr)
        })
      .catch((err) => console.error(err));
    }
    const getAllActivities=()=>{
      axios
      .get(`http://localhost:7000/api/activites?format=json`)
      .then((res) => {
          setAllActivities(res.data)
        })
      .catch((err) => console.error(err));
    }
    const getUserBookings=()=>{
      axios
      .get(`http://localhost:7000/api/bookappointment/${userid}?format=json`)
      .then((res) => {
       
          setUserBookings(res.data)
        })
      .catch((err) => console.error(err));
    }
    const getAllCharities=()=>{
      axios
        .get('http://localhost:7000/api/charities/?format=json')
        .then((res) => {
          setAllCharities(res.data)
        })
        .catch((err) => console.error(err));
    }
  
    const getAllCategories=()=>{
      axios
        .get('http://localhost:7000/api/categories/?format=json')
        .then((res) => {
          setAllCategory(res.data)
        })
        .catch((err) => console.error(err));
    }
    return (
        <>
        <nav id="navbar-transparent" className="navbar">
          <Link className ="navbar-brand  pl-5" to="/" ><img src={`${Home}`} className="img-logo"/></Link>
          <ul className="nav navbar-nav flex-row float-right">
            <li className="nav-item" onClick={()=>handleLogout()}><Link className ="nav-link pr-5  logout-nav" to="/">Logout</Link></li>
          </ul>
        </nav>
        <div className="container">
            <div className="user-body">
              <nav className="main-breadcrumb" >
                <ol className="breadcrumb breadcrumb-user">
                  <li className="breadcrumb-item"> <Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('home')}>Home</Link></li>
                  <li className="breadcrumb-item"><Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('edit')}>Edit Profile</Link></li>
                  <li className="breadcrumb-item"><Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('location')}>Edit Location</Link></li>
                  <li className="breadcrumb-item"> <Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('activities')}>Activities</Link></li>
                  <li className="breadcrumb-item"><Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('appointments')}>Appointments</Link></li>
                  <li className="breadcrumb-item"><Link className="link-user-breadcrumb" to="/user-dashboard" onClick={()=>setCurrentTab('bookappointment')}>Book Appointment</Link></li>
                </ol>
              </nav>
              <div className="row gutters-sm">
                <div className="col-md-4 mb-3">
                  <div className="card card-body card-shadow card-user-body">
                      <div className="d-flex flex-column align-items-center text-center">
                        <img src={clientData.gender=='male'?`${Man}`:`${Woman}`} alt="Admin" className="rounded-circle" width="150"/>
                          <h4 className="mt-3 user-page-font">{clientData.first_name} {clientData.last_name}</h4>
                      </div>
                  </div>
                  <div className="card mt-3 card-shadow">
                    <ul className="list-group list-group-flush">
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0 user-page-font">Email:</h6>
                        <span className="text-secondary">{userData.email}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className="mb-0 user-page-font">Phone:</h6>
                        <span className="text-secondary">{userData.phone_number}</span>
                      </li>
                      <li className="list-group-item d-flex justify-content-between align-items-center flex-wrap">
                        <h6 className=" user-page-font">Address:</h6>
                        <p className="text-secondary text-break mb-0">{userAddress.country} , {userAddress.city} , {userAddress.address_1}, {userAddress.address_2}, {userAddress.post}</p>
                      </li>
                    </ul>
                  </div>
                </div>
                <div className="col-md-8">
                  <div className="row gutters-sm">
                   {currentTab === 'home' && <UserInfo allActivities={allActivities} userActivities={userActivities} userBookings={userBookings} all_Charities={all_Charities} all_categories={all_categories}/>} 
                   {currentTab === 'edit' && <EditUser/>} 
                   {currentTab === 'location' && <EditUserLocation userAddress={userAddress} setAddress={setAddress}/>} 
                   {currentTab === 'activities' && <UserActivities allActivities={allActivities} userActivities={userActivities} setUserActivities={setUserActivities} all_Charities={all_Charities}/>} 
                   {currentTab === 'appointments' && <UserAppointments userBookings={userBookings} all_Charities={all_Charities}/>} 
                   {currentTab === 'bookappointment' && <UserBookAppointment all_Charities={all_Charities} all_categories={all_categories} userBookings={userBookings}setUserBookings={setUserBookings}/>} 
                  </div>
                </div>
              </div>
            </div>
        </div>
        </>
    )
};

export default UserPage;