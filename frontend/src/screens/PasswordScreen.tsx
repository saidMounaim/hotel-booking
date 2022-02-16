import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';
import { updatePassword } from '../redux/actions/UserActions';
import Message from '../components/Message';
import Loader from '../components/Loader';
import { IUpdatePassword } from '../interfaces/IUser';

const PasswordScreen: React.FC = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const [oldPassword, setOldPassword] = useState<IUpdatePassword['oldPassword']>("");
    const [newPassword, setNewPassword] = useState<IUpdatePassword['newPassword']>("");
    const [confirmPassword, setConfirmPassword] = useState<IUpdatePassword['confirmPassword']>("");
    const [errConfirmPassword, setErrConfirmPassowrd] = useState<IUpdatePassword['errConfirmPassword']>("");

    const { success, loading, error } = useSelector((state: RootStateOrAny) => state.passwordUpdate);

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if(newPassword === confirmPassword) {
            dispatch(updatePassword({ oldPassword, newPassword }));
            setErrConfirmPassowrd("");
        } else {
            setErrConfirmPassowrd("New Password must match confirm password")
        }
    }

    useEffect(() => {
        if(success) {
            navigate("/account/password");
            setOldPassword("");
            setNewPassword("");
            setConfirmPassword("");
        }
    }, [success, dispatch]);
    

  return (
      <Container>
        <Row className='justify-content-center'>
            <Col xs={12} md={6}>
                <h2 className="mb-4">Update Password</h2>
                {error && <Message variant="danger">{error}</Message>}
                {errConfirmPassword && <Message variant="danger">{errConfirmPassword}</Message>}
                {success && <Message variant="primary">Password Updated</Message>}
                <Form onSubmit={handleSubmit}>
                    <Form.Group controlId="oldPassword" className="mb-3">
                        <Form.Label>Old Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={oldPassword} 
                            placeholder="Old Password" 
                            onChange={(e) => setOldPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="newPassword" className="mb-3">
                        <Form.Label>New Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={newPassword} 
                            placeholder="New Password" 
                            onChange={(e) => setNewPassword(e.target.value)}
                        >
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="confirmPassword" className="mb-3">
                        <Form.Label>Confirm Password</Form.Label>
                        <Form.Control 
                            type="password" 
                            value={confirmPassword} 
                            placeholder="Confirm Password" 
                            onChange={(e) => setConfirmPassword(e.target.value)}
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

export default PasswordScreen;
