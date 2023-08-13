export const Toggle = ({state}) => {
    let className = 'badge bg-danger';
    state == true && (className = 'badge bg-success');
    return(
        <div className={className}>&nbsp;&nbsp;</div>
    );

}