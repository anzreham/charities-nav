import React from 'react';

const UserAppointment = (props) => {
    const {userBookings, all_Charities} = props
    return (
        <>
        <div className=" col-sm-12 mb-3">
            <div className="card h-100 card-shadow">
                <div className="card-body card-user-body">
                    <h3 className="user-page-font">ALl Appointments</h3>
                    <table className="table text-center">
                        <thead className="card-user-head">
                            <tr>
                                <th scope="col">#</th>
                                <th scope="col">Charity</th>
                                <th scope="col">Date</th>
                                <th scope="col">Time</th>
                            </tr>
                        </thead>
                        <tbody>
                            {userBookings.map((apoint,i)=>{
                                return(
                                    <tr>
                                        <th className="table-th" scope="row">{i+1}</th>
                                        { all_Charities.map((c,i)=>{
                                            if(c.id == apoint.category)
                                                return <td>{c.name}</td>
                                        })}
                                        <td>{apoint.date}</td>
                                        <td>{apoint.time}</td>
                                    </tr>
                                )
                            })
                            }
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
        </>
    )
};

export default UserAppointment;