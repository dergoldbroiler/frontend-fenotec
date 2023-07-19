import React, {useState, useEffect, use} from 'react'
import {toggleModal} from '../services/modalhandler';
import { Editable } from './Editable/Editable';

export const Singledataset = ({datastore, datasetID,activeDataset, handleUpdate}) => {




    return (
        <div className="modal fade" id="modal_singledataset" aria-hidden="true" aria-labelledby="exampleModalToggleLabel">
            <div className="modal-dialog modal-dialog-centered modal-fullscreen">
                <div className="modal-content">
                    <div className="modal-header pe-5">
                    <h1 className="modal-title fs-5" id="exampleModalToggleLabel">{datasetID}</h1>
                    <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close" onClick={() => toggleModal('modal_singledataset','hide',datasetID)}></button>
                    </div>
                    <div className="modal-body">
                        <table className="table table-light table-striped table-secondary">
                            <tbody>
                        
                       
                        {
                            datastore &&
                            datastore.map((element, index) => {
                                if(element.id === datasetID ){
                                   
                                   return Object.entries(element).map((single, index) => {
                                      
                                        return (
                                        <tr key={index}>
                                         <td className="job_key">{single[0]}</td>
                                         <td className="job_value">
                                             {
                                             single[0] === 'einbau' || single[0] === 'versand' || single[0] === 'bestellung_vom'  ? 
                                                 <Editable type="date" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} /> 
                                             :
                                                 <Editable type="text" datasetID={datasetID} element_key={single[0]} inital_value={single[1]} handleUpdate={handleUpdate} />
                                             }   
                                         </td>
                                        </tr>
                                        )
                                     })
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
