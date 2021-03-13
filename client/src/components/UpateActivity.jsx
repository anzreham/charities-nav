import React ,{useState} from 'react';
import './details.css';
import Storage from './Storage';
import axios from 'axios';
import CharHeader from './CharHeader';


 const CharityActivities = () => {
     const [name, setName]               = useState("");
     const [date, setDate]               = useState("");
     const [description, setDescription] = useState("");
     const[messageSubmit, setMessageSubmit] = useState("")
     const [jwtStr, setjwtStr]            = useState('');

     const handleSubmit = (e) => {
        e.preventDefault();
        console.log("handle submit")
        setjwtStr(Storage.get("token"))
        const config = {
            headers: { Authorization: `Bearer ${jwtStr}` }
        };
        const addActivity={
            "name": name
            ,
            "description":  description
            ,
            "date": date
         
        }
      
        axios
          .post('http://localhost:8000/api/charity/activities/?format=json',addActivity,config )
          .then((res) => {
              
              if(!res.data.errors){
                console.log("Your post has been submitted")
                  setMessageSubmit("Your post has been submitted")
                  setName("")
                  setDescription("")
                  setDate("")
              }else{
                setMessageSubmit("Not Submitted")
              }
            } )
            .catch((err) =>  setMessageSubmit("Not Submitted")

            
            );
    };

    return (
        <> 
        <CharHeader />        
        <div className = "Dbody" > 
            <div className = "Dcontainer">
                <div className="Dform">
                    <div className="header">
                        <h1>Welcome!</h1>
                        <p>Please provide your information below.</p>
                    </div>  
                    <form>
                    <div className="inputcontainer">
                                    <div className="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
                                        <div className="col-sm-10">
                                            <input type="text" class="form-control" id="" onChange = {(e)=>setName(e.target.value)}  value = {name}/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Date and Time</label>
                                        <div class="col-sm-10">
                                            <input class="form-control" type="date" onChange = {(e)=>setDate(e.target.value)}  value = {date}/>
                                        </div>
                                    </div>

                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Description</label>
                                        <div class="col-sm-10">
                                            <div class="form-group">
                                                <label for="exampleFormControlTextarea1">Example textarea</label>
                                                <textarea class="form-control"  rows="3" onChange = {(e)=> setDescription(e.target.value)}  value = {description}></textarea>
                                            </div>
                                        </div>
                                    </div>
                    </div>
                    
                
                    <button className="btn mb-4  btn-lg btn-block"  id = "Charbtn" type='submit' onClick={handleSubmit}>Post</button> 
                    <p>{messageSubmit}</p>
                    </form>
                </div>
            </div>
        </div>
        </>       
    );
 };

 export default CharityActivities;


