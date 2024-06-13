import React from 'react'
import { Container,Row, Form,Col } from 'react-bootstrap'



const FormEncuesta = () => {
  return (
    <Container className='col-6 py-5'>
      <Row>
        <Form>
        <Row>
        <Form.Label column lg={2}>
          Titulo:
        </Form.Label>
        <Col>
          <Form.Control type="text"  />
        </Col>
      </Row>
      <Form.Group className="mb-3" controlId="exampleForm.ControlTextarea1">
        <Form.Label>Descripcion:</Form.Label>
        <Form.Control as="textarea" rows={3} />
      </Form.Group>
      <Form.Select aria-label="Default select example">
      <option>Seleccione categoria</option>
      <option value="1">Viajes</option>
      <option value="2">Gastronomía</option>
      <option value="3">Deportes</option>
      <option value="4">Tecnologia</option>
    </Form.Select>
        </Form>
      </Row>
    </Container>
  )
}

export default FormEncuesta