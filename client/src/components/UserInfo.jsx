import React from 'react';

const today = new Date().toISOString().slice(0,10);

const UserInfo = (props) => {
    const {allActivities, userActivities, userBookings, all_Charities, all_categories} = props
    return (
        <>
        <div className="col-sm-6 mb-3">
            <div className="card card-shadow h-100">
                <div className="card-body card-user-body" >
                    <h5 className="d-flex align-items-center mb-3 user-page-font">Upcoming Activities:</h5>
                        {userActivities.map((activ,i)=>{
                        return allActivities.map((allactiv,i)=>{
                            if(activ.activity == allactiv.id & allactiv.date >= today)
                            return(
                            <div className="mb-3 user-page-line">
                                { all_Charities.map((c,i)=>{
                                    <h6>Charity Name: <span className="text-secondary">{c.name}</span></h6>
                                })}
                                <h6>The Event: <span className="text-secondary">{allactiv.name}</span></h6>
                                <h6>Date: <span className="text-secondary">{allactiv.date}</span></h6>
                            </div>
                            )
                        }) })
                        }
                </div>
            </div>
        </div>
        <div className="col-sm-6 mb-3">
            <div className="card card-shadow h-100">
                <div className="card-body card-user-body" >
                <h5 className="d-flex align-items-center mb-3 user-page-font">Upcoming Appointments:</h5>
                {userBookings.map((apoint,i)=>{
                    if(apoint.date >= today) 
                        return(
                            <div className="mb-3 user-page-line">
                            { all_Charities.map((c,i)=>{
                                if(c.id == apoint.charity)
                                    return <h6>Charity Name: <span className="text-secondary">{c.name}</span></h6>
                            })}
                            {all_categories.map((catg,i)=>{
                                if(catg.id == apoint.category)
                                    return <h6>Category: <span className="text-secondary">{catg.name}</span></h6>
                            })}
                            
                            <h6>Date And Time: <span className="text-secondary">{apoint.date} {apoint.time}</span></h6>
                        </div>
                        )
                })
                }
                </div>
            </div>
        </div>
        </>
    )
};

export default UserInfo;