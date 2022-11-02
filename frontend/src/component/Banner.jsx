import React from 'react';
import './Banner.css';
import { Link } from 'react-router-dom'


export default function Banner() {
  return (
    <section
      className="banner"
      id="banner"
      style={{
        background: 'url(https://img.freepik.com/free-vector/customer-with-trolley-buying-variety-food-grocery-store-woman-choosing-goods-shelves-supermarket-standing-aisle-flat-vector-illustration-hypermarket-department-consumerism-concept_74855-21030.jpg?w=2000) no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        width: "100%"
      }}
    >
      <div className="content">
        <h3>
          GRECO
          <br></br>
          {' '}
          <span>The Easiest</span>
          {' '}
          POS system
        </h3>
        <p>
          To Reduce waiting time, quick payments
        </p>
        <Link to='/pos'  ><button type="button" className="btn btn-warning mb-5">shop now </button></Link>
      </div>
    </section>

  );
}