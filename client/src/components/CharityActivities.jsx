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
     const [charityid, setid] = useState(Storage.get("id"));

    const handleSubmit = () => {
        const addActivities={ "name":name,"description":description, "date":date ,"user":charityid}
        axios
          .post('http://localhost:7000/api/activites?format=json', addActivities)
          .then((res) => {
            if(!res.data.errors){
                setMessageSubmit("Your post has been submitted")
                setName("")
              setDate("")
              setDescription("")
            }else{
              setMessageSubmit("")
            }
            } )
          .catch((err) => {console.error(err)});
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
                            <form onSubmit={handleSubmit}>
                                <div className="inputcontainer">
                                    <div class="form-group row">
                                        <label for="inputEmail3" class="col-sm-2 col-form-label">Name</label>
                                        <div class="col-sm-10">
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
                                <button className="btn mb-4  btn-lg btn-block" id = "Charbtn" type='submit'>Submit</button>
                                <p>{messageSubmit}</p>
                                </div>
                            </form>
                        </div>
                    </div>
                </div>
            </>
      );
 };

 export default CharityActivities;


