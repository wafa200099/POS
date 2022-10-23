import { useState } from "react"

 const AddProduct = () => {
    const [name, setName] = useState("")
    const [code, setCode] = useState("")
    const [price, setPrice] = useState(0)
    const [image, setImage] = useState("")

    const responseBody= {
       name: "",
       code: "", 
       price: "0",
       image:" "
    }
    const onSubmitHandler = (e) => {
        e.preventDefault();
        responseBody.name = name
        responseBody.code = code
        responseBody.price = price
        responseBody.image = image
        console.log(JSON.stringify(responseBody))

        fetch("http://localhost:5000/products",{
            method:"POST",
            headers: {
              'Content-Type': 'application/json; charset=UTF-8'
            },
            body:JSON.stringify({
              id:Date.now() + Math.random(),
              name:name,
              code:code,
              price:price,
              image:image
            })

          
          })
	//Form submission happens here


    }


    const inputChangeHandler = (setFunction, event) => {
        setFunction(event.target.value)
        
       
    }
   
  
    return(
        <form onSubmit={onSubmitHandler}>
            <div><label htmlFor="name">Name</label></div>
            <div><input id="name" onChange={(e)=>inputChangeHandler(setName, e)} type="text"/></div>
            <div><label htmlFor="price">price</label></div>
            <div><input id="price" onChange={(e)=>inputChangeHandler(setPrice, e)} type="number"/></div>
            <div><label htmlFor="code">code</label></div>
            <div><input id="code" onChange={(e)=>inputChangeHandler(setCode, e)} type="text"/></div>
            <div><label htmlFor="age">image</label></div>
            <div><input id="age" onChange={(e)=>inputChangeHandler(setImage, e)} type="text"/></div>
            <input type="submit"/>
        </form>
    )
}

export default AddProduct