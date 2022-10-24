import React, { useEffect, useRef } from "react";
import { createPortal } from "react-dom";
// import '../component/Modal.css'


 function Modal({ children }) {
  const elementRef = useRef(null);
  if (!elementRef.current) {
    elementRef.current = document.createElement("div");
  }
  useEffect(() => {
    const modalRoot = document.getElementById("modal");
    modalRoot.append(elementRef.current);
    return () => modalRoot.removeChild(elementRef.current);
  }, []);
  return createPortal(
    <div className="modal">{children}</div>,
    elementRef.current
  );
}

export default Modal