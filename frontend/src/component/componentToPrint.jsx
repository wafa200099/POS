import React from "react";

export const ComponentToPrint = React.forwardRef((props, ref) => {
    const {cart, totalAmount ,totalAfter ,discountValue , taxValue} = props;
    return (
      <div ref={ref} className="p-5">
          <table className='table'>
                  <thead>
                    <tr>
                      <td>code</td>
                      <td>Name</td>
                      <td>Price</td>
                      <td>Qty</td>
                      <td>Total</td>
                    </tr>
                  </thead>
                  <tbody>
                    { cart ? cart.map((cartProduct, key) => <tr key={key}>
                    <td>{cartProduct.code}</td>
                      <td>{cartProduct.name}</td>
                      <td>{cartProduct.price}</td>
                      <td>{cartProduct.quantity}</td>
                      <td>{cartProduct.total}</td>
                    </tr>)

                    : ''}
                  </tbody>
                </table>
                <h3 className='px-2'> Added Tax: ${taxValue}</h3>
                <h3 className='px-2'>Discount : ${discountValue}</h3>
                <h3 className='px-2'>Total Amount: ${totalAmount}</h3>
                <h3 className='px-2'>Total Amount After Tax And Discount: ${totalAfter}</h3>
               
      </div>
    );
});