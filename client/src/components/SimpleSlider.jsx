import React from 'react';
import axios from 'axios';
import {Link}  from '@reach/router';
import {useState, useEffect} from 'react';
import Carousel from 'react-multi-carousel';
import "react-multi-carousel/lib/styles.css";

const responsive = {
  desktop: {
    breakpoint: { max: 3000, min: 1024 },
    items: 4
  },
  tablet: {
    breakpoint: { max: 1024, min: 464 },
    items: 2
  },
  mobile: {
    breakpoint: { max: 464, min: 0 },
    items: 1
  }
};

const SimpleSlider = () => {
  const [all_categories, setAllCategory]  = useState([])
  const [all_Charities, setAllCharities]  = useState([])
  const [currentTab, setCurrentTab] = useState(1)

  useEffect(() => {
    getAllCharities();
    getAllCategories();
  }, [ ]);

  function getAllCharities() {
    axios
      .get('http://localhost:7000/api/charities/?format=json')
      .then((res) => {
        console.log(res.data);
        setAllCharities(res.data)
      })
      .catch((err) => console.error(err));
  }

  function getAllCategories() {
    axios
      .get('http://localhost:7000/api/categories/?format=json')
      .then((res) => {
        console.log(res.data);
        setAllCategory(res.data)
      })
      .catch((err) => console.error(err));
  }
  const handleClick=(id)=>{
    setCurrentTab(id)
  }

  return (
    <>
    <div className="row col-12 px-0 ">
      <h2 className="title-categories col-4 title-h2">Charities by Categories</h2>
      <nav className="col-8 ">
        <ol className="breadcrumb breadcrumb-categories float-right">
        {all_categories.map((category,i)=>{
          return (
            <li className="breadcrumb-item"><Link className="link-category-breadcrumb" to="/" onClick={()=>handleClick(category.id)}>{category.name}</Link></li>
          )})
        }
        </ol>
      </nav>
    </div>

    <div className="mb-5">
      <Carousel
        centerMode={true}
        responsive={responsive}
        infinite={true}
        customTransition=".45s ease-in-out"
        transitionDuration={500}
        itemClass="carousel-items"
      >
        {all_Charities.map((charity,i)=>{
          if(charity.category === currentTab )
            return(
              <div key={i} className="card category-boxes">
                <img className="card-img-top" src="https://mdbootstrap.com/img/Photos/Horizontal/City/4-col/img%20(60).jpg" alt="charity logo"/>
                <div className="card-body">
                    <h5 className="card-title">{charity.name}</h5>
                    <p className="card-text"> {`${charity.description.substring(0, 30)}...`}</p>
                </div>
                <div className="overlay d-flex align-items-center justify-content-center">
                  <p className="read-more"><Link to={`charity/information/${charity.user.id}`} className="read-link"  ok={charity.user.id}>Read More</Link></p>
                </div>
            </div>
            )
          })
        }
      </Carousel>
    </div>
  </>
  );
};

export default SimpleSlider;
