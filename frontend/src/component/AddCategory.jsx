import React from 'react';
import { Formik, Field, Form } from 'formik';
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

 const AddCategory = ({categories,setCategories}) => {
  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }
    return(
      <Formik
      initialValues={{
        id:Date.now() + Math.random(),
        name: ""
 
      }}
      onSubmit={async (values) => {
         await fetch("http://localhost:5000/category",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify(values)
          })
      
          categories.push(values)
          setCategories([...categories])
          toast(` ${values.name} added successfully`,toastOptions)
      }
    }
      >
        <Form >
               <div><label htmlFor="name">Name</label></div>
               <div ><Field  className=' form-control bg-light rounded-3 border-1  border-primary' id="name" name="name" type="text"/></div>
              <input type="submit" className=" btn btn-primary mt-2"/>
        </Form>
        </Formik>
    )
}

export default AddCategory