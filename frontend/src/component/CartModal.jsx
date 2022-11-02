import React, { useState, useRef } from 'react'
import { Modal, Button } from 'react-bootstrap'
import { ComponentToPrint } from './componentToPrint'
import { useReactToPrint } from 'react-to-print';
import { AiOutlineWarning } from "react-icons/ai";
import { MdDeleteOutline } from 'react-icons/md'

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
          <span className='p-2'><i className="fa fa-shopping-cart p-2"></i>{cart.length}</span>
        </Button>
      </div>
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={toggleShowModal}>
          <Modal.Title className='text-center'>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="col-lg-12">
            <div style={{ display: "none" }}>
              <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef} totalAfter={totalAfter} discountValue={discountValue} taxValue={taxValue} />
            </div>
            <div>
              <table className='table table-responsive table-secondary table-hover'>
                <thead>
                  <tr>
                    <td>Name</td>
                    <td>Price</td>
                    <td>Quantity</td>
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
                        <button className='btn btn-light btn-sm bg-light text-black ' onClick={() => addProductToCart(cartProduct)} >+</button>
                        <div className='d-inline'>  {cartProduct.quantity} </div>
                        {cartProduct.quantity > 1 ?
                          <button className='btn btn-light btn-sm bg-light text-black ' onClick={() => decCart(cartProduct)}>-</button>
                          :
                          <button className='btn btn-light btn-sm bg-light text-black  ' >-</button>
                        }
                      </td>
                      <td>{cartProduct.total}</td>
                      <td>
                        <button className='btn btn-danger btn-sm ' onClick={() => removeProduct(cartProduct)} ><MdDeleteOutline className='mb-1' /></button>
                      </td>
                    </tr>)

                    : 'No Item in Cart'}
                </tbody>
              </table>
              <div className='cart-summary text-black mt-4 '>
                <table className='table border  '>
                  <thead >
                  </thead>
                  <tbody>
                    <tr className='border'>Added Tax
                      <td><input type="number" name="tax" className='w-25 border' value={taxValue} onChange={(event) => setTaxValue(event.target.value)} /></td>
                    </tr>
                    <tr className='border'>Discount
                      <td><input type="number" name="discount" className=' w-25 border' value={discountValue} onChange={(event) => setDiscountValue(event.target.value)} /></td>
                    </tr>
                    <tr className='border'> Total Amount
                      <td className='mt-3'>${totalAmount}</td>
                    </tr>
                    <tr className='border'> Total After Tax and Discount
                      <td className='mt-3'>${totalAfter}</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
            <div className='mt-3'>
              {totalAmount !== 0 ? <div>
                <button className='btn btn-success' onClick={handlePrint}>
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