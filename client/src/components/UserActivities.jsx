import React from 'react';
import axios from 'axios';

const UserActivities = (props) => {
    const {allActivities, userActivities} = props

    const handleClick=(id)=>{
        axios
        .delete(`http://localhost:7000/api/volunteers/${id}?format=json`)
        .then((res) => {
           props.setUserActivities(()=>userActivities.filter(activ => activ.id !== id))
          })
        .catch((err) => console.error(err));
    }

    return (
        <>
        <div className=" col-sm-12 mb-3">
            <div className="card h-100 card-shadow">
                <div className="card-body card-user-body">
                    <h3 className="user-page-font">ALl Activites</h3>
                    {userActivities.map((activ,i)=>{
                        return allActivities.map((allactiv,i)=>{
                            if(activ.activity == allactiv.id)
                            return(
                                <div className="card  mb-3">
                                    <div className="card-header card-user-head">
                                    {allactiv.name}
                                    </div>
                                    <div className="card-body">
                                        <p className="card-title">{allactiv.date}</p>
                                        <p className="card-text">{allactiv.description}</p>
                                        <p className="cancelattend" onClick={()=>handleClick(activ.id)}>Will not attend</p>
                                    </div>
                                </div>
                            )
                        }) })
                        }
                </div>
            </div>
            </div>
        </>
    )
};

export default UserActivities;