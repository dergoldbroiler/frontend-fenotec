import { getLocalLabels } from '../../services/datahandler';

export const Customerfilter = ({ onChange }) => {
    const labels = getLocalLabels();
    return (
        <select onChange={e => onChange({kunde: e.target.value})}>
            { labels['kunde'].map((option, index) => {
            return (
                <option key={index} value={option.id}>{option.label}</option>
            )
            })
            }

        </select>        
    )
}