import React from 'react';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

const LoginScreen = () => {
  return (
      <Container>
        <Row className='justify-content-center'>
            <Col xs={12} md={6}>
                <h2 className="mb-4">Login</h2>
                <Form>
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control type="email" placeholder="E-Mail" ></Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control type="password" placeholder="Password" ></Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            Login
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
  );
};

export default LoginScreen;
