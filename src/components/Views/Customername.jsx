import { useEffect, useState } from "react"
import { getCustomer } from "../../services/datahandler"


export const Customername = ({id}) => {

    const [customername, setCustomername] = useState();
    const [loaded, setLoaded] = useState(false);
    const [customerid, setCustomerid] = useState(id);

    useEffect(() => {
        if(loaded) return;
        setCustomerid(id);
        getCustomer(customerid).then(data => {
            setLoaded(true);
    
            setCustomername(data);
        })
    },[customerid,loaded]);

    return (<span>{customername}</span>)

}