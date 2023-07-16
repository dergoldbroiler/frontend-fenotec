import { useState, useEffect, use } from "react";
import { Overview } from "../components/Overview";
import {WindowcloseEvent} from '../components/WindowcloseEvent';
import {Singledataset} from '../components/Singledataset';
import { getAllJobs, getJob, updateJob } from "../services/datahandler";
import {toggleModal} from '../services/modalhandler';


const Monitor = () => {

    const [datastore, setDatastore] = useState();
    const [activeDatasetID, setActiveDatasetID] = useState();
    const [locked, setLocked] = useState(false);
    const [activeDataset, setActiveDataset] = useState();


    /* first fetch */
    useEffect(() => {
        if(datastore) return;
        
        getAllJobs().then(
                data => { 
                    setDatastore(data);
                    console.log('data',data[0]);
                   // setActiveDataset(data[0]);
                }
            )
    }, []);


    /* refetch every 10 seconds */
    useEffect(() => {
        const interval = setInterval(() => {
         
            getAllJobs().then(
                data => { 
                    setDatastore(data)
                }
            )

        }, 3000);
        return () => clearInterval(interval);
    }, []);


    const clickHandlerOverview = (e, id, index) => {
        setActiveDatasetID(id);
        setLocked(!locked);

        getJob(id).then(data => {
            toggleModal('modal_singledataset','show')
            setActiveDataset(Object.entries(data[0]));
            
        });
      
    }

    const handleJobUpdate = (e) => {    
        updateJob(32, 'kunde', 'trötzel').then(data => {
            console.log('updateJob',data);
        });
    }

    const handleUpdate = (id, key, value) => {    
        updateJob(id, key, value).then(data => {
            console.log('updateJob',data);
        });
    }

    const handeRefusedClick = () => {
        alert('Dieser Eintrag wird aktuell von einem anderen Benutzer bearbeitet.');
    }

    if(!datastore) return (<div>loading...</div>)

    return (
        <div>
            {/* unlocks datasets on window close */}
            <WindowcloseEvent /> 
            <Singledataset datasetID={activeDatasetID}  activeDataset={activeDataset} handleUpdate={handleUpdate}/>        
        
            <Overview datastore={datastore} clickHandlerOverview={clickHandlerOverview} clickHandlerRefuse={handeRefusedClick}/>
            

            <button className="btn btn-info" onClick={handleJobUpdate}>Testjob-Update</button>
        </div>
    )
}    


export default Monitor;