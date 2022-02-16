import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { register } from '../redux/actions/UserActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { IUser } from '../interfaces/IUser';

const RegisterScreen: React.FC = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [name, setName] = useState<IUser['name']>("");
    const [email, setEmail] = useState<IUser['email']>("");
    const [password, setPassword] = useState<IUser['password']>("");
    const [avatar, setAvatar] = useState<IUser['avatar']>("");

    const { loading, success, error } = useSelector((state: RootStateOrAny) => state.userRegister);
    const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(register({ name, email, password, avatar }));
    }

    const handleUpload = async (e: React.ChangeEvent) => {

        const target = e.target as HTMLInputElement;

        if (!target.files?.length) {
            return;
        }

        const file = target.files[0];

        const formData = new FormData();

        formData.append("image", file);

        try {
            
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/uploads", formData, config);

            setAvatar(data[0].path);

        } catch (error: any) {
            console.log(error.message);
        }

    }

    useEffect(() => {
        if(userInfo) {
            navigate("/");
        }
    }, [dispatch, userInfo, success]);
    

  return (
      <Container>
        <Row className='justify-content-center'>
            <Col xs={12} md={6}>
                <h2 className="mb-4">Login</h2>
                {error && <Message variant="danger">{error}</Message>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="name" className="mb-3">
                        <Form.Label>Full Name</Form.Label>
                        <Form.Control 
                            type="text" 
                            value={name} 
                            placeholder="Full Name" 
                            onChange={(e) => setName(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
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
                    <Form.Group controlId="avatar" className="mb-3">
                        <Form.Label>Avatar</Form.Label>
                        <Form.Control 
                            type="file" 
                            placeholder="Avatar"
                            name="image"
                            onChange={handleUpload}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group>
                        <Button variant="primary" type="submit">
                            {loading ? <Loader /> : `Register`}
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
  );
};

export default RegisterScreen;
