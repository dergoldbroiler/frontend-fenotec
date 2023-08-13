import { getLocalLabels } from '../../services/datahandler';

export const Tankformfilter = ({ onChange }) => {
    const labels = getLocalLabels();
    
    return (
        <div className="single-filter my-2">
        <div className="badge bg-info text-start">
            <h6>Tankform:</h6> <select onChange={e => onChange('tankform', e.target.value)} className="form-control form-select select-lg w-auto">
            { labels['tankform'].map((option, index) => {
            return (
                <option key={index} value={option.id}>{option.label}</option>
            )
            })
            }

        </select> <br /></div>
        
        
        </div>       
    )
}