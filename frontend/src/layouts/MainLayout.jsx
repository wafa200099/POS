import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {BsCart4} from 'react-icons/bs'
function MainLayout({ children }) {
  return (
    <div>
      <header>
        <nav class="navbar navbar-expand-lg navbar-light bg-light">
          <div className='ml-2 w-50 m-3'> 
          <Link to="/" className="navbar-brand  w-50 h1"><BsCart4 className=' mb-2'/>Groco</Link></div>
          <div class="collapse navbar-collapse">
            <ul class="navbar-nav">
              <li class="nav-item px-5">
                <Link to="/pos" className="navbar-brand h2">POS</Link>
              </li>
              <li class="nav-item px-5">
                <Link to="/productspage" className="navbar-brand h2">Products</Link>
              </li>
              <li class="nav-item  px-5">
                <Link to="/productcatagories" className="navbar-brand h2">Catagories</Link>
              </li>
            </ul>
          </div>
        </nav>
      </header>

      <main>
        <div className='container mt-3'>
          {children}
        </div>
        <ToastContainer
          position="top-center"
          autoClose={5000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      </main>
    </div>
  )
}

export default MainLayout