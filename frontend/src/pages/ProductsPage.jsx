
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState ,Fragment} from 'react'
import SearchBar from '../component/SearchBar'
import ModalDialog from '../component/ModalDialog'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadOnlyRow from '../component/ReadOnlyRow'
import EditableRow from '../component/EditableRow'

function ProductsPage() {
  const[products,setProducts]=useState([])
  const[editProductId,setEditProductId]=useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    code: "",
    price:"",
    category: [],
    image: "",
  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async() => {
    const result = await axios.get('products');
    setProducts(await result.data);
  }

    useEffect(() => {
        fetchProducts()
    },[])

    const  deleteProduct=async(productId)=>{
      const newProducts=[...products]
      const delelm =products.findIndex((product) =>product.id === productId);
      newProducts.splice(delelm, 1);
      await fetch(`http://localhost:5000/products/${productId}`,{
                method:"delete",
                })
      setProducts(newProducts)
      toast(`Product Removed Successfully`,toastOptions)
      }


    const handleEditClick=(e,product)=>{
          e.preventDefault();
          setEditProductId(product.id)
          const formValues = {
            name: product.name,
             code: product.code,
             price:product.price,
             category:product.category&&product.category.map((data)=>data.name),
             image: product.image,
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
      setEditProductId(null);
    };
    const handleEditFormSubmit =async (event) => {
      event.preventDefault();
      const editedProduct = {
             id:editProductId,
             name: editFormData.name,
             code: editFormData.code,
             price:editFormData.price,
             category: editFormData.category&&editFormData.category.map((data)=>data.name),
             image: editFormData.image,
      };
      const newProducts = [...products];
       // index of row we are editing now
      const index = products.findIndex((product) => product.id === editProductId);
      newProducts[index] = editedProduct;
      await fetch(`http://localhost:5000/products/${editProductId}`,{
        method: 'PUT', 
        headers: {
         'Content-type': 'application/json; charset=UTF-8'
        },
        body: JSON.stringify(editedProduct) 
       })
      setProducts(newProducts);
      setEditProductId(null);

    };
  return (

    <MainLayout>
       <SearchBar  data={products}/ >
       <ModalDialog products={products} setProducts={setProducts} />
        <form onSubmit={handleEditFormSubmit}>
           <table  class="table table-responsive table-sm">
           <thead >
           <tr>
             <th scope="col">Name</th>
             <th scope="col">Code</th>
             <th scope="col">Price</th>
             <th scope="col">Category</th>
             <th scope="col">Image</th>
             <th scope="col">Action</th>
           </tr>
           </thead>
           <tbody>
           { products.map((product, key) =>
        
   
          <Fragment>
            {editProductId === product.id ? <EditableRow  key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
            <ReadOnlyRow product={product} key={key} deleteProduct={deleteProduct} handleEditClick={handleEditClick}/>}
           </Fragment>
            )}
         </tbody>
        </table>
      </form>
    </MainLayout>
  )}


export default ProductsPage