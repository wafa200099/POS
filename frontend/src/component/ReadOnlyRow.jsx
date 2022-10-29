

function ReadOnlyRow({product,key,deleteProduct ,handleEditClick}) {

  return (
    <tr key={key}>
      
      <td>{product.name}</td>
      <td>{product.code}</td>
      <td>${product.price}</td>
      <td>{product.category}</td> 

      <td>
        <img src={product.image}  alt={product.name}  width={"50px"} height={"50px"}/>
      </td>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={()=>deleteProduct(product.id)}>DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={(e)=>handleEditClick(e,product)}>UPDATE</button>
      </tr>
  )
}

export default ReadOnlyRow