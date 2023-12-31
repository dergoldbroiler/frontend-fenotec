import { getLocalLabels } from '../../services/datahandler';

export const Customerfilter = ({ onChange }) => {
    const labels = getLocalLabels();
    
    return (
        <div className="single-filter my-2">
        <div className="badge bg-primary text-start">
            <h6>Kunde:</h6> <select onChange={e => onChange('kunde', e.target.value)} className="form-control form-select select-lg w-auto">
            { labels['kunde'].map((option, index) => {
            return (
                <option key={index} value={option.id}>{option.label}</option>
            )
            })
            }

        </select> <br /></div>
        
        
        </div>       
    )
}