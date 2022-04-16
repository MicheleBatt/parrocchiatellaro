import React, {useEffect, useState} from "react";
import MovementForm from "./MovementForm";


const IndexMovements = ({ movements, expensive_items }) => {

    const [ openModal, setOpenModal ] = useState(false)

    console.log('expensive_items: ', expensive_items)
    console.log('movements: ', movements)
    console.log('openModal: ', openModal)

    const emptyMovement = {
        currency_date: null,
        movement_type: 'in',
        causal: '',
        expensive_item_id: "",
        note: ''
    }

    const [ movement, setMovement ] = useState(emptyMovement)


    const createMovement = () => {
        const url = "/backoffice/movements";
        console.log(movement)

        fetch(url, {
            method: "POST",
            headers: {
                Accept: "application/json",
                "Content-Type": "application/json",
            },
            body: JSON.stringify(movement),
        }).then((res) => {
            if (!res.ok)
                throw Error("An error occour during saving data on the database");
            else
                return res.json()
        })
            .then((data) => {
                location.reload()
            })
            .catch((error) => {
                console.error("ERROR:", error);
            });
    }



    return (
        <div>
            {   movements &&
                    <table className="table table-hover no-margins mt-5">
                    <thead>
                    <tr>
                        <th className="text-center">Data Valuta</th>
                        <th className="text-center">Tipo</th>
                        <th className="text-center">Causale</th>
                        <th className="text-center">Voce</th>
                        <th className="text-center">Note</th>
                        <th className="text-center"/>
                    </tr>
                    </thead>
                    <tbody>
                    {movements.map((movement, i) => (
                        <tr key={`movement-${movement.id}`}>
                            <td className="text-center">{movement.parsed_currency_date}</td>
                            <td className="text-center">{movement.movement_type === 'in' ? 'ENTRATA' : 'USCITA'}</td>
                            <td className="text-center">
                                {movement.causal}
                            </td>
                            <td className="text-center">
                                {movement.expensive_item && movement.expensive_item.description}
                            </td>
                            <td className="btn-group text-center d-flex justify-content-center">
                                {movement.note}
                            </td>
                            <td className="text-center">
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            }

            <button
                className="btn btn-xs btn-primary mb-2"
                disabled={openModal}
                onClick={() => setOpenModal(true)}>
                <i className="fas fa-fw fa-plus" /> Inserisci un nuovo Movimento di cassa
            </button>

            <MovementForm
                movement={movement}
                setMovement={setMovement}
                expensive_items={expensive_items}
                openModal={openModal}
                setOpenModal={setOpenModal}
                handleConfirm={createMovement}
            />
        </div>
    )
}

export default IndexMovements;