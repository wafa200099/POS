
import { MdOutlineModeEdit } from 'react-icons/md'
import { MdDeleteOutline } from 'react-icons/md'

function ReadOnlyRowCat({ category, key, deleteCategory, handleEditClick }) {
  return (
    <tr key={key} >
      <td className='p-3'>{category.name}</td>
      <td>
        <button type="button" class="btn btn-outline-danger p-1 m-1 mt-2" onClick={() => deleteCategory(category.id)}><MdDeleteOutline className='mb-1' /></button>
        <button type="button" class="btn btn-outline-primary p-1 m-1 mt-2" onClick={(e) => handleEditClick(e, category)}><MdOutlineModeEdit className='mb-1' /></button>
      </td>

    </tr>
  )
}

export default ReadOnlyRowCat