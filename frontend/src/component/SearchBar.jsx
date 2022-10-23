import React, { useState } from "react";
import "./SearchBar.css";
import SearchIcon from "@material-ui/icons/Search";
import CloseIcon from "@material-ui/icons/Close";

function SearchBar({  data }) {
  const [filteredData, setFilteredData] = useState([]);
  const [wordEntered, setWordEntered] = useState("");
  
  const handleFilter = (event) => {
    const searchWord = event.target.value;
    setWordEntered(searchWord);

    const newFilter = data.filter((product) => {
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
         placeholder="searhe here"
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

      {filteredData.length !== 0 && (

        <div className="dataResult">
          {filteredData.map((product, index) => {
            return (   <table class="table table-hover  table-sm ">
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
    {/* map products data here  */}

      <tr key={index}>
      <td></td>
      <td>{product.name}</td>
      <td>{product.code}</td>
      <td></td>
      <td>{product.image}</td>
      <button  type="button" class="btn btn-outline-primary p-1 m-2">DELETE</button>
      <button  type="button" class="btn btn-outline-primary p-1 m-2">UPDATE</button>
      </tr>
  </tbody>
     

</table>
        
            
            );
          })}
        </div>
      )}
    </div>
  );
}

export default SearchBar;