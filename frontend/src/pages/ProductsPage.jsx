
import React from 'react'
// import AddProduct from '../component/AddProduct'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState} from 'react'
import SearchBar from '../component/SearchBar'
import '../assets/CSS/ProductPage.css'
import ModalDialog from '../component/ModalDialog'
import {toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

function ProductsPage() {
  const[products,setProducts]=useState([])
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

    //   useEffect(() => {
     
    //    deleteProduct(products.id)
        
    // },[products])

  return (

    <MainLayout>
       <SearchBar  data={products}/ >
              <ModalDialog products={products} setProducts={setProducts} />


    <table  class="table  table-sm table-responsive ">
    <thead>
    <tr>
      {/* <th scope="col">id</th> */}
      <th scope="col">name</th>
      <th scope="col">code</th>
      <th scope="col">category</th>
      <th scope="col">image</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
      {products ? products.map((product, key) =>
      <tr key={key}>
      {/* <td>{product.id}</td> */}
      <td>{product.name}</td>
      <td>{product.code}</td>
      <td></td>
      <td>{product.image}</td>
 
      {/* <DeleteProduct products={products} setProducts={setProducts} id={product.id}/> */}
      <button  type="button" class="btn btn-outline-primary p-1 m-1" onClick={()=>deleteProduct(product.id)}>DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-1">UPDATE</button>
      </tr>) : "thers no product"}
  </tbody>
</table>


 {/* <AddProduct  /> */}
    </MainLayout>
  )}


export default ProductsPage