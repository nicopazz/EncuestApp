import React from 'react'
import { Col } from 'react-bootstrap'
import {container, shape, image, containerCards} from "./infoEquipo.module.css";
import {integrantes} from './integrantes.js'

const InfoEquipo1 = () => {
  return (
    <Col className='d-flex gap-3' id={containerCards}>
        {integrantes.map((integrante, i) => (
            <div key={i} className={container}>
                <div className={shape}>
                    <img className={image} src={integrante.img} alt={integrante.nombre} />
                </div>
                <h3>{integrante.nombre}</h3>
            </div>
        ))}
    </Col>
  )
}

export default InfoEquipo1