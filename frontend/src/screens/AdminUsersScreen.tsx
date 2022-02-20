import React, { useState, useEffect } from 'react'
import { Container, Row, Col, Table, Button, Image } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import Message from '../components/Message';
import Loader from '../components/Loader';
import Paginate from '../components/Paginate';
import { deleteUser, fetchUsers } from '../redux/actions/UserActions';
import { IUser } from '../interfaces/IUser';

const AdminUsersScreen = () => {

    const [currentPage, setCurrentPage] = useState<number>(1);
    const dispatch = useDispatch();

    const { loading, users, count, error } = useSelector((state: RootStateOrAny) => state.usersFetch);

    const { loading: loadingDelete, success:successDelete, error: errorSuccess } = useSelector((state: RootStateOrAny) => state.userDelete);

    useEffect(() => {
        dispatch(fetchUsers(currentPage));
    }, [dispatch, currentPage, successDelete]);
    
    const handleDelete = (id: IUser['_id']) => {
        dispatch(deleteUser(id));
    }

  return (
    <Container>
        <Row>
            <Col>
                <h3 className='mb-3'>Users</h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>User ID</th>
                    <th>Avatar</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Is Admin</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    users?.map((user: IUser) =>
                        <tr key={user._id}>
                            <td>{user._id}</td>
                            <td>
                                <Image className="avatar" src={user.avatar ? user.avatar : `/uploads/user-default.jpg`} alt="Avatar" width="20" height="20" />
                            </td>
                            <td>{user.name}</td>
                            <td>{user.email}</td>
                            <td>{user.isAdmin ? `Yes` : `No`}</td>
                            <td>
                                <LinkContainer to={`/admin/users/${user._id}/edit`}>
                                    <Button>
                                        Edit
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" onClick={() => handleDelete(user._id)}>
                                    Delete
                                </Button>
                            </td>
                        </tr>
                    )
                )}
                </tbody>
            </Table>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            {count !== 0 && (
                <Paginate
                    currentPage={currentPage}
                    setCurrentPage={setCurrentPage}
                    totalPosts={count}
                    postPerPage={4}
                />
            )}
            </Col>
        </Row>
    </Container>
    )
}

export default AdminUsersScreen