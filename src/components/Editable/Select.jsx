
export const Select = ({ value, onChange, labels }) => {
   

    return (
        <select onChange={onChange}>
            { labels.map((option, index) => {
            return (
                <option key={index} value={option.id}>{option.label}</option>
            )
            })
            }

        </select>        
    )

}