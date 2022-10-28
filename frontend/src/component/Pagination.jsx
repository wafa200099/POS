import React from 'react';
import '../component/Pagination.css'
const Pagination = ({ productsPerPage,totalProducts, paginate ,setProductsPerPage ,onRowsPerPageChange, categoryPerPage, totalCategories}) => {

  const pageNumbers = [];
  
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);
  }
  

  for (let i = 1; i <= Math.ceil(totalCategories / categoryPerPage); i++) {
    pageNumbers.push(i);
  } 


// function rowsPerPage(num){
//   setProductsPerPage(num)
// }
  
  return (
    <nav>
      <ul className='pagination'>
        {pageNumbers.map(number => (
          <li key={number} className='page-item'>
            <a onClick={() => paginate(number)}  className='page-link'>
              {number}
            </a>
     
          </li>
        ))}
          {/* <span className='page-link' > Row per page ({productsPerPage}) */}
             {/* <select>
              <option   value={5} >5</option>
              <option  value={10} >10</option>
              <option  value={15} >15</option>
            </select>
          */}
          {/* </span> */}
      </ul>
    </nav>
  );
};

export default Pagination;