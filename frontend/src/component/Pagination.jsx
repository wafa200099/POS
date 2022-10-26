import React from 'react';
import '../component/Pagination.css'
const Pagination = ({ productsPerPage,totalProducts, paginate ,setProductsPerPage ,onRowsPerPageChange}) => {
  const pageNumbers = [];
  for (let i = 1; i <= Math.ceil(totalProducts / productsPerPage); i++) {
    pageNumbers.push(i);


  }
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
          <span > Row per page 
         
            <select>
              <option   value={5} >5</option>
              <option  value={10} >10</option>
              <option  value={15} >15</option>
            </select>
         
          
          </span>
      </ul>
    </nav>
  );
};

export default Pagination;