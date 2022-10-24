import React,{useState} from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddProduct from './AddProduct';

function ModalDialog({products,setProducts}) {
    const [showModal, setShowModal] = useState(false);
    const toggleShowModal = () => {
          setShowModal(!showModal);
        
      };
  return (
    <>
      <Button variant="primary" onClick={toggleShowModal}>
      ADD PRODUCT
      </Button>
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={toggleShowModal}>
          <Modal.Title>Add Product</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        <AddProduct products={products} setProducts={setProducts} />
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
export default ModalDialog