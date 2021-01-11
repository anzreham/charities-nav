import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    withGoogleMap,
    withScriptjs,
    GoogleMap,
    Marker,
    InfoWindow
  } from "react-google-maps";




const  Map = () =>{

      // to fetch data 
  const [locations, setLoc] = useState([]);
  const [selectedLabel, setSelLabel] = useState();
  useEffect(() => {
    getAlllocations();
 
  }, [ ]);

  function getAlllocations() {
    axios
      .get('http://localhost:7000/api/charity/locations/?format=json')
      .then((res) => {
        console.log(res.data);
        setLoc(res.data)
      })
      .catch((err) => console.error(err));
  }
  

const mapStyle =  [
    {
        "featureType": "all",
        "elementType": "labels.text",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "all",
        "elementType": "labels.icon",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "landscape",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#f1efe8"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "gamma": "1.19"
            }
        ]
    },
    {
        "featureType": "landscape.man_made",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "gamma": "0.00"
            },
            {
                "weight": "2.07"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#b2ac83"
            }
        ]
    },
    {
        "featureType": "road.highway",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#b2ac83"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "color": "#8ac0c4"
            }
        ]
    }
]
    return (
      <div>
  <GoogleMap
        defaultZoom={5}
        defaultCenter={{ lat: 23.885942, lng: 45.079163 }}
        options={{
            styles: mapStyle,
        }}
        
        
    >
   {/* {location.longitude}, {location.latitude} */}
  

{locations.map((location, idx)=>{
            return(
              
                
<Marker  key={idx}
          position={{
            lat: parseFloat (location.latitude) ,
            lng:  parseFloat (location.longitude)
          }}

          onClick={() => {
            setSelLabel(location);
          }}
          icon={{
            url: `/icons8-marker-16.png`,
            scaledSize: new window.google.maps.Size(25, 25)
          }}
 />
              
 )
            })}

{selectedLabel && (
        <InfoWindow
          onCloseClick={() => {
            setSelLabel(null);
          }}
          position={{
            lat: parseFloat (selectedLabel.latitude) ,
            lng:  parseFloat (selectedLabel.longitude)
          }}
        >
          <div>
              
            <h2>Charity name:  </h2>
            <p>info ......</p>
          </div>
        </InfoWindow>
      )}
      
</GoogleMap>
      </div> 



    );
    }

export default Map;



{/* <div>
{locations.map((location, idx)=>{
                // return <p key={idx}>  {product.title}, {product.price}</p>
return <p key={idx}>  {location.longitude}, {location.latitude}   </p>
                
            })}
</div> */}


// position={{
//     lat: 25.308362636640986 ,
//     lng:  46.49374750289468
//   }}




   {/* {location.longitude}, {location.latitude} */}
  

//    {locations.map((location, idx)=>{
//     return(
//       <>
//         <p key={idx}>lon: {location.longitude}</p>

//       </>
//     )
//     })}



// </div> 
// );
// }