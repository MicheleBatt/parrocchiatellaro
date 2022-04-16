import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import {isValidMovement} from "../../utils";
import MovementForm from "./MovementForm";


const MovementModal = ({ movement, setMovement, expensive_items, handleConfirm, handleChangeDocument }) => {

    console.log('expensive_items: ', expensive_items)
    console.log('movement: ', movement)


    // Funzione che gestisce la chiusura della modale
    const handleCloseModal = () => {
        setMovement(null);
    }

    return (
        <Modal
            show={ movement !== null }
            onHide={ handleCloseModal }
            animation={false}
            size="lg"
        >
            <Modal.Header>
                <h4>
                    Inserisci un nuovo movimento di cassa sul Conto
                </h4>
            </Modal.Header>
            <Modal.Body>
                <MovementForm
                    movement={movement}
                    setMovement={setMovement}
                    expensive_items={expensive_items}
                    handleChangeDocument={handleChangeDocument}
                />
            </Modal.Body>

            <Modal.Footer>
                <div className="center-btn-on-mobile">
                    <button
                        type="button"
                        className="btn btn-primary pr-2 pl-2 mr-3"
                        onClick={ handleCloseModal }>
                        Annulla
                    </button>
                    <button
                        type="button"
                        className="btn btn-success pr-2 pl-2"
                        disabled={!isValidMovement(movement)}
                        onClick={ handleConfirm }>
                        <i aria-hidden className="fas fa-save" /> Salva
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default MovementModal;