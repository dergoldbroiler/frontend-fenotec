import { getLocalLabels } from '../../services/datahandler';

export const Inputfilter = ({ onChange }) => {
    const labels = getLocalLabels();
    
    return (
        <div className="single-filter my-2">
        <div className="badge bg-secondary text-start">
            <h6>Stichwort:</h6> <>
        <input className="form-control form-control-md" type="text" placeholder="Stichwortfilter"></input><br />
        </>
        </div>
        
        
        </div>       
        
    )
}