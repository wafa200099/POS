import React from 'react';
import './Banner.css';
import {Link} from 'react-router-dom'


export default function Banner() {
  return (
    <section
      className="banner"
      id="banner"
      style={{
        background: 'url(https://img.freepik.com/free-vector/customer-with-trolley-buying-variety-food-grocery-store-woman-choosing-goods-shelves-supermarket-standing-aisle-flat-vector-illustration-hypermarket-department-consumerism-concept_74855-21030.jpg?w=2000) no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width:"100%"
      }}
    >
      <div className="content">
        <h3>
          fresh and
          <br></br>
          {' '}
          <span>organic</span>
          {' '}
          products
        </h3>
        <p>
       Better Products at the Right Price
        </p>
        <Link to='/pos'  ><button type="button" className="btn btn-warning mb-5">shop now </button></Link>
      </div>
    </section>
    
  );
}