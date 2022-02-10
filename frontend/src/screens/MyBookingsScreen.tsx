import React, { useEffect } from 'react';
import { Container, Row, Col, Table } from 'react-bootstrap';

const MyBookingsScreen = () => {

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">My Bookings</h2>
        </Col>
      </Row>
      <Row>
        <Col>
          <Table striped bordered hover size="sm">
            <thead>
              <tr>
                <th>Booking ID</th>
                <th>Check In </th>
                <th>Check Out</th>
                <th>Amount</th>
              </tr>
            </thead>
            <tbody>
              <tr>
              </tr>
            </tbody>
          </Table>
        </Col>
      </Row>
    </Container>
  )
};

export default MyBookingsScreen;
