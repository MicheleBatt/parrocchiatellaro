import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";
import ExpensiveItemForm from "./ExpensiveItemForm";


const ExpensiveItemModal = ({ colors, count_id, showModal, setShowModal, appendExpensiveItem }) => {

    const expensiveItem = {
        description: "",
        color: null
    }

    // Funzione che gestisce la chiusura della modale
    const handleCloseModal = () => {
        setShowModal(false);
    }

    return (
        <Modal
            show={ showModal }
            onHide={ handleCloseModal }
            animation={false}
            size="lg"
        >
            <Modal.Header>
                <h4>
                    Crea una nuova Categoria sul Conto
                </h4>
            </Modal.Header>
            <Modal.Body>
                <ExpensiveItemForm
                    originalExpensiveItem={expensiveItem}
                    colors={colors}
                    count_id={count_id}
                    handleCancel={handleCloseModal}
                    appendExpensiveItem={appendExpensiveItem}
                />
            </Modal.Body>
        </Modal>
    )
}

export default ExpensiveItemModal;