import React, {useState, useEffect} from "react";
import ErrorModal from "./ErrorModal";
import {CURRENCY_EURO, parseAmount} from "../../utils";
import MovementModal from "./MovementModal";
import ExpensiveItemModal from "./ExpensiveItemModal";


const IndexMovements = ({
    originalCount,
    expensive_items,
    currentAmount,
    originalColors
}) => {


    const [ count, setCount ] = useState(JSON.parse(originalCount))
    const [ expensiveItems, setExpensiveItems ] = useState(JSON.parse(expensive_items))
    const [ colors, setColors ] = useState(originalColors)
    const [ showErrorModal, setShowErrorModal ] = useState(false)
    const [ initCompleted, setInitCompleted ] = useState(false)
    const initialFilters = {
        from_date: null,
        to_date: null,
        expensive_item_id: null,
        movement_type: null,
        min_amount: null,
        max_amount: null
    }
    const [ filters, setFilters ] = useState(initialFilters)
    const [ focus, setFocus ] = useState(false)
    const [ page, setPage ] = useState(1);
    const [ attachment, setAttachment ] = useState(null)

    const newOutMovement = {
        count_id: count.id,
        expensive_item_id: null,
        amount: 0.0,
        causal: '',
        note: '',
        currency_date: null,
        movement_type: 'out',
        is_new: true,
        document: null
    }

    const newInMovement = {
        count_id: count.id,
        expensive_item_id: null,
        amount: 0.0,
        causal: '',
        note: '',
        currency_date: null,
        movement_type: 'in',
        is_new: true,
        document: null
    }

    const [ movement, setMovement ] = useState(null)
    const [ showExpensiveItemModal, setShowExpensiveItemModal ] = useState(false)

    console.log('count: ', count)
    console.log('expensiveItems: ', expensiveItems)
    console.log('attachment: ', attachment)



    useEffect(() => {
        if (!initCompleted) {
            setInitCompleted(true)
        }
    }, []);


    useEffect(() => {
        if (initCompleted && count.movements.length === 0) {
            getCount()
        }
    }, [count.movements]);

    useEffect(() => {
        const onKeyDown = (e) => {
            if (e.key === 'Enter' && focus) {
                window.scrollTo(0, 0);
                handleSearch()
            }
        }

        document.addEventListener('keydown', onKeyDown);
        return () => {
            document.removeEventListener('keydown', onKeyDown);
        }
    }, [ filters ]);


    // Funzione che permette di allegare un documento a un movimento di cassa
    const handleChangeDocument = (e) => {
        let file = e.target.files[0]
        if (!file) {
            file = e.dataTransfer.files[0]
        }

        setMovement({...movement, document: file})
        setAttachment(file);
    }


    // Funzione che permette di creare un nuovo movimento di cassa / modificarne uno già esistente mediante query al server
    const handleCreateUpdateMovement = () => {
        const url = movement.id ? `/backoffice/movements/${movement.id}` : "/backoffice/movements";

        console.log('movement: ', movement)

        const newMovement = { movement: movement }
        const formData = new FormData();
        Object.entries(newMovement).forEach(([key, value]) => {
            Object.entries(newMovement[key]).forEach(([k, v]) => {
                if (v !== null)
                    formData.append(`${key}[${k}]`, v)
            })
        })

        fetch(url + '.json', {
            method: movement.id ? "PUT" : "POST",
            body: formData,
        }).then((res) => {
            setMovement(null)
            if (!res.ok)
                throw Error("An error occour during saving data on the database");
            else
                return res.json()
        })
            .then((data) => {
                location.reload()
            })
            .catch((error) => {
                setShowErrorModal(true)
                console.error("ERROR:", error);
            });
    }


    // Funzione che elimina un certo movimento di cassa dal conto
    function onDeleteHandler(movementId) {
        if (window.confirm("Sei davvero sicuro di voler cancellare questo movimento dal conto?")) {
            const url = `/backoffice/movements/${movementId}`;

            fetch(url + ".json", {
                method: "DELETE",
            })
                .then((response) => {
                    if (!response.ok)
                        throw Error("An error occour during saving data on the database");
                    else
                        return response.json();
                })
                .then(data => {
                    location.reload()
                })
                .catch((error) => {
                    console.error("ERROR:", error);
                    setShowErrorModal(true);
                });
        }
    }


    // Funzione che aggiunge (eventuali) filtri all'endopoint del server che ritorna tutti i movimenti del conto
    const addFiltersToUrl = (url) => {
        Object.entries(filters).forEach(([fieldName, fieldValue]) => {
            if (fieldValue !== null)
                url += `&${fieldName}=${fieldValue}`
        })

        return url
    }


    // Funzione che permette di ottenere dal server nuovi movimenti del conto
    const getCount = () => {
        let url = `/backoffice/counts/${count.id}.json?page=${page}`

        url = addFiltersToUrl(url)

        fetch(url, {
            method: 'GET'
        })
            .then(response => response.json())
            .then((data) => {
                console.log(data);
                setCount(data)
            })
            .catch((err) => console.log(err));
    }


    // Funzione che aggiunge un nuovo expensive item
    // alla lista di tutti gli expensive items disponibili per il conto
    const appendExpensiveItem = (newExpensiveItem) => {
        setExpensiveItems(expensiveItems.concat([newExpensiveItem]))

        const newAmountsByExpensiveItem = { ...count.amounts_by_expensive_items }
        newAmountsByExpensiveItem[newExpensiveItem['id'].toString()] = 0.0
        setCount({...count, amounts_by_expensive_items: newAmountsByExpensiveItem})

        setColors(colors.filter((color) => color !== newExpensiveItem.color))
    }


    // Funzione che permette di ottenere dal server i movimenti di cassa che matchano con i filtri
    // di ricerca specificati dall'utente sull'interfaccia grafica
    const updateFilters = (filter, value) => {
        const newFilters = { ...filters }
        newFilters[filter] = value;
        setFilters(newFilters)
    }


    // Funzione che avvia una nuova ricerca di movimenti di cassa secondo i nuovi filtri di ricerca impostati dall'utente
    // sull'interfaccia grafica
    const handleSearch = () => {
        setCount({ ...count, movements: [] });
    }


    // Funzione che si occupa di resettare tutti i filtri di ricerca specificati dall'utente sull'interfaccia grafica
    const handleResetFilters = () => {
        setFilters(initialFilters)
        handleSearch()
    }



    const MovementRowTable = ({ movement }) => {
        
        return <React.Fragment>
            <td className="text-center b-solid pl-0 pr-0"
                style={{ background: movement.expensive_item ? movement.expensive_item.color : 'transparent' }}>
                <div className="d-flex justify-content-center text-center">
                    <button type="button"
                            className="btn list-icon p-0 mr-2"
                            onClick={(e) => onDeleteHandler(movement.id) }>
                        <i aria-hidden className="fas fa-fw fa-trash fa-lg"/>
                    </button>

                    {
                        movement.document_file_path &&
                            <a href={movement.document_file_path} target="_blank">
                                <i aria-hidden className="fas fa-fw fa-file fa-lg color-black"/>
                            </a>
                    }
                </div>
            </td>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expensive_item ? movement.expensive_item.color : 'transparent' }}
                onClick={() => setMovement(movement)}
            >
                { movement.currency_date }
            </td>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expensive_item ? movement.expensive_item.color : 'transparent', whiteSpace: 'normal' }}
                onClick={() => setMovement(movement)}
            >
                { movement.causal }
            </td>
            <td className="text-center b-solid cursor-pointer"
                style={{ background: movement.expensive_item ? movement.expensive_item.color : 'transparent' }}
                onClick={() => setMovement(movement)}
            >
                { parseAmount(movement.amount) }
            </td>
        </React.Fragment>
    }


    const EmptyRowTable = ({ }) => {

        return <React.Fragment>
            <td className="b-left-solid b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-right-solid b-top-bottom-transparent"/>
        </React.Fragment>
    }


    const FullEmptyRowTable = ({ }) => {

        return <React.Fragment>
            <td className="b-left-solid b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-top-bottom-transparent" />
            <td className="b-right-solid b-top-bottom-transparent"/>
        </React.Fragment>
    }
    
    
  return (
      <div className="container-fluid pr-3">
          <div className="container-fluid shadow bg-light card pl-4 pt-3 pb-3 ml-1 mr-5">
              <div className="row">
                  <div className="col-5">
                      <h2>Registro Economico { count.name }</h2>
                  </div>

                  <div className="col-7 f-flex justify-content-end text-right">
                      <button className="btn btn-danger mr-3"
                              onClick={() => setMovement(newOutMovement)}
                      >
                          <i aria-hidden className="fas fa-plus mr-1 w-5" />
                          Inserisci Movimento in Uscita
                      </button>

                      <button className="btn btn-success mr-3"
                              onClick={() => setMovement(newInMovement)}
                      >
                          <i aria-hidden className="fas fa-plus mr-1 w-5" />
                          Inserisci Movimento in Entrata
                      </button>

                      <button className="btn btn-primary mr-3"
                              onClick={() => setShowExpensiveItemModal(true)}
                      >
                          <i aria-hidden className="fas fa-plus mr-1 w-5" />
                          Crea Categoria
                      </button>

                      <a
                          href={`/backoffice/counts/${count.id}/expensive_items`}
                          className="btn btn-secondary mr-3">
                          <i aria-hidden className="fas fa-list mr-1 w-5"></i>
                          <span className="nav-label">
                            Categorie
                          </span>
                      </a>

                      <a
                          href={addFiltersToUrl(`/backoffice/counts/${count.id}?export_to_pdf=true`)}
                          className="btn btn-dark">
                          <i aria-hidden className="fas fa-print mr-1 w-5"></i>
                          <span className="nav-label">
                            Stampa
                          </span>
                      </a>
                  </div>
              </div>
          </div>

          <div className="container-fluid shadow bg-light card p-4 my-2 ml-1">
              <h3>Filtra i Movimenti di cassa per ...</h3>
              <div className="row mb-5"
                   onFocus={ () => setFocus(true) }
                   onBlur={ () => setFocus(false) }>
                  <div className="col-2">
                      <label>Categoria</label>
                      <select
                          className="form-control"
                          value={filters.expensive_item_id ? filters.expensive_item_id : ""}
                          name="expensive_item_id_filter"
                          id="expensive_item_id_filter"
                          onChange={(e) => updateFilters("expensive_item_id", e.target.value) }
                      >
                          <option value="" key="empty_item">Seleziona una Categoria</option>
                          {
                              expensiveItems.map((item) => {
                                  return <option value={item.id} key={item.id}>
                                      {item.description}
                                  </option>
                              })
                          }
                      </select>
                  </div>

                  <div className="col-2">
                      <label>Tipologia</label>
                      <select
                          className="form-control"
                          value={filters.movement_type ? filters.movement_type : ""}
                          name="movement_type_filter"
                          id="movement_type_filter"
                          onChange={(e) => updateFilters("movement_type", e.target.value) }
                      >
                          <option value="" key="empty_item">Seleziona una Tipologia</option>
                          {
                              [['Entrate', 'in'], ['Uscite', 'out']].map((item) => {
                                  return <option value={item[1]} key={item[1]}>
                                      {item[0]}
                                  </option>
                              })
                          }
                      </select>
                  </div>

                  <div className="col-2">
                      <label>Importo minimo</label>
                      <input
                          type="number"
                          value={filters.min_amount ? filters.min_amount : ""}
                          className="form-control"
                          placeholder="Scrivi l'importo minimo"
                          onChange={(e) => updateFilters("min_amount", e.target.value && e.target.value >= 0 ? e.target.value : 0.0) }
                          name="min_amount_filter"
                          id="min_amount_filter"
                      />
                  </div>

                  <div className="col-2">
                      <label>Importo massimo</label>
                      <input
                          type="number"
                          value={filters.max_amount ? filters.max_amount : ""}
                          className="form-control"
                          placeholder="Scrivi l'importo massimo"
                          onChange={(e) => updateFilters("max_amount", e.target.value && e.target.value >= 0 ? e.target.value : 0.0) }
                          name="max_amount_filter"
                          id="max_amount_filter"
                      />
                  </div>

                  <div className="col-1 pr-0 pl-0">
                      <label>A partire dal</label>
                      <input
                          type="date"
                          value={filters.from_date ? filters.from_date : ""}
                          className="form-control"
                          onChange={(e) => updateFilters("from_date", e.target.value) }
                          name="from_date_filter"
                          id="from_date_filter"
                      />
                  </div>

                  <div className="col-1 pr-0">
                      <label>Entro il</label>
                      <input
                          type="date"
                          value={filters.to_date ? filters.to_date : ""}
                          className="form-control"
                          onChange={(e) => updateFilters("to_date", e.target.value) }
                          name="to_date_filter"
                          id="to_date_filter"
                      />
                  </div>

                  <div className="col-1 text-right">
                      <br/>
                      <button className="btn btn-warning mt-2"
                              onClick={handleSearch}>
                          <i aria-hidden className="fas fa-search" /> Cerca
                      </button>
                  </div>

                  <div className="col-1 text-right">
                      <br/>
                      <button className="btn btn-secondary mt-2"
                              onClick={handleResetFilters}>
                          <i className="fas fa-filter" aria-hidden="true" /> Reset
                      </button>
                  </div>
              </div>


              <div className="d-flex justify-content-start w-100 mb-5">
                  <div className="text-right pr-5">
                      <h4>
                          FONDO CASSA ATTUALE:&nbsp;
                          <span className={`${currentAmount <= 0.0 ? 'color-red' : 'color-green'}`}>{parseAmount(currentAmount)}</span>
                      </h4>
                  </div>
              </div>



              <table className="table table-hover no-margins">
                  <thead>
                  <tr>
                      <th className="text-center b-solid color-red text-underline w-50" colSpan="4">
                          <h3><b>USCITE</b></h3>
                      </th>
                      <th className="text-center b-solid color-red text-underline w-50" colSpan="4">
                          <h3><b>ENTRATE</b></h3>
                      </th>
                  </tr>
                  <tr>
                      <th className="text-center b-solid"></th>
                      <th className="text-center b-solid text-underline">Data</th>
                      <th className="text-center b-solid text-underline">Causale</th>
                      <th className="text-center b-solid text-underline">Importo</th>
                      <th className="text-center b-solid"></th>
                      <th className="text-center b-solid text-underline">Data</th>
                      <th className="text-center b-solid text-underline">Causale</th>
                      <th className="text-center b-solid text-underline">Importo</th>
                  </tr>
                  </thead>
                  <tbody>
                  {count.movements.map((movement, i) => (
                      <tr key={`movement-${movement.id}`}>

                          {
                              movement.movement_type === 'out' ?
                                  <React.Fragment>
                                      <MovementRowTable
                                          movement={movement}
                                      />
                                      <EmptyRowTable />
                                  </React.Fragment>
                                  :
                                  <React.Fragment>
                                      <EmptyRowTable />
                                      <MovementRowTable
                                          movement={movement}
                                      />
                                  </React.Fragment>
                          }
                      </tr>
                  ))}

                  <tr key="empty_row">
                      <EmptyRowTable /><EmptyRowTable />
                  </tr>

                  <tr key="total">
                      <td className="text-right b-solid" colSpan="3">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-red">
                          {parseAmount(count.out_amount)}
                      </td>
                      <td className="text-right b-solid" colSpan="3">
                          <b>TOTALE:</b>
                      </td>
                      <td className="text-center b-solid bg-green">
                          {parseAmount(count.in_amount)}
                      </td>
                  </tr>

                  <tr key="empty_row_2">
                      <FullEmptyRowTable />
                  </tr>
                  <tr key="empty_row_3">
                      <FullEmptyRowTable />
                  </tr>

                  <tr key="total_3">
                      <td className="text-right b-solid" colSpan="7">
                          DIFFERENZA ENTRATE / USCITE:
                      </td>
                      <td className={`text-center b-solid ${ count.in_amount < count.out_amount ? 'bg-red' : 'bg-green' }`}>
                          {parseAmount(count.in_out_amount)}
                      </td>
                  </tr>

                  <tr key="empty_row_4">
                      <FullEmptyRowTable />
                  </tr>
                  <tr key="empty_row_5">
                      <FullEmptyRowTable />
                  </tr>

                  {expensiveItems.map((expensiveItem, i) => (
                      <tr key={`movement-${expensiveItem.id}`}
                          style={{ background: expensiveItem.color }}>
                          <td className="text-right b-solid" colSpan="7">
                              <b>AMMONTARE { expensiveItem.description.toUpperCase() }:</b>
                          </td>
                          <td className="text-center b-solid">
                              { count.amounts_by_expensive_items[expensiveItem.id.toString()] && count.amounts_by_expensive_items[expensiveItem.id.toString()] > 0.0 ?
                                  parseAmount(count.amounts_by_expensive_items[expensiveItem.id.toString()])
                              :
                                ''
                              }
                          </td>
                      </tr>
                  ))}
                  </tbody>
              </table>

              <MovementModal
                  movement={movement}
                  setMovement={setMovement}
                  expensive_items={expensiveItems}
                  handleConfirm={handleCreateUpdateMovement}
                  handleChangeDocument={handleChangeDocument}
              />

              <ErrorModal
                  showErrorModal={showErrorModal}
                  setShowErrorModal={setShowErrorModal}
              />

              <ExpensiveItemModal
                  count_id={count.id}
                  showModal={showExpensiveItemModal}
                  setShowModal={setShowExpensiveItemModal}
                  colors={colors}
                  appendExpensiveItem={appendExpensiveItem}
              />

          </div>
      </div>
    )
}

export default IndexMovements;