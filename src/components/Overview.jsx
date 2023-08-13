import React, {useState, useEffect} from 'react'
import { Customername } from './Views/Customername';
import {Shippingname} from './Views/Shippingname';
import { Elementname } from './Views/Elementname';
import { Toggle } from './Views/Toggle';
export const Overview = ({datastore, clickHandlerOverview, clickHandlerRefuse}) => {
    

    if(!datastore) return (<div>loading...</div>)

    return (
        <div className="table-responsive">
         <table className="table table-striped " id="monitor">
            <thead className="table-dark">
                <tr>
                <th scope="col"><span className="th_title">Ausgang</span></th>
                <th scope="col"><span className="th_title">Prio</span></th>
                <th scope="col"><span className="th_title">Versandart</span></th>
                <th scope="col"><span className="th_title">Einbau</span></th>
                <th scope="col"><span className="th_title">Kunde</span></th>
                <th scope="col"><span className="th_title">Bereich</span></th>
                <th scope="col"><span className="th_title">Kunststoff</span></th>
                <th scope="col"><span className="th_title">Volumen</span></th>
                
                <th scope="col" className=""><span className="th_title">Hüllennr</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Angelegt</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Zuschnitt</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Gefahren</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Zugemacht</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">lackiert</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">geprüft</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Nähen</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Verpackt</span></th>
                <th scope="col" className="small smallAtLoad"><span className="th_title">Versand</span></th>
                </tr>
            </thead>
        <tbody>

        { datastore.map((element, index) => {
         
            if( element.locked === true ) {
                return(
                    <tr key={element.id} className="red-border red" onClick={clickHandlerRefuse}>
                        <td>{element.versand.substr(0,5)}</td>
                        <td>{element.tagesprio}</td>
                        <td><Shippingname id={element.versandart} /></td>
                        <td>{element.einbau.substr(0,5)}</td>
                        <td><Customername id={element.kunde} /></td>
                        <td><Elementname id={element.tankform} type="tankform" /></td>
                        <td><Elementname id={element.kunststoff} type="kunststoff" /></td>
                        <td>{element.volumen}</td>

                        <td className=''>{element.huellennummer}</td>
                        <td className='small'><Toggle state={element.angelegt} /></td>
                        <td className='small'><Toggle state={element.zuschnitt} /></td>
                        <td className='small'><Toggle state={element.huelle_gefahren} /></td>
                        <td className='small'><Toggle state={element.huelle_zumachen} /></td>
                        <td className='small'><Toggle state={element.lackiert} /></td>
                        <td className='small'><Toggle state={element.huelle_pruefen} /></td>
                        <td className='small'><Toggle state={element.vlies_vernaeht} /></td>
                        <td className='small'><Toggle state={element.vlies_gepackt} /></td>
                        <td className='small'><Toggle state={element.versendet} /></td>
                    </tr>
                )
            } else {
                return(
                    <tr key={element.id} className="clicktr"  onClick={e => clickHandlerOverview(e,element.id, index)}>
                        <td>{element.versand.substr(0,5)}</td>
                        <td>{element.tagesprio}</td>                        
                        <td><Shippingname id={element.versandart} /></td>
                        <td>{element.einbau.substr(0,5)}</td>
                        <td><Customername id={element.kunde} /></td>
                        <td><Elementname id={element.tankform} type="tankform" /></td>
                        <td><Elementname id={element.kunststoff} type="kunststoff" /></td>
                        <td>{element.volumen}</td>

                        <td className=''>{element.huellennummer}</td>
                        <td className='small'><Toggle state={element.angelegt} /></td>
                        <td className='small'><Toggle state={element.zuschnitt} /></td>
                        <td className='small'><Toggle state={element.huelle_gefahren} /></td>
                        <td className='small'><Toggle state={element.huelle_zumachen} /></td>
                        <td className='small'><Toggle state={element.lackiert} /></td>
                        <td className='small'><Toggle state={element.huelle_pruefen} /></td>
                        <td className='small'><Toggle state={element.vlies_vernaeht} /></td>
                        <td className='small'><Toggle state={element.vlies_gepackt} /></td>
                        <td className='small'><Toggle state={element.versendet} /></td>
                    </tr>
                )
            }

            
        }
        )}
               
        </tbody>
</table></div>
    )

}
