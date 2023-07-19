import { useState, useEffect, use } from "react";
import { Overview } from "../components/Overview";
import {WindowcloseEvent} from '../components/WindowcloseEvent';
import {Singledataset} from '../components/Singledataset';
import { getAllJobs, getJob, updateJob } from "../services/datahandler";
import {toggleModal} from '../services/modalhandler';
import { da } from "date-fns/locale";


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
                  //  setActiveDataset(Object.entries(data[0]));
              
                }
            )
    }, [datastore]);


    /* refetch every 10 seconds */
    useEffect(() => {
        if(datastore){
         console.log('datastore',datastore);
        }
        const interval = setInterval(() => {
         
            getAllJobs().then(
                data => { 
                    setDatastore(data)
                }
            )

        }, 3000);
        return () => clearInterval(interval);
    }, [datastore]);


    const clickHandlerOverview = (e, id, index) => {
        setActiveDatasetID(id);
        setLocked(!locked);
        console.log('clickHandlerOverview',activeDataset);
        getJob(id).then(data => {
            toggleModal('modal_singledataset','show');
            setDatastore(data);
            setActiveDatasetID(id);
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
            <Singledataset datastore={datastore} datasetID={activeDatasetID}  handleUpdate={handleUpdate}/>        
        
            <Overview datastore={datastore} clickHandlerOverview={clickHandlerOverview} clickHandlerRefuse={handeRefusedClick}/>
            

        
        </div>
    )
}    


export default Monitor;