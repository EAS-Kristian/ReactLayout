import './App.css';
import React, { useState, useEffect, createContext } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './components/Navbar'
import navBar from './components/Navbar';
import './components/Input_box'
import onChange from './components/Textarea';
import './Manifest'
import headerStyled from './Manifest';

export const manifestContext = React.createContext('HELLO');

function ResponsiveAutoExample() {

  return (
    <>
      <Container fluid>
        <Col>
        <Row>{navBar()}</Row>
        </Col>
        <Row>
          <Col>
            <Container>
              {headerStyled()}
            </Container>
          </Col>
         
          <Col xs={6} sm={4}>
            <Row>MANIFEST YAML</Row>
            {onChange()} 
            </Col>
        </Row>
      </Container>



    </>
  );
}
//Accordion within Accordions
export default ResponsiveAutoExample;