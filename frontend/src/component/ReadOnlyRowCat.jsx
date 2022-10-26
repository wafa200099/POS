import React from 'react'

function ReadOnlyRowCat({category,key,deleteCategory ,handleEditClick}) {
  return (
    <tr key={key}>
      <td>{category.name}</td>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={()=>deleteCategory(category.id)}>DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={(e)=>handleEditClick(e,category)}>UPDATE</button>
      </tr>
  )
}

export default ReadOnlyRowCat