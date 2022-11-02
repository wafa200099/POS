
import MainLayout from '../layouts/MainLayout'
import axios from 'axios'
import React,{ useEffect, useState, Fragment } from 'react'
import ModalDialog from '../component/ModalDialog'
import { toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import ReadOnlyRow from '../component/ReadOnlyRow'
import EditableRow from '../component/EditableRow'
import SideNavBarLayout from '../layouts/SideNavBarLayout'
import Pagination from '../component/Pagination'
// import { Formik, Field, Form } from 'formik';

function ProductsPage() {
  const [products, setProducts] = useState([])
  const [categories, setCatagories] = useState([])
  const [search, setSearch] = useState("");
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [editProductId, setEditProductId] = useState(null)
  const [editFormData, setEditFormData] = useState({
    name: "",
    code: "",
    price: "",
    category: "",
    image: "",
  });

  const toastOptions = {
    autoClose: 400,
    pauseOnHover: true,
  }

  const fetchProducts = async () => {
    const result = await axios.get('products');
    setProducts(await result.data);
  }

  useEffect(() => {
    fetchProducts()
  }, [])


  const fetchCatagories = async () => {
    const result = await axios.get('category');
    setCatagories(await result.data);
  }

  useEffect(() => {
    fetchCatagories()
  }, [])

  const deleteProduct = async (productId) => {
    const newProducts = [...products]
    const delelm = products.findIndex((product) => product.id === productId);
    newProducts.splice(delelm, 1);
    await fetch(`http://localhost:5000/products/${productId}`, {
      method: "delete",
    })
    setProducts(newProducts)
    toast(`Product Removed Successfully`, toastOptions)
  }


  const handleEditClick = (e, product) => {
    e.preventDefault();
    setEditProductId(product.id)
    const formValues = {
      name: product.name,
      code: product.code,
      price: product.price,
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
  const handleEditFormSubmit = async (event) => {
    event.preventDefault();
    const editedProduct = {
      id: editProductId,
      name: editFormData.name,
      code: editFormData.code,
      price: editFormData.price,
      category: editFormData.category,
      image: editFormData.image,


    };
    const newProducts = [...products];
    // index of row we are editing now
    const index = products.findIndex((product) => product.id === editProductId);
    newProducts[index] = editedProduct;
    await fetch(`http://localhost:5000/products/${editProductId}`, {
      method: 'PUT',
      headers: {
        'Content-type': 'application/json; charset=UTF-8'
      },
      body: JSON.stringify(editedProduct)
    })
    setProducts(newProducts);
    setEditProductId(null);

  };

  useEffect(() => {
    setProducts(products)
    setFilteredProducts(
      products.filter((product) =>
        product.name.toLowerCase().includes(search.toLowerCase())
      )
    );

  }, [search, products]);


  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage, setProductsPerPage] = useState(5);
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = filteredProducts.slice(indexOfFirstProduct, indexOfLastProduct);
  const paginate = pageNumber => setCurrentPage(pageNumber);
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

      <ModalDialog categories={categories} products={products} setProducts={setProducts}  />
      <form onSubmit={handleEditFormSubmit}>
        <table class="table table-responsive table-sm">
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
            {currentProducts.map((currentProduct, key) =>
              <Fragment>
                {editProductId === currentProduct.id ? <EditableRow categories={categories} key={key} editFormData={editFormData} handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick} /> :
                  <ReadOnlyRow product={currentProduct} key={key} deleteProduct={deleteProduct} handleEditClick={handleEditClick} />}
              </Fragment>
            )}
          </tbody>
        </table>
        <div className="container">
          <Pagination
            setProductsPerPage={setProductsPerPage}
            productsPerPage={productsPerPage}
            totalProducts={products.length}
            paginate={paginate}
          />
        </div>
      </form>

    </MainLayout>
  )
}


export default ProductsPage