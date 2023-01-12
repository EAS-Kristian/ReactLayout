import Button from 'react-bootstrap/Button';

function deleteButton(){
    return(
        <Button variant="outline-danger" className="deletebutton" onClick="event.stopPropagation()">X</Button>
    )
}
export default deleteButton