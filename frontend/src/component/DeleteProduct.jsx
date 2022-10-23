import React from 'react'

function DeleteProduct({products,setProducts,id}) {

const  deleteProduct=(id)=>{
      // console.log((id));
      // const afterRemove=products.filter((product)=>product.id!==productlist.id)
    
      //  setProducts(products.filter((productitem)=>productitem.id!==product.id))


      const delelm =products.findIndex((product) =>product.id === id);
      products.splice(delelm, 1);
      setProducts( products)
      }
  

  return (
    <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={deleteProduct(id)} >DELETE</button>
    // onClick={() => deleteProduct(products.id)}
  )
}

export default DeleteProduct