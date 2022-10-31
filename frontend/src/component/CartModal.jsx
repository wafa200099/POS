import React, { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ComponentToPrint } from './componentToPrint'
import { useReactToPrint } from 'react-to-print';
import { AiOutlineWarning } from "react-icons/ai";
function CartModal({ decCart, removeProduct, totalAmount, cart, addProductToCart }) {
  const [showModal, setShowModal] = useState(false);
  const [taxValue, setTaxValue] = useState(0);
  const [discountValue, setDiscountValue] = useState(0);
  const toggleShowModal = () => {
    setShowModal(!showModal);
  };
  const componentRef = useRef();
  const handleReactToPrint = useReactToPrint({
    content: () => componentRef.current,
  });

  const handlePrint = () => {
    handleReactToPrint();
  }
  let totalAfter = totalAmount + (totalAmount * taxValue) - (totalAmount * discountValue)
  return (
    <>
      <div className='d-flex justify-content-end mt-3 '>

        <Button variant="primary" onClick={toggleShowModal} className="mb-1 px-3 py-2   ">
          <span ><i class="fa fa-shopping-cart"></i> {cart.length}</span>
        </Button>
      </div>

      <Modal show={showModal}>
        <Modal.Header closeButton onClick={toggleShowModal}>
          <Modal.Title className='text-center'>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div style={{ display: "none" }}>
              <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} totalAfter={totalAfter} />
            </div>
            <div className='table-responsive'>
              <table className='table table-responsive table-dark table-hover'>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Qty</td>
                    <td>Total</td>
                    <td>Action</td>
                  </tr>
                </thead>
                <tbody>
                  {cart ? cart.map((cartProduct, key) =>
                    <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>${cartProduct.price}</td>
                      <td>
                        <button className='btn btn-light btn-sm bg-dark text-white mx-2' onClick={() => addProductToCart(cartProduct)} >+</button>
                        <div className='d-inline'>  {cartProduct.quantity} </div>
                        {cartProduct.quantity > 1 ?
                          <button className='btn btn-light btn-sm bg-dark text-white mx-2' onClick={() => decCart(cartProduct)}>-</button>
                          :
                          <button className='btn btn-light btn-sm bg-dark text-white mx-2 ' >-</button>
                        }
                      </td>
                      <td>{cartProduct.total}</td>
                      <td>
                        <button className='btn btn-danger btn-sm' onClick={() => removeProduct(cartProduct)} >Remove</button>
                      </td>

                    </tr>)

                    : 'No Item in Cart'}
                </tbody>
              </table>
              <div className='cart-summary text-black'>
                <table className='table border'>
                  <thead>
                    <th>Added Tax</th>
                    <th>Added Discount</th>
                  </thead>
                  <tbody>
                    <td> <input type="number" name="tax" className='w-25 border' value={taxValue} onChange={(event) => setTaxValue(event.target.value)} /></td>
                    <td><input type="number" name="discount" className=' w-25 border' value={discountValue} onChange={(event) => setDiscountValue(event.target.value)} /></td>
                  </tbody>
                  <h5 className='mt-3'>Total Amount = ${totalAmount}</h5>
                  <h5 className='mt-2'>Total After Tax and Discount= ${totalAfter}</h5>
                </table>
              </div>
            </div>
            <div className='mt-3'>
              {totalAmount !== 0 ? <div>
                <button className='btn btn-primary' onClick={handlePrint}>
                  Pay Now
                </button>

              </div> : <h4 className='text-danger'><AiOutlineWarning className='mx-2 mb-2' />Please add Product to the cart</h4>
              }
            </div>

          </div>

        </Modal.Body>
        <Modal.Footer>
          <Button variant="danger" onClick={toggleShowModal}>
            Close
          </Button>

        </Modal.Footer>
      </Modal>
    </>
  )
}
export default CartModal