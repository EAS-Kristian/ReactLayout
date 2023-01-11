import Button from 'react-bootstrap/Button';

function deleteButton(){
    return(
        <Button class="btn btn-outline-danger" onClick="event.stopPropagation()">X</Button>
    )
}
export default deleteButton