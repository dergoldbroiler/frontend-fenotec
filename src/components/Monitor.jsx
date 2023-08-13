import { useState, useEffect, use } from "react";
import { Overview } from "../components/Overview";
import {WindowcloseEvent} from '../components/WindowcloseEvent';
import {Singledataset} from '../components/Singledataset';
import { Customerfilter } from "./Filter/Customer";
import { Tankformfilter } from "./Filter/Tankform";
import { Inputfilter } from "./Filter/Inputfilter";
import { buildFilter, getAllJobs, updateJob, getJobFull,filterData,filterByKey } from "../services/datahandler";
import {toggleModal} from '../services/modalhandler';



const Monitor = () => {

    const [datastore, setDatastore] = useState();
    const [activeDatasetID, setActiveDatasetID] = useState();
    const [locked, setLocked] = useState(false);
    const [activeDataset, setActiveDataset] = useState();
    const [currentFilter, setCurrentFilter] = useState([]);


    /* first fetch */
    useEffect(() => {
      //  if(datastore) return;
      
      getAllJobs().then(
        data => { 
            
            if(currentFilter.length > 0 ) {
                setDatastore(filterData(data, currentFilter));
            } else {
                setDatastore(data);
            }
            
        }
            )
    }, [currentFilter]);


    /* refetch every 10 seconds */
    useEffect(() => {
        const interval = setInterval(() => {
            filterByKey(datastore, 'bröcking')
            getAllJobs().then(
                data => { 
                    if(currentFilter.length > 0 ) {
                        setDatastore(filterData(data, currentFilter));
                    } else {
                        setDatastore(data);
                    }

            
                    
                }
            )

        }, 3000);
        return () => clearInterval(interval);
    }, [datastore]);


    const clickHandlerOverview = (e, id, index) => {
        setActiveDatasetID(id);
        setLocked(!locked);

        getJobFull(id).then(data => {
            toggleModal('modal_singledataset','show');
         //   setDatastore(data);
            setActiveDatasetID(id);
          // setActiveDataset(Object.entries(data[0]));
            
        });
      
    }


    const handleUpdate = (id, key, value) => {    
        updateJob(id, key, value).then(data => {
          //  console.log('updateJob',data);
        });
    }

    const handeRefusedClick = () => {
        alert('Dieser Eintrag wird aktuell von einem anderen Benutzer bearbeitet.');
    }



    const localFilter = (key, value) => {

        let new_datastore = datastore.filter((element) => {
            if(element[key] == value) {
                return element;
            }
        })

        let new_filter = buildFilter(currentFilter, key, value);
        setCurrentFilter(new_filter);
        setDatastore(new_datastore);
    }

    const localFilterByKeyword = (keyword) => {

        let new_datastore = filterByKey(datastore, keyword);

      //  let new_filter = buildFilter(currentFilter, key, value);
        //setCurrentFilter(new_filter);
        //setDatastore(new_datastore);
    }

    if(!datastore) return (<div>loading...</div>)

    return (
        <div>
            {/* unlocks datasets on window close */}
            <WindowcloseEvent /> 
            <Singledataset datastore={datastore} datasetID={activeDatasetID}  handleUpdate={handleUpdate}/>       
            <div className="d-flex flex-column flex-md-row justify-content-start gap-2 mb-3">
                <Customerfilter onChange={localFilter} />
                <Tankformfilter onChange={localFilter} />
                <Inputfilter onChange={localFilterByKeyword} />
            </div>
            <Overview datastore={datastore} clickHandlerOverview={clickHandlerOverview} clickHandlerRefuse={handeRefusedClick}/>
            

        
        </div>
    )
}    


export default Monitor;