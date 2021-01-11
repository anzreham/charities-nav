import React , {useState} from 'react';
import {Link}  from '@reach/router';
import Map from './Map';
import Storage from './Storage';
import PaintImg from '../images/paint.jpg';
import DonateImg from '../images/donate.jpg';
import VolunteerImg from '../images/volunteer.jpg';
import SimpleSlider from './SimpleSlider'
import {withGoogleMap, withScriptjs,GoogleMap, MarkerInfoWindow} from "react-google-maps";
import Fade from 'react-reveal/Fade'; 
const MapWrapped = withScriptjs(withGoogleMap(Map));

const Home = (props) => {
  const {handleLogout} =props
  const [currentid, setid] = useState(Storage.get("id"));
    return (
        <>
          <nav id="navbar-homepage" className="navbar justify-content-between flex-nowrap flex-row">
            <div className="container">
              <Link className ="navbar-brand float-left nav-item-home" to="/" >Home</Link> 
              <ul className="nav navbar-nav flex-row float-right">
                {!currentid? <>
                <li className="nav-item"><Link className ="nav-link pr-3 nav-item-home" to="/login" >Login</Link></li>
                <li className="nav-item"><Link className ="nav-link pr-3 nav-item-home" to="/register">Register </Link></li>
                </>:
                  <li className="nav-item" onClick={()=>handleLogout()}><Link className ="nav-link pr-3 nav-item-home" to="/">Logout</Link></li>
                }
              </ul>
            </div>
          </nav>
          <div className = "col-10 mx-auto" >
            <div className="mb-5 bg-black rounded mt-3" style={{ width: "80vw", height: "80vh"}}>
              <MapWrapped
                  googleMapURL={`https://maps.googleapis.com/maps/api/js?v=3.exp&libraries=geometry,drawing,places&key=AIzaSyAT8FoYfqPANHxoQNVPbhFaQoO6Ex2wtcc`}
                  loadingElement={<div style={{ height: `100%` }} />}
                  containerElement={<div style={{ height: `100%` }} />}
                  mapElement={<div style={{ height: `100%` }} />}
                />
          </div> 
          <section className="text-center mb-5">
              <div className="col-lg-8 mx-auto  py-5">
                  <h2 className="title-h2">About</h2>
                  <p className="lead mb-0">Charity Explorer is a place where you can find charities in Saudi Arabia  read their latest news and keep an eye out for new upcoming events.</p>
               </div>
          </section>

          <section className="mb-0">
          <Fade right duration={2600} delay={100}>
            <div className="row no-gutters">
              <div className="col-lg-6 order-lg-2 "><img src={`${PaintImg}`} alt="paint" className="w-100"/></div>
              <div className="col-lg-6 order-lg-1 my-auto px-5">
                <h2 className="title-h2">Events</h2>
                <p className="lead mb-0">You can attend an event, where kids and adults enjoy different activities. So sign up and don’t miss any future events!</p>
              </div>
            </div>
          </Fade>
          <Fade left duration={2600} delay={200}>
            <div className="row  no-gutters">
              <div className="col-lg-6 order-lg-1 " ><img src={`${VolunteerImg}`} alt="paint" className="w-100"/></div>
              <div className="col-lg-6 order-lg-2 my-auto px-5  ">
                <h2 className="title-h2">Volunteer</h2>
                <p className="lead mb-0 ">You can volunteer at different events to help and support a cause, meet new people and  gain confidence and new skills.</p>
              </div>
            </div>
          </Fade>
          <Fade right duration={2600} delay={300}>
            <div className="row no-gutters ">
              <div className="col-lg-6 order-lg-2 "><img src={`${DonateImg}`} alt="paint" className="w-100"/></div>
              <div className="col-lg-6 order-lg-1 my-auto px-5">
                <h2 className="title-h2">Donate</h2>
                <p className="lead mb-0">A simple donation can make a big difference, so if you have items at home you would like to give. contact a charity and book an appointment to donate your stuff.</p>
              </div>
            </div>
            </Fade>
          </section>
          <section id="quotes-section" className="text-center mb-3 py-5">
            <div className="container">
              <div className="row">
              <div className="col-lg-6 mx-auto my-5">
                  <p className="lead mb-0"><q>Help others without any reason and give without the expectation of receiving anything in return.</q><span className="quote-by">― Roy T. Bennett</span></p>
                </div>
                <div className="col-lg-6 mx-auto my-5">
                <p className="lead mb-0"><q>The work of volunteers impacts on all our lives, Even if we are not aware of it.</q><span className="quote-by">― Anthony Worrall-Thompson</span></p>
                </div>
              </div>
            </div>
          </section>
          <SimpleSlider/>
        </div> 
          <footer class="footer my-0 py-5 px-3">
              <p class="text-muted small mb-4 mb-lg-0 text-center">&#169; Website 2020. By Riham &#38; Maryam</p>
          </footer>   
        </>
    );
};
export default Home;