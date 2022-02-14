import React from 'react';
import {  Container, Form, Row, Col, FormGroup, FloatingLabel, Button } from 'react-bootstrap';

const AdminCreateRoomScreen = () => {
  return (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="mb-3">Create Room</h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                <Form>
                    <FormGroup controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Name"
                        />
                    </FormGroup>
                    <FormGroup className="mt-3 mb-3">
                        <FloatingLabel controlId="description" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Leave a comment here"
                                name="comment"
                                style={{ height: '100px' }}
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup controlId="address">
                        <Form.Label>
                            Address
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Address"
                        />
                    </FormGroup>
                    <Row className="mt-3 mb-3">
                        <Col md={4} sm={12}>
                            <FormGroup controlId="guestCapacity">
                                <Form.Label>
                                    Guest Capacity
                                </Form.Label>
                                <Form.Select 
                                    name="guestCapacity" 
                                    aria-label="Default select example"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                        <Col md={4} sm={12}>
                            <FormGroup controlId="numOfBeds">
                                <Form.Label>
                                    Num Of Beds
                                </Form.Label>
                                <Form.Select 
                                    name="numOfBeds" 
                                    aria-label="Default select example"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                        <Col md={4} sm={12}>
                            <FormGroup controlId="roomType">
                                <Form.Label>Room Type</Form.Label>
                                <Form.Select 
                                    name="roomType"
                                    aria-label="Default select example"
                                >
                                    <option value="King">King</option>
                                    <option value="Single">Single</option>
                                    <option value="Twins">Twins</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2} sm={12}>
                            <Form.Group controlId="internet">
                                <Form.Check type="checkbox" label="Internet" />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="breakfast">
                                <Form.Check type="checkbox" label="Breakfast" />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="airConditioned">
                                <Form.Check type="checkbox" label="Air Conditioned" />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="petsAllowed">
                                <Form.Check type="checkbox" label="Pets Allowed" />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="roomCleaning">
                                <Form.Check type="checkbox" label="Room Cleaning" />
                            </Form.Group>
                        </Col>
                    </Row>
                    <FormGroup className="mb-3" controlId="price">
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control 
                            type="number"
                            placeholder="Price Per Night"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="images">
                        <Form.Label>
                            Images
                        </Form.Label>
                        <Form.Control 
                            type="file"
                            multiple
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" >
                        <Button>
                            Create
                        </Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    </Container>  
  );
};

export default AdminCreateRoomScreen;
