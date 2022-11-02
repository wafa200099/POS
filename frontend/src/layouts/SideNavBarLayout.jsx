import { Link } from 'react-router-dom'
import 'react-toastify/dist/ReactToastify.css';
import '../layouts/SideNavBarLayout.css'
function SideNavBarLayout() {
  return (
    <div>
      <body>
        <div className="icon-bar shadow-sm">
          <Link to="/" className="navbar-brand mb-3"><i class="fa fa-home"></i></Link>
          <Link to="/pos" className="navbar-brand mb-3"><i class="fa fa-shopping-cart"></i></Link>
          <Link to="/productspage" className="navbar-brand mb-3"><i class="fa-solid fa-plus"></i></Link>
          <Link to="/productcatagories" className="navbar-brand mb-3"><i class="fa fa-list-alt" aria-hidden="true"></i></Link>
        </div>
      </body>
    </div>
  )
}

export default SideNavBarLayout