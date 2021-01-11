import React from 'react'
import axios from 'axios';
import Storage from './Storage';
import CharHeader from './CharHeader';

const Charitylocation = () => {
    // initializes state
    let [latitude, setLatitude] = React.useState(-33.7560119)
    let [longitude, setLongitude] = React.useState(150.6038367)
    let [address, setAddress] = React.useState('')

    // searches for new locations
    const updateCoordinates = (e) => {
        e.preventDefault()

        const encodedAddress = encodeURI(address)

        // fetches data from our api
        axios.get('https://maps.googleapis.com/maps/api/geocode/json',{
        params:{
          address:address,
          key:'AIzaSyAT8FoYfqPANHxoQNVPbhFaQoO6Ex2wtcc'
        }
      })
        .then(response => {
            setLatitude(response.data.results[0].geometry.location.lat)
            console.log("Lat", latitude)
            setLongitude(response.data.results[0].geometry.location.lng)
        })
        .catch(err => console.log(err))

        // to add the lication for the current charity 
        const addLocation={ "Longitude":  longitude , "Latitude": latitude }
      
        axios
          .post(`http://localhost:7000/api/charity/${Storage.get("id")}/location`, addLocation)
          .then((res) => {
            //  console.log(addCharity)
             // navigate("/charity-dashboard");
  
            } )
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
          <form onSubmit={(e) => updateCoordinates(e)}>
            <div className="form-group">
              <label htmlFor="address">Address</label>
              <input
                  type="text"
                  className="form-control"
                  id="address"
                  required
                  aria-describedby="addressHelp"
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  />
            </div>
              <button className="btn mb-4   btn-lg btn-block  " id = "Charbtn" type='submit'>Add/Update Location</button>
          </form>
        </div>
    </div>
  </div>
</>
)
}

export default Charitylocation