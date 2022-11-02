
import { MdOutlineModeEdit } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'
function ReadOnlyRow({ product, key, deleteProduct, handleEditClick }) {

  return (
    <tr key={key} >
      <td className='p-3'>{product.name}</td>
      <td className='p-3'>{product.code}</td>
      <td className='p-3'>${product.price}</td>
      <td className='p-3'>{product.category}</td>
      <td className='p-3'>
        <img src={product.image} alt={product.name} width={"50px"} height={"50px"} />
      </td>
      <td className='p-3'>
        <button type="button" class="btn btn-outline-danger p-1 m-1 mt-2 " onClick={() => deleteProduct(product.id)}><MdDeleteOutline className='mb-1' /></button>
        <button type="button" class="btn btn-outline-primary p-1 m-1 mt-2" onClick={(e) => handleEditClick(e, product)}><MdOutlineModeEdit className='mb-1' /></button>
      </td>

    </tr>
  )
}

export default ReadOnlyRow