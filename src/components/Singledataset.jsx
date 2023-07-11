'use client';
import React, {useState, useEffect, use} from 'react'
import {toggleModal} from '../services/modalhandler';
import { getJob } from '../services/datahandler';

export const Singledataset = ({datasetID,activeDataset}) => {

   
/*
   const [activeDataset, setActiveDataset] = useState();

   useEffect(() => {

    if(!datasetID) return;

    getJob(datasetID).then(data => {
        console.log('getJob',data[0]);
        setActiveDataset(Object.keys(data[0]));
        console.log('AS',activeDataset);
    });
    
   
   }, []);

*/

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
                                activeDataset &&
                                activeDataset.map((element, index) => {
                                   return (
                                   <tr key={index}>
                                    <td className="job_key">{element[0]}</td>
                                    <td className="job_value">{element[1]}</td>
                                    
                                   </tr>
                                   )
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
