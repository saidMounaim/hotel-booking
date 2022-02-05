import React from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import RoomCard from "../components/RoomCard";

const HomeScreen = () => {
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">All Rooms</h2>
        </Col>
      </Row>
      <Row>
        <Col md={3} sm={6} xs={12} >
          <RoomCard />
        </Col>
      </Row>
    </Container>
  );
};

export default HomeScreen;
