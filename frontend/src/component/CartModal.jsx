import React,{useState,useRef} from 'react'
import { Modal, Button } from 'react-bootstrap'
import {ComponentToPrint} from './componentToPrint'
import { useReactToPrint } from 'react-to-print';
function CartModal({decCart,removeProduct,totalAmount,cart,addProductToCart}) {
    const [showModal, setShowModal] = useState(false);
    const [taxValue, setTaxValue] = useState('');
    const [discountValue, setDiscountValue] = useState('');
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


      // let TaxPrice =totalAmount*{taxValue};
      // let  DiscountPrice  =totalAmount*{discountValue};
      // totalAmount=TaxPrice+DiscountPrice
  return (
    <>
  
      <Button variant="primary" onClick={toggleShowModal} className="mb-4">
        <span><i class="fa fa-shopping-cart"></i> {cart.length}</span>    
      </Button> 
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={toggleShowModal}>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <div className="col-lg-12">
        <div style={{display: "none"}}>
                <ComponentToPrint cart={cart} totalAmount={totalAmount} ref={componentRef}/>
              </div> 
        <div className='table-responsive bg-dark'>
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
                    { cart ? cart.map((cartProduct, key) =>
                      <tr key={key}>
                      <td>{cartProduct.name}</td>
                      <td>${cartProduct.price}</td>
                      <td>
                        <button className='btn btn-light btn-sm bg-dark text-white mx-2'onClick={()=>addProductToCart(cartProduct)} >+</button>
                        <div className='d-inline'>  {cartProduct.quantity} </div>
                        {cartProduct.quantity >1 ? 
                        <button className='btn btn-light btn-sm bg-dark text-white mx-2' onClick={()=>decCart(cartProduct)}>-</button>
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
                <div>
                 <label htmlFor='tax' className='text-white'>Tax</label>

              <input type="number" id="tax" name="tax"  className='float-left input-group w-25' value={taxValue} onChange={(event) => setTaxValue(event.target.value)}/>
                 <label htmlFor='discount' className='text-white'>Discount</label>
              <input type="number" id="discount" name="discount" className='float-left input-group w-25' value={discountValue} onChange={(event) => setDiscountValue(event.target.value)} />
               </div>
                {/* <h5 className='px-2 text-white'>TaxPrice=${TaxPrice}</h5>
                <h5 className='px-2 text-white'>DiscountPrice=${DiscountPrice}</h5> */}
                <h3 className='px-2 text-white'>Total Amount = ${totalAmount}</h3>
           
                </div>
                <div className='mt-3'>
                { totalAmount !== 0 ? <div>
                  <button className='btn btn-primary' onClick={handlePrint}>
                    Pay Now
                  </button>

                </div> : 'Please add a product to the cart'

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