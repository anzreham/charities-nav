import React, {useState} from 'react';
import axios from 'axios';
import Storage from './Storage';

const UserBookAppointment = (props) => {
    const {all_categories,all_Charities,setUserBookings,userBookings} = props
    const [userid, setid]        = useState(Storage.get("id"));
    const [size, setSize]           = useState("") 
    const [amount, setAmount]       = useState("") 
    const [date,setDate]            = useState("") 
    const [time,setTime]            = useState("") 
    const [belong_category, setCategory]    = useState("") 
    const [belong_charity, setCharity]      = useState("") 
    
    const handleSubmit = (e) => {
        e.preventDefault();
        const bookAppt={ "size" : size , "amount" :amount , "date":date, "time":time, "category":belong_category, "charity":belong_charity,"user":userid}
        axios
          .post(`http://localhost:7000/api/appointments?format=json`, bookAppt)
          .then((res) => {
              if(!res.data.errors){
                  setSize("")
                  setAmount("")
                  setDate("")
                  setTime("")
                  setCategory("")
                  setCharity("")
                  setUserBookings([res.data,...userBookings])   
              }
            } )
            .catch((err) => console.error(err) );
    };

    return (
        <>
        <div className=" col-sm-12 mb-3">
            <div className="card card-shadow h-100">
                <div className="card-body card-user-body" >
                    <h3 className="user-page-font">Book An Appointment</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Size</label>
                                <div className="col-sm-8">
                                <input type="number" className="form-control" onChange = {(e)=>setSize(e.target.value)}  value = {size}/>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Amount</label>
                                <div className="col-sm-8">
                                <input type="number" className="form-control" onChange = {(e)=>setAmount(e.target.value)}  value = {amount}/>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Date</label>
                                <div className="col-sm-8">
                                <input type="date" className="form-control" onChange = {(e)=>setDate(e.target.value)}  value = {date}/>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Time</label>
                                <div className="col-sm-8">
                                <input type="time" className="form-control" onChange = {(e)=>setTime(e.target.value)}  value = {time}/>   
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Charity</label>
                                <div className="col-sm-8">
                                    <select className="form-control" value={belong_charity} onChange={e => setCharity(e.target.value)}>
                                        <option className="hidden" selected="" disabled="">Please select a charity</option>
                                            {all_Charities.map((charity,i)=>{
                                                return(
                                                    <option key={i} value={charity.id}>{charity.name}</option>
                                                )
                                            })}
                                    </select>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Category</label>
                                <div className="col-sm-8">
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
                            <div className="form-group row  col-md-10 mx-auto">
                                <input type="submit" className="btn-edit-user" value="Submit" onClick={handleSubmit}/>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
};

export default UserBookAppointment;