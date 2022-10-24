import React from 'react'

function EditableRow({editFormData,handleEditFormChange,handleCancelClick}) {
  return (
  <tr>
    <td><input type="text" required="required" placeholder='Please Enter name' name='name' value={editFormData.name} onChange={handleEditFormChange} /></td>
    <td><input type="text" required="required" placeholder='Please Enter code' name='code' value={editFormData.code} onChange={handleEditFormChange}/></td>
    <td><input type="number" required="required" placeholder='Please Enter category' name='category' value={editFormData.category} onChange={handleEditFormChange}/></td>
    <td><input type="text" required="required" placeholder='Please Enter image' name='image' value={editFormData.image} onChange={handleEditFormChange}/></td>
    <button type='submit'                          class="btn btn-outline-primary p-1 m-1">Save</button>
    <button type='text' onClick={handleCancelClick} class="btn btn-outline-danger p-1 m-1">Cancle</button>
  </tr>
  )
}

export default EditableRow