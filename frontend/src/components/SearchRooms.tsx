import React from 'react';
import { Col, Container, Form, FormGroup, Row } from 'react-bootstrap';

const SearchRooms = () => {
  return (
    <Form className="mb-4">
        <Row>
            <Col md={4}>
                <FormGroup controlId="location">
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                        type="text"
                        placeholder="Search"
                    />
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup controlId="numOfBeds">
                    <Form.Label>Num of Beds</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5</option>
                    </Form.Select>
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup controlId="roomType">
                    <Form.Label>Room Type</Form.Label>
                    <Form.Select aria-label="Default select example">
                        <option value="king">King</option>
                        <option value="single">Single</option>
                        <option value="twins">Twins</option>
                    </Form.Select>
                </FormGroup>
            </Col>
        </Row>
    </Form>
  );
};

export default SearchRooms;
