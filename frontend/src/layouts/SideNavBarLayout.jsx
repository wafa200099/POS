import React from 'react'
import {Link} from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import '../layouts/SideNavBarLayout.css'
function SideNavBarLayout() {
  return (
    <div>
    <body>
    <div class="icon-bar">
    <Link to="/" className="navbar-brand"><i class="fa fa-home"></i></Link><hr></hr>
    <Link to="/pos" className="navbar-brand"><i class="fa fa-shopping-cart"></i></Link><hr></hr>
    <Link to="/productspage" className="navbar-brand"><i class="fa-solid fa-plus"></i></Link><hr></hr>
    <Link to="/productcatagories" className="navbar-brand"><i class="fa fa-list-alt" aria-hidden="true"></i></Link><hr></hr>
   </div>
    </body>
</div>
  )
}

export default SideNavBarLayout