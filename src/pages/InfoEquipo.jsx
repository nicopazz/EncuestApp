import React from "react";
import { Container, Row } from "react-bootstrap";
import InfoEquipo1 from "../components/infoEquipo/InfoEquipo1";


const InfoEquipo = () => {
  return (
    <Container>
      <Row>
        <InfoEquipo1/>
      </Row>
    </Container>
  );
};

export default InfoEquipo;