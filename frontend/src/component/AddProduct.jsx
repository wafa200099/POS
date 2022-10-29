// import { useState } from "react"
import React from 'react';
import { Formik, Field, Form } from 'formik';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
const AddProduct = ({categories,products,setProducts}) => {
  console.log(categories);
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
        category:"",
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
               <div ><Field className=' form-control bg-light rounded-3 border-1  border-primary' id="name" name="name" type="text"/></div>
               <div><label htmlFor="price">Price</label></div>
               <div><Field className='form-control bg-light rounded-3 border-1  border-primary' id="price" name="price" type="number"/></div>

               <div><label htmlFor="category">Category</label></div>
               <div>

                <Field   as="select" className='form-control bg-light rounded-3 border-1  border-primary' id="category" name="category">
                   {categories && categories.map((category)=>{
                     return (
                     <option value={category.name}>{category.name}</option>
                          );
                       })}
                </Field>
                </div>

               <div><label htmlFor="code">Code</label></div>
               <div><Field className=' form-control bg-light rounded-3 border-1  border-primary' id="code" name="code" type="text"/></div>
               <div><label htmlFor="image">Image</label></div>
               <div><Field className='form-control bg-light rounded-3 border-1  border-primary' id="image" name="image" type="text"/></div>
              <input type="submit" className=" btn btn-primary mt-2"/>
        </Form>
        </Formik>
    )
}

export default AddProduct