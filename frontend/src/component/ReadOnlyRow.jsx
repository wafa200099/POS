import React from 'react'

function ReadOnlyRow({product,key,deleteProduct ,handleEditClick}) {
  return (
    <tr key={key}>
      <td>{product.name}</td>
      <td>{product.code}</td>
      <td>{product.price}</td>
      <select className='form-select'>
     {product.category.map((data)=>
       <option>{data.name}</option>)}
      </select>
     {/* {product.category&&product.category.map((data)=>
      <td>{data.name}</td>)} */}
      <td>{product.image}</td>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={()=>deleteProduct(product.id)}>DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={(e)=>handleEditClick(e,product)}>UPDATE</button>
      </tr>
  )
}

export default ReadOnlyRow