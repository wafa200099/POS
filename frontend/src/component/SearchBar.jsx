import React, { useState,Fragment } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";
import ReadOnlyRow from '../component/ReadOnlyRow'
import EditableRow from '../component/EditableRow'
import ReadOnlyRowCat from '../component/ReadOnlyRowCat'
import EditableRowCat from '../component/EditableRowCat'
function SearchBar({ currentProducts,editProductId,editFormData,handleEditFormChange,handleCancelClick,deleteProduct,handleEditClick,handleEditFormSubmit,
  categories,
  editCatagorieId,
  deleteCategory

}) {
 
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = currentProducts && currentProducts.filter((product) => {
      return product.name.toLowerCase().includes(searchWord.toLowerCase()) 
      // || product.code.includes(searchWord.toLowerCase());
     
    });

    const newFilterCategory =  categories && categories.filter((catagory) => {
      return catagory.name.toLowerCase().includes(searchWord.toLowerCase()) 
      // || product.code.includes(searchWord.toLowerCase());
     
    });

    if (searchWord === "") {
      setFilteredData([]);
    } else {

      currentProducts ? setFilteredData(newFilter): 
        setFilteredData(newFilterCategory)
  
     
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
   <div className="search-result">
    {filteredData.length !== 0 ? 
     <form onSubmit={handleEditFormSubmit}>
           <table  class="table table-responsive table-sm">
           <thead >
           {currentProducts?
           <tr>
             <th scope="col">Name</th>
             <th scope="col">Code</th>
             <th scope="col">Price</th>
             <th scope="col">Category</th>
             <th scope="col">Image</th>
             <th scope="col">Action</th>
             </tr>
             :
             <tr>
             <th scope="col">Name</th>
             <th scope="col">Action</th>
             </tr>}
         
           </thead>
           <tbody>
            
           {currentProducts ? filteredData.map((currentProduct, key) =>
          <Fragment>
          {editProductId ===currentProduct.id ? 
          <EditableRow categories={categories} key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
          <ReadOnlyRow  product={currentProduct}  key={key} deleteProduct={deleteProduct} handleEditClick={handleEditClick}/>}
         </Fragment>
            ):null}

       {categories ? filteredData.map((category, key) =>
           <Fragment>
           {editCatagorieId === category.id ? 
           
           <EditableRowCat  key={key} editFormData={editFormData}  handleEditFormChange={handleEditFormChange} handleCancelClick={handleCancelClick}   /> : 
           <ReadOnlyRowCat category={category} key={key} deleteCategory={deleteCategory} handleEditClick={handleEditClick}/>}
          </Fragment>
            ):null}
         </tbody>
        </table>
    </form>
    :null}
       </div>
    </div>
  );
}

export default SearchBar;