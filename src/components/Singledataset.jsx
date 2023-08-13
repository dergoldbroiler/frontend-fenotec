
import {toggleModal} from '../services/modalhandler';
import { Editable } from './Editable/Editable';



export const Singledataset = ({datastore, datasetID, handleUpdate}) => {

    

    const Edit = (Obj) => {

        let map = Obj.map((single, index) => {
              
            
   
            let editable;
            if(single[0] === 'einbau' || single[0] === 'versand' || single[0] === 'bestellung_vom'){
                editable = <Editable type="date" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} /> 
            }
            else if (single[0] === 'notizen') {
                editable = <Editable type="textarea" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} />
            }
            else if(single[0] === 'versandart' || single[0] === 'kunde') {
                let endpoint;
                single[0] === 'versandart' ? endpoint = 'versand' : endpoint = 'kunde';
                editable = <Editable type="select" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} extraconf={{endpoint: endpoint}}/>
            }
            else {
                editable = <Editable type="text" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} />
            }

            return (
            <tr key={index}>
             <td className="job_key">{single[0]}</td>
             <td className="job_value">
                 {
                 editable
                    
                 }   
             </td>
            </tr>
            )
         })

         return map;
    }



    return (
        <div className="modal fade" id="modal_singledataset" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header ">
                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">{datasetID}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => toggleModal('modal_singledataset','hide',datasetID)}></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-light table-striped table-secondary w-100">
                            <tbody>
                        
                       
                        { 
                            datastore &&
                            datastore.map((element, index) => {
                                if(element.id === datasetID ){
                                   return Edit(Object.entries(element));
                                 
                                }
                            })
                            
                        }                           
                        </tbody>
                        </table>
                    </div>
                    <div className="modal-footer">
                   
                    </div>
                </div>
            </div>
        </div>

        
    )

}
