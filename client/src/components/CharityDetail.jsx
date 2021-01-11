import React ,{useEffect, useState} from 'react';
import './details.css';
import axios from 'axios';
import CharHeader from './CharHeader';

 const CharityDetail = () => {
    const [name, setName]            = useState("")        
    const [phone_number, setPhone]   = useState("")     
    const [license_file, setLicense] = useState("")     
    const [description, setDescription]    = useState("")       
    const [belong_category, setCategory]    = useState("")  
    const [all_categories, setAllCategory]  = useState([]) 

    useEffect(() => {
        getAllCategories();
     },[ ]);

    function getAllCategories() {
        axios
        .get('http://localhost:7000/api/categories/?format=json')
        .then((res) => {
            console.log(res.data);
            setAllCategory(res.data)
        })
        .catch((err) => console.error(err));
    }
    
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
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">name</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="" onChange = {(e)=>setName(e.target.value)}  value = {name}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">phone Number</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="" onChange = {(e)=>setPhone(e.target.value)}  value = {phone_number}/>
                    </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">License</label>
                        <div class="col-sm-10">
                            <input type="email" class="form-control" id="" onChange = {(e)=>setLicense(e.target.value)}  value = {license_file}/>
                        </div>
                    </div>
                    <div class="form-group row">
                        <label for="inputEmail3" class="col-sm-2 col-form-label">Description</label>
                        <div class="col-sm-10">
                            <textarea  rows="4" class="form-control" cols="30" onChange = {(e)=>setDescription(e.target.value)}  value = {description}></textarea>
                        </div>
                    </div>
                    <div className="form-group">
                        <select className="form-control" value={belong_category} onChange={e => setCategory(e.target.value)}>
                        <option className="hidden" selected="" disabled="">Please select a category</option>
                            {all_categories.map((category,i)=>{
                                return(
                                    <option key={i} value={category.id}>{category.name}</option>
                                )
                            })}
                        </select>
                    </div>
                <button className="btn mb-4  btn-lg btn-block" id = "Charbtn" type='submit'>Update</button>
            </div>
            </form>
            </div>
            </div>
        </div>
        </>
      );
 };

 export default CharityDetail;


