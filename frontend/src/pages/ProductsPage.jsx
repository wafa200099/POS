
import React from 'react'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState ,Fragment} from 'react'
import SearchBar from '../component/SearchBar'
import '../assets/CSS/ProductPage.css'
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
    category: "",
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
             category: product.category,
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

  return (

    <MainLayout>
       <SearchBar  data={products}/ >
       <ModalDialog products={products} setProducts={setProducts} />
        <form>
           <table  class="table  table-sm table-responsive ">
           <thead>
           <tr>
             <th scope="col">name</th>
             <th scope="col">code</th>
             <th scope="col">category</th>
             <th scope="col">image</th>
             <th scope="col">Action</th>
           </tr>
           </thead>
           <tbody>
           { products.map((product, key) =>
   
          <Fragment>
            {editProductId === product.id ? <EditableRow editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> : 
            <ReadOnlyRow product={product} key={key} deleteProduct={deleteProduct} handleEditClick={handleEditClick}/>}
           </Fragment>
            )}
         </tbody>
        </table>
      </form>
    </MainLayout>
  )}


export default ProductsPage