import React, { useState, useEffect } from 'react';
import { Container, Row, Col, Table, Button } from 'react-bootstrap';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import Paginate from '../components/Paginate';
import { IBooking } from '../interfaces/IBooking';
import moment from 'moment';
import { getAllBookings, deleteBooking } from '../redux/actions/BookingActions';

const AdminBookingsScreen = () => {

  const dispatch = useDispatch();

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, bookings, count, error } = useSelector((state: RootStateOrAny) => state.bookingsFetch);

  const { loading: loadingDelete, success: successDelete, error: errorDelete } = useSelector((state: RootStateOrAny) => state.bookingDelete);

    const handleDelete = (id: IBooking['_id']) => {
        dispatch(deleteBooking(id));
    }

  useEffect(() => {
    dispatch(getAllBookings(currentPage));
  }, [dispatch, currentPage, successDelete]);

  return (
    <Container>
        <Row>
            <Col>
                <h3 className='mb-3'>Bookings</h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
            <Table striped bordered hover size="sm">
                <thead>
                <tr>
                    <th>Booking ID</th>
                    <th>Room</th>
                    <th>Check In </th>
                    <th>Check Out</th>
                    <th>Amount</th>
                    <th>By</th>
                    <th>Actions</th>
                </tr>
                </thead>
                <tbody>
                {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                    bookings?.map((booking: any) =>
                        <tr key={booking._id}>
                            <td>{booking._id}</td>
                            <td>{booking.room.name}</td>
                            <td>{moment(booking.checkInDate as Date).format("LL")}</td>
                            <td>{moment(booking.checkOutDate as Date).format("LL")}</td>
                            <td>${booking.amountPaid}</td>
                            <td>{booking.user?.name}</td>
                            <td>
                                <Button variant="danger" onClick={() => handleDelete(booking._id)}>
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

export default AdminBookingsScreen;
