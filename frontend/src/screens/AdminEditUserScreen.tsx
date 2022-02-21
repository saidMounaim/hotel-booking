import React, { useState, useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import { Container, Col, Row, Form, Button } from 'react-bootstrap'
import { useParams, useNavigate } from 'react-router-dom';
import { IUser } from '../interfaces/IUser';
import { detailsUser, updateUser } from '../redux/actions/UserActions';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { UPDATE_USER_RESET } from '../redux/constants/UserConstants';

type TId = {
    id: IUser['_id']
}

const AdminEditUserScreen = () => {

    const dispatch = useDispatch();
    let navigate = useNavigate();

    const { id } = useParams<TId>();
    const [name, setName] = useState<IUser['name']>("");
    const [email, setEmail] = useState<IUser['email']>("");
    const [isAdmin, setIsAdmin] = useState<IUser['isAdmin']>(false);

    const { user, loading, error } = useSelector((state: RootStateOrAny) => state.userDetails);

    const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = useSelector((state: RootStateOrAny) => state.userUpdate);

    useEffect(() => {
        if(!user || user._id !== id || successUpdate) {
            dispatch({ type: UPDATE_USER_RESET });
            dispatch(detailsUser(id as string));
        } else {
            setName(user.name);
            setEmail(user.email);
            setIsAdmin(user.isAdmin);
        }

        if(error) {
            navigate("/");
        }
    }, [dispatch, user, id, successUpdate])
    
    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        dispatch(updateUser(user._id as string, { name, email, isAdmin }));
    }

  return (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className='mb-3'>Update User</h3>
            </Col>
        </Row>
        <Row className="justify-content-center">
            <Col xs={12} md={6}>
                {loading && <Loader />}
                {!loading && user && (
                    <>
                        {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
                        <Form onSubmit={handlerSubmit}>
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
                            <Form.Group controlId="isAdmin">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Is Admin" 
                                    checked={isAdmin ? true : false}
                                    onChange={(e) => setIsAdmin(!isAdmin)}
                                />
                            </Form.Group>
                            <Form.Group className="mt-3">
                                <Button type="submit">
                                    {loadingUpdate ? <Loader /> : `Update`}
                                </Button>
                            </Form.Group>
                        </Form>
                    </>
                )}
            </Col>
        </Row>
    </Container>
  )
}

export default AdminEditUserScreen