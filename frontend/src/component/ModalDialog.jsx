import React, { useState } from 'react'
import { Modal, Button } from 'react-bootstrap'
import AddCategory from './AddCategory';
import AddProduct from './AddProduct';

function ModalDialog({ products, setProducts, categories, setCategories, fetchCatagories }) {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
    setShowModal(!showModal);

  };
  return (
    <>
      {products ?
        <Button variant="primary" onClick={toggleShowModal} className="mb-4">
          ADD PRODUCT
        </Button>
        :
        <Button variant="primary" onClick={toggleShowModal} className="mb-4">
          ADD CATEGORY
        </Button>}
      <Modal show={showModal}>
        <Modal.Header closeButton onClick={toggleShowModal}>
          {products ?
            <Modal.Title>Add Product</Modal.Title> :
            <Modal.Title>Add Category</Modal.Title>}
        </Modal.Header>
        <Modal.Body>
          {products ?
            <AddProduct categories={categories} products={products} setProducts={setProducts} />
            :
            <AddCategory categories={categories} setCategories={setCategories} fetchCatagories={fetchCatagories} />
          }
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