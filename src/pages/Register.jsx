import React from "react";
import { Container, Row } from "react-bootstrap";
import { FormRegister } from "../components/register/FormRegister";

export const Register = () => {
  return (
    <Container>
      <Row>
        <FormRegister />
      </Row>
    </Container>
  );
};
