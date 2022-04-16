import React, { useState, useEffect, useCallback, useRef } from "react";
import Modal from "react-bootstrap/Modal";

const ErrorModal = ({
  showErrorModal,
  setShowErrorModal,
  additionalText
  }) => {

  return <Modal show={showErrorModal} onHide={() => setShowErrorModal(false)} animation={false} centered>
    <Modal.Header>
      <Modal.Title>ERRORE!</Modal.Title>
    </Modal.Header>
    <Modal.Body>
      <h4>
        <div className="d-block text-center">
          <div className="d-flex justify-content-center align-items-center">
            <i aria-hidden className="fas fa-exclamation-triangle" style={{fontSize:"40px"}} />
            <p className="ml-2 text-space">Spiacenti, qualcosa è andato storto</p>
          </div>
          {
            additionalText &&
              <div className="d-flex justify-content-center align-items-center mt-4">
                <p className="ml-2 text-space">
                 { additionalText }
                </p>
              </div>
          }
        </div>
      </h4>

    </Modal.Body>
    <Modal.Footer>
      <button
        type="button"
        className="btn-standard bg-dark text-light pr-2 pl-2 w-120px btn-standard-resized pt-4px-imp h-35px"
        onClick={() => setShowErrorModal(false)}
      >
        OK
      </button>
    </Modal.Footer>
  </Modal>
};

export default ErrorModal;