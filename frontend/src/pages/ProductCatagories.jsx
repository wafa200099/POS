import React from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState ,Fragment} from 'react'
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
  const [search, setSearch] = useState("");
  const [filteredCategories,  setFilteredCategories] = useState([]);
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
    const [categoryPerPage ,setCategoryPerPage] = useState(5);
    const indexOfLastCategory = currentPage * categoryPerPage;
    const indexOfFirstCategory = indexOfLastCategory - categoryPerPage;
    const currentCategories = filteredCategories.slice(indexOfFirstCategory, indexOfLastCategory);
    const paginate = pageNumber => setCurrentPage(pageNumber);


    useEffect(() => {
      setFilteredCategories(
        categories.filter((category) =>
          category.name.toLowerCase().includes(search.toLowerCase())
        )
      );
    }, [search, categories]);

  return (

    <MainLayout>
      <SideNavBarLayout />
      <div className="input-group mb-4 mt-3">
      <div className="form-outline">
      <input
        className='form-control'
        id="form1"
        type="search"
        placeholder="Search Product Name"
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
  </div>
  <button type="button" className="btn btn-primary btn-sm h-70">
    <i class="fas fa-search"></i>
  </button>
   </div>
       <ModalDialog categories={categories} setCatagories={categories} />
        <form onSubmit={handleEditFormSubmit}>
           <table  class="table table-responsive table-sm">
           <thead >
           <tr>
              <th scope="col">Name</th>
              <th scope="col">Action</th>
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