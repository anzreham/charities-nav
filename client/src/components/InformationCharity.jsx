import React,{useState, useEffect} from 'react';
import {Link}  from '@reach/router';
import axios from 'axios';
import Storage from './Storage';

const InformationCharity = (props) => {
    const {handleLogout} =props
    const [charityInfo, setCharityInfo]  = useState([])
    const [charityInfoUser, setCharityInfoUser]  = useState([])
    const [allnews, setAllNews]  = useState([])
    const [allActivities, setActivities]  = useState([])
    const [currentid, setid] = useState(Storage.get("id"));

    useEffect(() => {
        getCharity(); 
        getNews();
        getActivities();
    }, []);

  function getCharity() {
    axios
      .get(`http://localhost:7000/api/charity/${props.pk}`)
      .then((res) => {
        setCharityInfo(res.data)
        setCharityInfoUser(res.data.user)
      })
      .catch((err) => console.error(err));
  }
    function getNews() {
    axios
      .get(`http://localhost:7000/api/news/${props.pk}`)
      .then((res) => {
        setAllNews(res.data)
      })
      .catch((err) => console.error(err));
  }
  function getActivities() {
    axios
      .get(`http://localhost:7000/api/activites/${props.pk}`)
      .then((res) => {
        setActivities(res.data)
        console.log(res.data); 
      })
      .catch((err) => console.error(err));
  }

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
          <section className="img-banner d-flex align-items-center justify-content-center">
            <h1>{charityInfo.name}</h1> 
          </section>
            <section className="post-content-section">
                <div className="col-10 mx-auto mt-5">
                    <div className="row">
                        <div className="col-lg-9 col-sm-12 mb-5">
                            <h3 className="text-color">Description</h3>
                            <p className="description-p">{charityInfo.description}</p>
                            <div>
                                <h3 className="text-color mt-5">News</h3>
                                {allnews.map((news,i)=>{
                                    return(
                                    <div className="news-div">
                                        <p className="news-title">{news.title}</p>
                                        <p className="description-p">{news.content}</p>
                                    </div>
                                    )
                                })
                                }
                                <h3 className="text-color mt-5">Activities</h3>
                                {allActivities.map((activ,i)=>{
                                    return(
                                     <div className="news-div">
                                    <p className="news-title">{activ.name}<span className="news-date"> {activ.date}</span></p>
                                    <p className="description-p">{activ.description}</p>
                                </div>
                                    )
                                })
                                }
                            </div>
                        </div>
                        <div className="col-lg-3 col-sm-12 ">
                            <div className="card card-charity-info sticky-top" >
                                <h3 className="text-color">Charity Information</h3>
                                <ul className="list-group">
                                    <li className="list-group-item">Phone Number: {charityInfoUser.phone_number}</li>
                                    <li className="list-group-item">Email: {charityInfoUser.email}</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>  
            </section>
          <footer class="footer my-0 py-5 px-3">
              <p class="text-muted small mb-4 mb-lg-0 text-center">&#169; Website 2020. By Riham &#38; Maryam</p>
          </footer>   
        </>
    );
};
export default InformationCharity;