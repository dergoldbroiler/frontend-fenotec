import { useState } from "react"

export const Toggle = ({active, onChange}) => {

    
    if(active) {
        return (
            <button type="button" className="btn btn-success active" data-bs-toggle="button" autoComplete="off" onClick={e => { onChange(e, false);}} aria-pressed={active}>auf unerledigt setzen</button>
        )
    }
    return (
        <button type="button" className="btn btn-danger" data-bs-toggle="button" autoComplete="off" onClick={e => { onChange(e, true);}} aria-pressed={active}>auf erledigt setzen</button>
    )
}