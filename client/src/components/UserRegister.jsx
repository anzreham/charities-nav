import axios from 'axios';
import React, {useState} from 'react';
import Storage from './Storage';
import { navigate } from '@reach/router';

const UserRegister = () => {
    const [first_name, setFirstName]  = useState("")   
    const [last_name, setLastName]    = useState("") 
    const [email, setEmail]           = useState("")        
    const [phone_number, setPhone]    = useState("")     
    const [gender, setGender]         = useState("Female")     
    const [password, setPassword]     = useState("")  
 
    const handleSubmitUser = (e) => {
        e.preventDefault();
        const addUser={ "user": {"email":email,"phone_number":phone_number,"password":password } ,"first_name":first_name, "last_name":last_name,"gender": gender}
  
        axios
          .post('http://localhost:7000/api/clients/?format=json', addUser)
          .then((res) => {
            if(res.data.user.id != null){
                Storage.set("id", res.data.user.id)
                navigate("/user-dashboard")
            }
            })
          .catch((err) => console.error(err));
      };

    return (
        <div>
            <h3 className="register-heading">Register as a User</h3>
            <div className="row register-form">
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="First Name *" onChange={(e) => setFirstName(e.target.value)} value={first_name}/>
                    </div>
                    <div className="form-group">
                        <input type="email" className="form-control" placeholder="Email Address*" onChange={(e) => setEmail(e.target.value)} value={email}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Password *" onChange={(e) => setPassword(e.target.value)} value={password}/>
                    </div>
                    <div className="form-group">
                        <label className="radio inline"> 
                            <input type="radio" name="gender" value="Female" checked={gender === "Female"} onChange={(e) => setGender(e.target.value)} />
                            <span className="px-2">Female </span> 
                        </label>
                        <label className="radio inline"> 
                            <input type="radio" name="gender" value="Male" checked={gender === "Male"} onChange={(e) => setGender(e.target.value)}/>
                            <span> Male </span> 
                        </label>
                    </div>
                </div>
                <div className="col-md-6">
                    <div className="form-group">
                        <input type="text" className="form-control" placeholder="Last Name " onChange={(e) => setLastName(e.target.value)} value={last_name}/>
                    </div>
                    <div className="form-group">
                        <input type="text" minlength="10" maxlength="10" name="txtEmpPhone" className="form-control" placeholder="Phone Number*" onChange={(e) => setPhone(e.target.value)} value={phone_number}/>
                    </div>
                    <div className="form-group">
                        <input type="password" className="form-control" placeholder="Confirm Password *"   />
                    </div>
                    <input type="submit" className="btnRegister" value="Register" onClick={handleSubmitUser}/>
                </div>
            </div>
        </div>
    )
};

export default UserRegister;

