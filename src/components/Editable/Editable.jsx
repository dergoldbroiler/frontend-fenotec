import { useState, useEffect } from "react"
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Textinput } from "./Textinput"
import { Textarea } from "./Textarea";
import { Toggle } from './Toggle';
import { Select } from "./Select";
import { getLocalLabels } from '../../services/datahandler';

export const Editable = ({ type, datasetID, inital_value, element_key, handleUpdate, extraconf }) => {

    const [value, setValue] = useState(inital_value);
    const [isDate, setIsDate] = useState(false); //one state for alle 3 datefields, quick and dirty
    const [startDate, setStartDate] = useState(new Date());

    const labels = getLocalLabels();

    useEffect(() => {
       
        if(element_key === 'einbau' || element_key === 'versand' || element_key === 'bestellung_vom') {
    
            if(inital_value){
            console.log('Value ',typeof inital_value+' ' +inital_value);
                  
            setStartDate(new Date());
            setIsDate(true);
         }
        }
       
    },[isDate, value]);
    const toTimestamp = (strDate) => {
        const dt = new Date(strDate).getTime();
        return dt / 1000;
    }

    const onTextinputChange = (e) => {  
        handleUpdate(datasetID, element_key, e.target.value);
        setValue(e.target.value);
    }

    const onBooleanChange = (e, val) => {  
        let val_num =val === true ? 1 : 0;
        setValue(val_num);
        handleUpdate(datasetID, element_key, val_num);
    }

    const onDateChange = (date) => {  
        handleUpdate(datasetID, element_key, date.toDateString());
        setStartDate(date);

    }

    if(inital_value === true || inital_value === false) return ( <Toggle active={value} onChange={onBooleanChange}/> )

  
    switch (type) {
        case 'text':
            return <Textinput tabIndex="1" value={value} onChange={onTextinputChange} onBlur={onTextinputChange}/>
            break;
        case 'textarea':
            return <Textarea onChange={onTextinputChange} onBlur={onTextinputChange} value={value} />
            break;    
        case 'select':
            return <Select onChange={onTextinputChange} onBlur={onTextinputChange} value={value} endpoint={extraconf.endpoint} labels={labels[element_key]} />    
        case 'date':
                 return <DayPicker
            mode="single"
            selected={startDate}
            onSelect={(date) => onDateChange(date)}
          />
            break;    
    }

}