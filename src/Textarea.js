import Form from 'react-bootstrap/Form';


function textArea() {
  return (
    <Form>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Manifest YAML</Form.Label>
        <Form.Control as="textarea" rows={10} col={2} />
      </Form.Group>
    </Form>
  );
}

export default textArea






