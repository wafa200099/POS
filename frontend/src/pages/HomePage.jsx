import React from 'react'
import {Link} from 'react-router-dom'
import MainLayout from '../layouts/MainLayout'
import SideNavBarLayout from '../layouts/SideNavBarLayout'
function HomePage() {
  return (
      <MainLayout>
        <SideNavBarLayout />
            <div className='bg-light p-5 mt-4 rounded-4 text-center'>
            <h1>Welcome to  our  POS for small buiness</h1>
            <img src='https://thumbs.dreamstime.com/b/rating-score-vector-illustration-tiny-people-customers-feedbacks-reviews-rating-score-vector-illustration-isolated-171503809.jpg' width={"50%"} height={"400px"} />    
            </div>
            <div className='text-center bg-light mb-5'>
            <Link to='/pos'  ><button className='btn btn-primary '>Click here to sell products</button></Link>
            </div>
           
       
    </MainLayout>
  )
}

export default HomePage