import React from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState ,Fragment} from 'react'
import SearchBar from '../component/SearchBar'
import ModalDialog from '../component/ModalDialog'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadOnlyRowCat from '../component/ReadOnlyRowCat'
import EditableRowCat from '../component/EditableRowCat'
import SideNavBarLayout from '../layouts/SideNavBarLayout'
function ProductCatagories() {
  const[catagories,setCatagories]=useState([])
  const[editCatagorieId,setEditCatagorieId]=useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",

  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchCatagories = async() => {
    const result = await axios.get('category');
    setCatagories(await result.data);
  }

    useEffect(() => {
        fetchCatagories()
    },[])

    const  deleteCategory=async(categoryId)=>{
      const newCatagories=[...catagories]
      const delelm =catagories.findIndex((category) =>category.id === categoryId);
      newCatagories.splice(delelm, 1);
      await fetch(`http://localhost:5000/category/${categoryId}`,{
                method:"delete",
                })
      setCatagories(newCatagories)
      toast(`category Removed Successfully`,toastOptions)
      }


    const handleEditClick=(e,category)=>{
          e.preventDefault();
          setEditCatagorieId(category.id)
          const formValues = {
             name: category.name,
           
           };
       
           setEditFormData(formValues);
    }

    const handleEditFormChange = (event) => {
      event.preventDefault();
  
      const fieldName = event.target.getAttribute("name");
      const fieldValue = event.target.value;
  
      const newFormData = { ...editFormData };
      newFormData[fieldName] = fieldValue;
  
      setEditFormData(newFormData);
    };
    const handleCancelClick = () => {
      setEditCatagorieId(null);
    };
    const handleEditFormSubmit =async (event) => {
      event.preventDefault();
      const editedcategory = {
             id:editCatagorieId,
             name: editFormData.name,
      };
      const newCatagories = [...catagories];
       // index of row we are editing now
      const index = catagories.findIndex((category) => category.id === editCatagorieId);
      newCatagories[index] = editCatagorieId;
      await fetch(`http://localhost:5000/category/${editCatagorieId}`,{
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(editedcategory) 
       })
       setCatagories(newCatagories);
       setEditCatagorieId(null);

    };
  return (

    <MainLayout>
      <SideNavBarLayout />
       <SearchBar  data={catagories}/ >
       <ModalDialog catagories={catagories} setCatagories={catagories} />
        <form onSubmit={handleEditFormSubmit}>
           <table  class="table table-responsive table-sm">
           <thead >
           <tr>
              <th scope="col">Name</th>
           </tr>
           </thead>
           <tbody>
           {catagories.map((category, key) =>
        
   
          <Fragment>
            {editCatagorieId === category.id ? <EditableRowCat  key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
            <ReadOnlyRowCat category={category} key={key} deleteCategory={deleteCategory} handleEditClick={handleEditClick}/>}
           </Fragment>
            )}
         </tbody>
        </table>
      </form>
    </MainLayout>
  )}


export default ProductCatagories