import { getLocalLabels } from '../../services/datahandler';

export const Elementname = ({id, type}) => {

    const labels = getLocalLabels(type);
    const singleLabel = labels[type].find(label => label.id === id[0]);

    return(
        <span>{singleLabel.label.substr(0,6)}..</span>
    );

}