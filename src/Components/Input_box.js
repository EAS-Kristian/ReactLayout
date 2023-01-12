import Card from 'react-bootstrap/Card';


function input() {
    return (
        
        <form>
            <Card>
            <div class="form-group" className="formgroup">
                <label for="exampleInputName1">Name</label>
                <input type="name" class="form-control" id="exampleInputName1" aria-describedby="value" placeholder="Enter value"></input>
            </div>
            <div class="form-group" className="formgroup">
                <label for="exampleInputNumber1">Number</label>
                <input type="number" class="form-control" id="exampleInputNumber1" placeholder="0"></input>
            </div>
            </Card>
        </form>
    )
}
export default input