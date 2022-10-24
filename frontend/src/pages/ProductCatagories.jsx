import React from 'react'
import MainLayout from '../layouts/MainLayout'
import Modal from '../component/Modal'
import {useState} from 'react'
function ProductCatagories() {
  const [showModal, setShowModal] = useState(false);
  const toggleShowModal = () => {
        setShowModal(!showModal);
        console.log("hiiiiiiiiiiii there");
    };
  return (
    <MainLayout>

<button type="button" className="add-btn" onClick={toggleShowModal} >ADD PRODUCT</button>

  {showModal ? (
      <Modal>
        <h3>ADD PRODUCT FORM </h3>
        <div className="modal-buttons">
          <button className="cancle-button" onClick={toggleShowModal}>
            CANCEL
          </button>
        </div>
      </Modal>
    ) :"nooooo modal"}
        </MainLayout>
  )
}

export default ProductCatagories