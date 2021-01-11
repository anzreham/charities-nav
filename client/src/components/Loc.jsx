import React from 'react'
import axios from 'axios';

const Loc = () => {
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
    }

    return (
        <div>
            {/* The latitude is {latitude}
            The longitude is {longitude} */}

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
                <button className="btn mb-4  btn-info btn-lg btn-block  " type='submit'>Add/Update Location</button>
            </form>
        </div>
    )
}

export default Loc