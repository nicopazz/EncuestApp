import React from 'react'
import { Col } from 'react-bootstrap'
import Card from 'react-bootstrap/Card';
import { Link } from 'react-router-dom';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHandPointRight } from '@fortawesome/free-solid-svg-icons';
import { container, containerText } from "./Errors.module.css"


const Errors = () => {
  return (
    <Col>
        <Card className="bg-dark text-white" id={container}>
            <Card.Img src="https://www.maketecheasier.com/assets/uploads/2017/09/404-Error-Page-Cover.jpg" alt="Card image" />
            <Card.ImgOverlay>
            <Card.Text className={containerText}>
                <h1>Upss!!</h1><br/>
                La página que estas solicitando <br/>no está en el servidor.
            </Card.Text>
            <Card.Text className={containerText}>
                Prueba estos Links:
                
            </Card.Text >
            <Card.Text>
                <Link to='/' className='fw-bold text-black'> <FontAwesomeIcon icon={faHandPointRight} />Ir al inicio</Link>
            </Card.Text>
            <Card.Text>
                <Link to='/login' className='fw-bold text-black'><FontAwesomeIcon icon={faHandPointRight} />Acceso</Link>
            </Card.Text>
            </Card.ImgOverlay>
        </Card>
    </Col>
  );
}

export default Errors