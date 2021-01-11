import React, { useState, useEffect } from 'react';
import Storage from './Storage';
import axios from 'axios';

const EditUserLocation = (props) => {
    const{userAddress, setAddress}=props
    const [userid, setid] = useState(Storage.get("id"));
    const [addressOne, setAddressOne] = useState('')
    const [addressTwo, setAddressTwo] = useState('')
    const [country, setCountry] = useState('')
    const [city, setCity] = useState('')
    const [code, setCode] = useState('')

    useEffect(() => {
        getUserAddress()
    },[ ]);

    const getUserAddress=()=>{
        axios
        .get(`http://localhost:7000/api/client/${userid}/location?format=json`)
        .then((res) => {
            setAddressOne(res.data.address_1)
            setAddressTwo(res.data.address_2)
            setCountry(res.data.country)
            setCity(res.data.city)
            setCode(res.data.post)
          })
        .catch((err) => console.error(err));
      }
      const updateAddress=()=>{
        const addressUpdate={ "address_1" : addressOne , "address_2" : addressTwo , "city" : city, "post" : code, "user" : userid}
        axios
        .put(`http://localhost:7000/api/client/${userid}/location/?format=json`, addressUpdate)
        .then((res) => {
            setAddress(res.data);
          })
        .catch((err) => console.error(err));
      }

    return (
        <>
        <div className=" col-sm-12 mb-3">
            <div className="card card-shadow h-100">
                <div className="card-body card-user-body" >
                    <h3 className="user-page-font">Edit Location</h3>
                    <div className="row">
                        <div className="col-md-12">
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Address 1</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={(e) => setAddressOne(e.target.value)} value={addressOne}/>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Address 2</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={(e) => setAddressTwo(e.target.value)} value={addressTwo}/>
                                </div>
                            </div>
                            <div className="form-group row col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Country</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={(e) => setCountry(e.target.value)} value={country}/>
                                </div>
                            </div>
                            <div className="form-group row  col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">City</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={(e) => setCity(e.target.value)} value={city}/>
                                </div>
                            </div>
                            <div className="form-group row  col-md-10 mx-auto">
                                <label className="col-sm-4 col-form-label user-page-font">Postal code</label>
                                <div className="col-sm-8">
                                    <input type="text" className="form-control" onChange={(e) => setCode(e.target.value)} value={code}/>
                                </div>
                            </div>
                            <div className="form-group row  col-md-10 mx-auto">
                                <input type="submit" className="btn-edit-user" value="Update" onClick={()=>updateAddress()}/>
                            </div>
                        </div>
                    </div> 
                </div>
            </div>
        </div>
        </>
    )
};

export default EditUserLocation;