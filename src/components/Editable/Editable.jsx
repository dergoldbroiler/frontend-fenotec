import { useState, useEffect } from "react"
import DatePicker from "react-datepicker";
import { format } from 'date-fns';
import { DayPicker } from 'react-day-picker';
import 'react-day-picker/dist/style.css';
import "react-datepicker/dist/react-datepicker.css";
import { Textinput } from "./Textinput"

export const Editable = ({ type, datasetID, inital_value, element_key, handleUpdate }) => {

    const [value, setValue] = useState(inital_value);
    const [isDate, setIsDate] = useState(false); //one state for alle 3 datefields, quick and dirty
    const [startDate, setStartDate] = useState(new Date());

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
        handleUpdate(e, datasetID, element_key, e.target.value);
        setValue(e.target.value);
    }

    const onDateChange = (date) => {  
        handleUpdate(datasetID, element_key, date.toDateString());
        setStartDate(date);

    }
  
    switch (type) {
        case 'text':
            return <Textinput tabIndex="1" value={value} onChange={onTextinputChange} onBlur={onTextinputChange}/>
            break;
        case 'date':
            //return <DatePicker selected={startDate} onChange={(date) => onDateChange(date)} />
            return <DayPicker
            mode="single"
            selected={startDate}
            onSelect={(date) => onDateChange(date)}
          />
            break;    
    }

}