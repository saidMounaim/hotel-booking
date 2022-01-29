import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { login } from '../redux/actions/UserActions';
import Message from '../components/Message';

interface IUser {
    email: string,
    password: string
}

const LoginScreen: React.FC = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [email, setEmail] = useState<IUser['email']>("");
    const [password, setPassword] = useState<IUser['password']>("");

    const { userInfo, error, success } = useSelector((state: RootStateOrAny) => state.userLogin);


    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
            dispatch(login({ email, password }));
    }

    useEffect(() => {
        if(success) {
            navigate("/");
        }
    }, [userInfo, success]);
    

  return (
      <Container>
        <Row className='justify-content-center'>
            <Col xs={12} md={6}>
                <h2 className="mb-4">Login</h2>
                {error && <Message variant="danger">{error}</Message>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="email" className="mb-3">
                        <Form.Label>E-Mail</Form.Label>
                        <Form.Control 
                            type="email" 
                            value={email} 
                            placeholder="E-Mail" 
                            onChange={(e) => setEmail(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="password" className="mb-3">
                        <Form.Label>Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={password} 
                            placeholder="Password" 
                            onChange={(e) => setPassword(e.target.value)}
                        >
                        </Form.Control>
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
