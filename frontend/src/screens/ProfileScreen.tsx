import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updateProfile } from '../redux/actions/UserActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { IUser } from '../interfaces/IUser';

const ProfileScreen: React.FC = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [name, setName] = useState<IUser['name']>("");
    const [email, setEmail] = useState<IUser['email']>("");
    const [avatar, setAvatar] = useState<IUser['avatar']>("");

    const { userInfo } = useSelector((state: RootStateOrAny) => state.userLogin);

    const { success, loading, error } = useSelector((state: RootStateOrAny) => state.profileUpdate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateProfile({ name, email, avatar }));
    }

    useEffect(() => {

        if(userInfo) {
            setName(userInfo.name);
            setEmail(userInfo.email);
            setAvatar(userInfo.avatar);
        }
      
    }, [userInfo, dispatch]);
    

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

            setAvatar(data);

        } catch (error: any) {
            console.log(error.message);
        }

    }

  return (
      <Container>
        <Row className='justify-content-center'>
            <Col xs={12} md={6}>
                <h2 className="mb-4">Update Profile</h2>
                {error && <Message variant="danger">{error}</Message>}
                {success && <Message variant="primary">Profile Updated</Message>}
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
                            {loading ? <Loader /> : `Update`}
                        </Button>
                    </Form.Group>
                </Form>
            </Col>
        </Row>
    </Container>
  );
};

export default ProfileScreen;
