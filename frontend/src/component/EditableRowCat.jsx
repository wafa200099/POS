function EditableRowCat({ editFormData, handleEditFormChange, handleCancelClick, key }) {
  return (
    <tr key={key} >
      <td><input type="text" required="required" placeholder='Please Enter name' name='name' value={editFormData.name} onChange={handleEditFormChange} /></td>
      <button type='submit' class="btn btn-outline-primary p-1 m-1">Save</button>
      <button type='text' onClick={handleCancelClick} class="btn btn-outline-danger p-1 m-1">Cancle</button>
    </tr>
  )
}
export default EditableRowCat