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
import Pagination from '../component/Pagination'
function ProductCatagories() {
  const[categories,setCategories]=useState([])
  const[editCatagorieId,setEditCatagorieId]=useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",

  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchCategories = async() => {
    const result = await axios.get('category');
    setCategories(await result.data);
  }

    useEffect(() => {
        fetchCategories()
    },[])

    const  deleteCategory=async(categoryId)=>{
      const newCatagories=[...categories]
      const delelm =categories.findIndex((category) =>category.id === categoryId);
      newCatagories.splice(delelm, 1);
      await fetch(`http://localhost:5000/category/${categoryId}`,{
                method:"delete",
                })
      setCategories(newCatagories)
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
      const newCatagories = [...categories];
       // index of row we are editing now
      const index = categories.findIndex((category) => category.id === editCatagorieId);
      newCatagories[index] = editCatagorieId;
      await fetch(`http://localhost:5000/category/${editCatagorieId}`,{
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(editedcategory) 
       })
       setCategories(newCatagories);
       setEditCatagorieId(null);
    };

    const [currentPage, setCurrentPage] = useState(1);
    const [categoryPerPage ,setCategoryPerPage] = useState(10);
    const indexOfLastCategory = currentPage * categoryPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
    const currentCategories = categories.slice(indexOfFirstCategory, indexOfLastCategory);

    const paginate = pageNumber => setCurrentPage(pageNumber);
  return (

    <MainLayout>
      <SideNavBarLayout />
       <SearchBar  categories={categories} deleteCategory={deleteCategory} editCatagorieId={editCatagorieId} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} handleEditClick={handleEditClick} handleEditFormSubmit={handleEditFormSubmit}/ >
       <ModalDialog categories={categories} setCatagories={categories} />
        <form onSubmit={handleEditFormSubmit}>
           <table  class="table table-responsive table-sm">
           <thead >
           <tr>
              <th scope="col">Name</th>
           </tr>
           </thead>
           <tbody>
           {currentCategories.map((category, key) =>
          <Fragment>
            {editCatagorieId === category.id ? <EditableRowCat  key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
            <ReadOnlyRowCat category={category} key={key} deleteCategory={deleteCategory} handleEditClick={handleEditClick}/>}
           </Fragment>
            )}
         </tbody>
        </table>
        <div className="container">
        <Pagination
        setCategoryPerPage={setCategoryPerPage}
        categoryPerPage={categoryPerPage}
        totalCategories={categories.length}
        paginate={paginate}
      />
    </div>
      </form>
    </MainLayout>
  )}


export default ProductCatagories