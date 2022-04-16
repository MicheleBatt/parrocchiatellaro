import React, {useState} from "react";
import ErrorModal from "./ErrorModal";


const ExpensiveItemForm = ({ originalExpensiveItem, colors, count_id, handleCancel, appendExpensiveItem }) => {

    const [ expensiveItem, setExpensiveItem ] = useState(
        originalExpensiveItem ?
            { ...originalExpensiveItem, count_id: count_id }
        :
            { count_id: count_id, description: '', color : ''}
    )
    const [ showErrorModal, setShowErrorModal ] = useState(false)


    // Funzione che permette di creare una nuova categoria mediante query al server
    function onSubmitHandler() {
        if (expensiveItem && expensiveItem.description && expensiveItem.color) {
            let url = `/backoffice/counts/${count_id}/expensive_items${expensiveItem.id ? '/' + expensiveItem.id : ''}`;

            fetch(url + '.json', {
                method: !expensiveItem.id ? "POST" : "PUT",
                headers: {
                    Accept: "application/json",
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(expensiveItem)
            }).then(response => {
                if (handleCancel)
                    handleCancel()

                console.log('response: ', response)
                if (!response.ok)
                    throw Error("An error occour during saving data on the database");
                else
                    return response.json()
            }).then(data => {
                if (!handleCancel)
                    window.location = `/backoffice/counts/${count_id}/expensive_items`
                else if (appendExpensiveItem)
                    appendExpensiveItem(data)
            }).catch((error) => {
                console.log('ERROR:', error);
                console.error('ERROR:', error);
                setShowErrorModal(true);
            });

        }
    }

  return (
      colors && colors.length > 0 && <div>
        <div className="row">
          <div className="col-lg-6 col-md-6 col-sm-12 col-xs-12 mb-5">
            <label><b>Descrizione</b></label>
            <input
                className="form-control"
                type="text"
                name="expensive_item[description]"
                id="expensive_item_description"
                value={expensiveItem.description || ''}
                onChange={(e) => setExpensiveItem({ ...expensiveItem, description: e.target.value })}
            />
          </div>
        </div>
        <div className="row">
          <div className="col-12 mb-5">
            <label><b>Colore</b></label>
              <div className="d-flex justify-content-start text-left">
                  {
                      colors.map(color => {
                          return <div style={{ background: color }}
                                      key={color}
                                      className={`mr-2 rounded color-box cursor-pointer ${expensiveItem.color === color ? 'selected-color-box' : 'not-selected-color-box'}`}
                          onClick={(e) => setExpensiveItem({ ...expensiveItem, color: color })}/>
                      })
                  }
              </div>
          </div>
        </div>


        <div className="hr-line-dashed" />

        <div className="form-group">
          <div className="text-center">
              {
                  handleCancel &&
                      <button
                          className="btn btn-primary btn-lg mr-3"
                          onClick={handleCancel}
                      >
                          Annulla
                      </button>
              }

            <button
                className="btn btn-success btn-lg"
                disabled={ !expensiveItem || !expensiveItem.description || !expensiveItem.color }
                onClick={onSubmitHandler}
            >
              <i aria-hidden className="fas fa-save" /> Salva
            </button>
          </div>
        </div>

        <ErrorModal
            showErrorModal={showErrorModal}
            setShowErrorModal={setShowErrorModal}
        />
      </div>
    )
}

export default ExpensiveItemForm;