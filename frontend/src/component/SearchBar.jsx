import React, { useState,Fragment } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ReadOnlyRow from '../component/ReadOnlyRow'
import EditableRow from '../component/EditableRow'
import Pagination from '../component/Pagination'
function SearchBar({ currentProducts,editProductId,editFormData,handleEditFormChange,handleCancelClick,deleteProduct,handleEditClick,handleEditFormSubmit,
   productsPerPage,
  totalProducts,
  paginate
}) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = currentProducts.filter((product) => {
     console.log(product.name);
      return product.name.toLowerCase().includes(searchWord.toLowerCase()) 
      // || product.code.includes(searchWord.toLowerCase());
     
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {
      setFilteredData(newFilter);
    }
  };

  const clearInput = () => {
    setFilteredData([]);
    setWordEntered("");
  };

  return (
    <div className="search">
      <div className="searchInputs">
        <input
         placeholder="Filter product"
          type="text"
          value={wordEntered}
          onChange={handleFilter}
        />
        <div className="searchIcon">
          {filteredData.length === 0 ? (
            <SearchIcon />
          ) : (
            <CloseIcon id="clearBtn" onClick={clearInput} />
          )}
        </div>
      </div>

    {filteredData.length !== 0 ? 
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
           { filteredData.map((currentProduct, key) =>
          <Fragment>
            {editProductId ===currentProduct.id ? <EditableRow  key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
            <ReadOnlyRow  product={currentProduct}  key={key} deleteProduct={deleteProduct} handleEditClick={handleEditClick}/>}
           </Fragment>
            )}
         </tbody>
        </table>
        <div className="container">
        <Pagination
        productsPerPage={productsPerPage}
        totalProducts={filteredData.length}
        paginate={paginate}
      />
    </div>
    </form>
 :null }
    </div>
  );
}

export default SearchBar;