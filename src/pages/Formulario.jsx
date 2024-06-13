import React from 'react'
import { Container,Row } from 'react-bootstrap'
import FormEncuesta from '../components/formulario/FormEncuesta'


const Formulario = () => {
  return (
    <Container>
      <Row>
        <FormEncuesta/>
      </Row>
    </Container>
  )
}

export default Formulario