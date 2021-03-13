import React, {useState, useEffect} from 'react';
import CharNavbar from './CharNavbar';
import Storage from './Storage';
import axios from 'axios';
import './details.css';

const CharityPage = () => {
    const [allNews, setAllNews] = useState([])
    const [allActivites, setAllActivities] = useState([])
    const [jwtStr, setjwtStr]            = useState('');

    useEffect(() => {
        setjwtStr(Storage.get("token"))
        console.log(Storage.get("token"))
        getNews();
         getActivities();
    },[ ]);
    const getToken = () =>{
        return Storage.get("token")
    };
    const getNews = () => {
     
        console.log("handle submit")

        axios.get('http://localhost:8000/api/charity/news/', {
           
            headers: {
                "Authorization": `Bearer ${getToken()}`
            }
          })
          .then((res) => {
            console.log(res.data)
            setAllNews(res.data)
          })
          .catch((error) => {
            console.error(error)
          })
         
    }
    

 


const getActivities  = () => {
 
    console.log("handle submit")
    axios.get('http://localhost:8000/api/charity/activities/', {
       
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
      })
      .then((res) => {
        console.log(res.data)
        setAllActivities(res.data)
      })
      .catch((error) => {
        console.error(error)
      })   
}

const deleteNews  = (newsid) => {
    console.log("handle submit")
    axios.delete(`http://localhost:8000/api/charity/news-details/${newsid}/`, {
       
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
      })
      .then((res) => {
        // console.log(res.data)
        window.location.reload(false);      })
      .catch((error) => {
        console.error(error)
      })   
}

const deleteActivity  = (activityid) => {
    console.log("handle submit")
    axios.delete(`http://localhost:8000/api/charity/activities_details/${activityid}/`, {
       
        headers: {
            "Authorization": `Bearer ${getToken()}`
        }
      })
      .then((res) => {
        window.location.reload(false);
        // console.log(res.data)
        // setAllActivities(res.data)
      })
      .catch((error) => {
        console.error(error)
      })   
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
                                            <button className = "btn btn-outline-danger" onClick={()=>deleteNews(news.id)}> delete  </button>
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
                                            <button className = "btn btn-outline-danger" onClick={()=>deleteActivity(actv.id)}> delete </button>
                                            <Link to="" params={{ value: actv.id }}>update</Link>                                        </div>
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