import React, {useEffect, useState} from "react";
import Modal from "react-bootstrap/Modal";


const MovementForm = ({ movement, setMovement, expensive_items, openModal, setOpenModal, handleConfirm }) => {

    console.log('expensive_items: ', expensive_items)
    console.log('movement: ', movement)



    // Funzione che gestisce la chiusura della modale che permette all'utente di aggiornare i dati
    // associati alla blueprint_image
    const handleCloseModal = () => {
        setOpenModal(false);
    }

    return (
        <Modal
            show={ openModal }
            onHide={ handleCloseModal }
            animation={false}
            size="lg"
        >
            <Modal.Header>
                <h4>
                    Inserisci un nuovo movimento di cassa in archivio
                </h4>
            </Modal.Header>
            <Modal.Body>
                <div className="row mt-3 mb-3">
                    <div className="col-4 d-block justify-content-start">
                        <b style={{display: 'block'}} htmlFor="movement_currency_date">Data Valuta</b>
                        <input type="datetime-local" name="currency_date" id="movement_currency_date" className="form-control"
                               onChange={(e) => setMovement({ ...movement, currency_date: e.target.value })} />
                    </div>

                    <div className="col-4 d-block justify-content-start">
                        <b>Tipo</b>
                        <div className="pt-1">
                            {[['in', 'Entrata'], ['out', 'Uscita']].map(type => {
                                return <span key={type[0]}>
                                  <input type="radio" value={type[0]}
                                         checked={type[0] === movement.movement_type}
                                         id={"movement_type_" + type[0]}
                                         onChange={(e) => setMovement({ ...movement, movement_type: e.target.value })}/>
                                  <b className="pr-3 ml-1"
                                         htmlFor={"movement_type_" + type[0]}> {type[1]}</b>
                            </span>
                            })}
                        </div>
                    </div>

                    <div className="col-4 d-block justify-content-start">
                        <b>Voce</b>
                        <select
                            className="form-control mb-3"
                            value={movement.expensive_item_id}
                            onChange={(e) => setMovement({ ...movement, expensive_item_id: e.target.value })}
                        >
                            <option value="" key="empty_item">Seleziona una Voce</option>
                            {
                                expensive_items.map((item) => {
                                    return <option value={item[1]} key={item[1]}>
                                        {item[0]}
                                    </option>
                                })
                            }
                        </select>
                    </div>

                    <div className="col-12 d-block justify-content-start">
                        <b>Causale</b>
                        <textarea
                            className="form-control mb-3"
                            value={movement.causal}
                            onChange={(e) => setMovement({ ...movement, causal: e.target.value })}
                        >
                        </textarea>
                    </div>

                    <div className="col-12 d-block justify-content-start">
                        <b>Eventuali Note</b>
                        <textarea
                            className="form-control mb-3"
                            value={movement.note}
                            onChange={(e) => setMovement({ ...movement, note: e.target.value })}
                        >
                        </textarea>
                    </div>
                </div>
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
                        onClick={ handleConfirm }>
                        <i className="fas fa-save" /> Salva
                    </button>
                </div>
            </Modal.Footer>
        </Modal>
    )
}

export default MovementForm;