
import {MdOutlineModeEdit} from 'react-icons/md'
import {MdDeleteOutline} from 'react-icons/md'

function ReadOnlyRowCat({category,key,deleteCategory ,handleEditClick}) {
  return (
    <tr key={key}>
      <td>{category.name}</td>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={()=>deleteCategory(category.id)}><MdDeleteOutline className='mb-1'/>DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={(e)=>handleEditClick(e,category)}><MdOutlineModeEdit className='mb-1'/>UPDATE</button>
      </tr>
  )
}

export default ReadOnlyRowCat