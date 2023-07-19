import { useEffect, useState } from "react"
import { getShipping } from "../../services/datahandler"


export const Shippingname = ({id}) => {

    const [shippingname, setShippingname] = useState();
    const [loaded, setLoaded] = useState(false);
    const [shippingid, setShippingid] = useState(id);

    useEffect(() => {
        if(loaded) return;
        setShippingid(id);
        getShipping(shippingid).then(data => {
            setLoaded(true);
    
            setShippingname(data);
        })
    },[shippingid,loaded]);

    return (<span>{shippingname}</span>)

}