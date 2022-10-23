
import React from 'react'
import AddProduct from '../component/AddProduct'
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import {useEffect ,useState} from 'react'
import SearchBar from '../component/SearchBar'
import DeleteProduct from '../component/DeleteProduct'
function ProductsPage() {
  const[products,setProducts]=useState([])
  


  // const deleteProduct=()=>deleteProduct(products)
  const fetchProducts = async() => {

    const result = await axios.get('products');
    setProducts(await result.data);

  }

    useEffect(() => {
        fetchProducts()
    },[])
  return (
    <MainLayout>
      <SearchBar  data={products}/ >
   <table  class="table  table-sm table-responsive ">
    <thead>
    <tr>
      <th scope="col">id</th>
      <th scope="col">name</th>
      <th scope="col">code</th>
      <th scope="col">category</th>
      <th scope="col">image</th>
    </tr>
  </thead>
  <tbody>
      {products ? products.map((product, key) =>
      <tr key={key}>
      <td>{product.id}</td>
      <td>{product.name}</td>
      <td>{product.code}</td>
      <td></td>
      <td>{product.image}</td>
      <DeleteProduct products={products} setProducts={setProducts} id={product.id}/>
      {/* <button  type="button" class="btn btn-outline-primary p-1 m-1">DELETE</button> */}
      <button  type="button" class="btn btn-outline-primary p-1 m-1">UPDATE</button>
      </tr>) : "thers no product"}
  </tbody>
</table>
 <button type="button" className="btn btn-primary">add</button>
  <AddProduct />
    </MainLayout>
  )}


export default ProductsPage