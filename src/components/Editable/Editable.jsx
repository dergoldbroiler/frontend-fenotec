import { useState } from "react"

import { Textinput } from "./Textinput"

export const Editable = ({ type, inital_value }) => {

    const [value, setValue] = useState(inital_value);

    const onTextinputChange = (e) => {
        setValue(e.target.value);
    }
  
    switch (type) {
        case 'text':
            return <Textinput value={value} onChange={onTextinputChange} />
            break;
    }

}