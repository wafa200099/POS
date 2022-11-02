import React from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { BsCart4 } from 'react-icons/bs'
function MainLayout({ children }) {
  return (
    <div>
      <header>
        <nav className="navbar navbar-expand-lg  bg-light shadow-sm  ">
          <div className='ml-2 w-50 m-3'>
            <Link to="/" className="navbar-brand  w-50 h1 text-primary text-uppercase"><BsCart4 className='mb-2' />Groco</Link>
          </div>
          <div className="collapse navbar-collapse ">
            <ul className="navbar-nav">
              <li className="nav-item px-5">
                <Link to="/pos" className="navbar-brand h2 text-primary">POS</Link>
              </li>
              <li className="nav-item px-5">
                <Link to="/productspage" className="navbar-brand h2 text-primary">Products</Link>
              </li>
              <li className="nav-item  px-5">
                <Link to="/productcatagories" className="navbar-brand h2 text-primary">Catagories</Link>
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