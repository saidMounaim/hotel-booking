import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { LinkContainer } from 'react-router-bootstrap';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from '../components/Paginate';
import { IRoom } from '../interfaces/IRoom';
import { fetchRooms, deleteRoom } from '../redux/actions/RoomActions';

type AdminRoom = Pick<IRoom, "_id" | "name" | "address" | "category" | "pricePerNight">

const AdminRoomsScreen = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, rooms, count, error } = useSelector((state: RootStateOrAny) => state.roomsFetch);

  const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector((state: RootStateOrAny) => state.roomDelete);

    const handleDelete = (id: IRoom['_id']) => {
        dispatch(deleteRoom(id));
    }

  useEffect(() => {
    dispatch(fetchRooms("", "", "", currentPage));
  }, [dispatch, currentPage, successDelete]);

  return (
    <Container>
        <div className="mb-4 d-flex align-items-center justify-content-between">
            <h3>Rooms</h3>
            <LinkContainer to="/admin/rooms/create">
                <Button>
                    Create Room
                </Button>
            </LinkContainer>
        </div>
        <Row>
            <Col md={12}>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Adresse</th>
                    <th>Category</th>
                    <th>Price</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    rooms.map((room: AdminRoom) =>
                        <tr key={room._id}>
                            <td>{room._id}</td>
                            <td>{room.name}</td>
                            <td>{room.address}</td>
                            <td>{room.category}</td>
                            <td>${room.pricePerNight}</td>
                            <td>
                                <LinkContainer to={`/admin/rooms/${room._id}/edit`}>
                                    <Button>
                                        Edit
                                    </Button>
                                </LinkContainer>
                                <Button variant="danger" onClick={() => handleDelete(room._id)}>
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
  );
};

export default AdminRoomsScreen;
