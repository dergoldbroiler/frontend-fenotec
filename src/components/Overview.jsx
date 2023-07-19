import React, {useState, useEffect} from 'react'
import { Customername } from './Views/Customername';
import {Shippingname} from './Views/Shippingname';
export const Overview = ({datastore, clickHandlerOverview, clickHandlerRefuse}) => {
    

    if(!datastore) return (<div>loading...</div>)

    return (
        <>
         <table className="table" id="monitor">
            <thead className="table-dark">
                <tr>
                <th scope="col">Tagesprio</th>
                <th scope="col">Ausgang</th>
                <th scope="col">Versandart</th>
                <th scope="col">Einbau</th>
                <th scope="col">Kunde</th>
                <th scope="col">Tankform</th>
                <th scope="col">Kunststoff</th>
                <th scope="col">Volumen</th>
                </tr>
            </thead>
        <tbody>

        { datastore.map((element, index) => {
         
            if( element.locked === true ) {
                return(
                    <tr key={element.id} className="red-border red" onClick={clickHandlerRefuse}>
                        <td>{element.tagesprio}</td>
                        <td>{element.versand}</td>
                        <td><Shippingname id={element.versandart} /> ({element.versandart})</td>
                        <td>{element.einbau}</td>
                        <td><Customername id={element.kunde} /> ({element.kunde})</td>
                        <td>{element.tankform}</td>
                        <td>{element.kunststoff}</td>
                        <td>{element.volumen}</td>
                    </tr>
                )
            } else {
                return(
                    <tr key={element.id} className="clicktr"  onClick={e => clickHandlerOverview(e,element.id, index)}>
                        <td>{element.tagesprio}</td>
                        <td>{element.versand}</td>
                        <td><Shippingname id={element.versandart} /> ({element.versandart})</td>
                        <td>{element.einbau}</td>
                        <td><Customername id={element.kunde} /> ({element.kunde})</td>
                        <td>{element.tankform}</td>
                        <td>{element.kunststoff}</td>
                        <td>{element.volumen}</td>
                    </tr>
                )
            }

            
        }
        )}
               
        </tbody>
</table></>
    )

}
