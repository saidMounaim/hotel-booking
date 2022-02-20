import React, { useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Loader from '../components/Loader';
import Message from '../components/Message';
import { getMyBookings } from '../redux/actions/BookingActions';
import moment from 'moment';
import { Link } from 'react-router-dom';

const MyBookingsScreen = () => {

  const dispatch = useDispatch();

  const { myBookings, loading, error } = useSelector((state: RootStateOrAny) => state.BookingsMy);

  useEffect(() => {
    dispatch(getMyBookings());
  }, [dispatch]);
  

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">My Bookings</h2>
        </Col>
      </Row>
      <Row>
        <Col>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Room</th>
                <th>Check In </th>
                <th>Check Out</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              {myBookings?.map((book: any) =>
                <tr key={book._id}>
                  <td>{book._id}</td>
                  <td>
                    <Link to={`/room/${book.room._id}`}>
                      {book.room.name}
                    </Link>
                  </td>
                  <td>{moment(book.checkInDate as Date).format("LL")}</td>
                  <td>{moment(book.checkOutDate as Date).format("LL")}</td>
                  <td>${book.amountPaid}</td>
                </tr>
              )}
            </tbody>
          </Table>
          )}
        </Col>
      </Row>
    </Container>
  )
};

export default MyBookingsScreen;
