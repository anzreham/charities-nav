import axios from 'axios';
import React, {useState, useEffect} from 'react';
import { Link, navigate } from '@reach/router';

const CharityRegister = (props) => {
    // const [user, setuser]            = useState({});
    const [name, setName]            = useState("");  
    const [email, setEmail]          = useState("");       
    const [phone_number, setPhone]   = useState("");    
    const [license_file, setLicense] = useState("");     
    const [password, setPassword]    = useState("");
    const [con, setcon]    = useState("");

    const [belong_category, setCategory]    = useState("")  
    const [all_categories, setAllCategory]  = useState([]) 

    useEffect(() => {
      getAllCategories();
    }, [ ]);

    function getAllCategories() {
      axios
        .get('http://localhost:7000/api/categories/?format=json')
        .then((res) => {
          console.log(res.data);
          setAllCategory(res.data)

        })
        .catch((err) => console.error(err));
    }
     
  	const handleSubmitCharity = (e) => {
      e.preventDefault();
      const addCharity={ "user": {"email":email,"phone_number":phone_number,"password":password } , "logo":"logo", "name":name,"license_file": license_file}
      
      axios
        .post('http://localhost:7000/api/charities?format=json', addCharity)
        .then((res) => {
            console.log(addCharity)
            navigate("/charity-dashboard");

          } )
        .catch((err) => console.error(err));
    };
    return (
        <div>
           <h3 className="register-heading">Register as a Charity</h3>
           <div className="row register-form">
               <div className="col-md-6">
                   <div className="form-group">
                       <input type="text" className="form-control" placeholder="Charity Name *" onChange={(e) => setName(e.target.value)} value={name}/>
                   </div>
                   <div className="form-group">
                       <input type="text" maxlength="10" minlength="10" className="form-control" placeholder="Phone Number *" onChange={(e) => setPhone(e.target.value)} value={phone_number}/>
                   </div>
                   <div className="form-group">
                       <input type="password" className="form-control" placeholder="Password *"onChange={(e) => setPassword(e.target.value)} value={password}/>
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
               </div>
               <div className="col-md-6">
                   <div className="form-group">
                       <input type="email" className="form-control" placeholder="Email Address*" onChange={(e) => setEmail(e.target.value)} value={email}/>
                   </div>
                   <div className="form-group">
                       <input type="text" className="form-control" placeholder="License File *" onChange={(e) => setLicense(e.target.value)} value={license_file}/>
                   </div>
                   <div className="form-group">
                       <input type="password" className="form-control" placeholder="Confirm Password *"onChange={(e) => setcon(e.target.value)} value={con}/>
                   </div>
                   <input type="submit" className="btnRegister" value="Register" onClick={handleSubmitCharity}/>
               </div>
           </div>
       </div>
    )
};

export default CharityRegister;














           