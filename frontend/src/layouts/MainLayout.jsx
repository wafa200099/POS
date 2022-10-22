import React from 'react'
import {Link} from 'react-router-dom'
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
function MainLayout({children}) {
  return (
    <div>
    <header>
    <nav className="navbar bg-light bg-primary">
    <div className="container">
       <Link to="/" className="navbar-brand">POS</Link>
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