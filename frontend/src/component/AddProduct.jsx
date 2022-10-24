// import { useState } from "react"
import React from 'react';
import { Formik, Field, Form } from 'formik';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const AddProduct = ({products,setProducts}) => {
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }
    return(
      <Formik
      initialValues={{
        id:Date.now() + Math.random(),
        name: "",
        code: "", 
        price: "",
        image:" "
      }}
      onSubmit={async (values) => {
         await fetch("http://localhost:5000/products",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify(values)
          })
      
          products.push(values)
          setProducts([...products])
          toast(` ${values.name}  added successfully`,toastOptions)

      }
      
      
    }
      >
        <Form >
               <div><label htmlFor="name">Name</label></div>
               <div ><Field  className=' bg-light rounded-3 border-1  border-primary' id="name" name="name" type="text"/></div>
               <div><label htmlFor="price">price</label></div>
               <div><Field className=' bg-light rounded-3 border-1  border-primary' id="price" name="price" type="number"/></div>
               <div><label htmlFor="code">code</label></div>
               <div><Field className=' bg-light rounded-3 border-1  border-primary' id="code" name="code" type="text"/></div>
               <div><label htmlFor="image">image</label></div>
               <div><Field className=' bg-light rounded-3 border-1  border-primary' id="image" name="image" type="text"/></div>
              <input type="submit" className=" btn btn-primary mt-2"/>
        </Form>
        </Formik>
    )
}

export default AddProduct