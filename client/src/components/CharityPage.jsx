import React, {useState, useEffect} from 'react';
import CharNavbar from './CharNavbar';
import Storage from './Storage';
import axios from 'axios';
import './details.css';

const CharityPage = () => {
    const [charityid, setid] = useState(Storage.get("id"));
    const [allNews, setAllNews] = useState([])
    const [allActivites, setAllActivities] = useState([])
    
    useEffect(() => {
        getNews();
        getActivities();
    },[ ]);

    const getNews = () => { 
        axios
        .get(`http://localhost:7000/api/news/${charityid}`)
        .then((res) => {
            setAllNews(res.data)
            } )
            .catch((err) => console.error(err));
        }

    const getActivities = () => { 
        axios
        .get(`http://localhost:7000/api/activites/${charityid}`)
        .then((res) => {
            setAllActivities(res.data)
            } )
            .catch((err) => console.error(err));
        }

    const handleDeleteNews=(newsid)=>{
        axios
        .delete(`http://localhost:7000/api/news/delete/${newsid}?format=json`)
        .then((res) => {
            setAllNews(()=>allNews.filter(news => news.id !== newsid))
            })
        .catch((err) => console.error(err));
    }
    const handleDeleteActivity=(activid)=>{
        axios
        .delete(`http://localhost:7000/api/activity/delete/${activid}?format=json`)
        .then((res) => {
            setAllActivities(()=>allActivites.filter(activs => activs.id !== activid))
            })
        .catch((err) => console.error(err));
    }
    
    return (
        <>    
        <CharNavbar /> 
        <div className = "cont" > 
            <div className = "row my-5">
                <div className="col-sm-4" style={{ paddingright : 0, paddingleft:0}}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" className = "table-success">News</th>
                            </tr>
                        </thead>
                    <tbody>  
                        <tr>
                        <div>
                            <td>
                            {allNews.map((news,i)=>{
                                return(
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h1> </h1>
                                            <p>Title: {news.title}</p>
                                            <button className = "btn btn-outline-success" onClick={()=>handleDeleteNews(news.id)}> delete </button>
                                        </div>
                                    </div>
                                )
                            })
                            }
                            </td>
                        </div>
                        </tr>
                    </tbody>
                    </table>   
                </div> 
                <div className="col-sm-4" style={{ paddingright : 0, paddingleft:0}}>
                    <table class="table">
                        <thead>
                            <tr>
                                <th scope="col" className = "table-info">Activities</th>
                            </tr>
                        </thead>
                    <tbody>  
                        <tr>
                        <div>
                            <td>
                            {allActivites.map((actv,i)=>{
                                return(
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            <h1> </h1>
                                            <p>Description: {actv.description}</p>
                                            <p>Date: {actv.date}</p>
                                            <button className = "btn btn-outline-info" onClick={()=>handleDeleteActivity(actv.id)}> delete </button>
                                        </div>
                                    </div>
                                )
                            })
                            }
                            </td>
                        </div>
                        </tr>
                    </tbody>
                    </table>   
                </div>      
            </div>
        </div>
        </>
    );
};

export default CharityPage