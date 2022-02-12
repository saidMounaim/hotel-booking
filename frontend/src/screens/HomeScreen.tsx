import React from "react";
import { Container, Row, Col } from 'react-bootstrap';
import RoomCard from "../components/RoomCard";
import { useSelector, RootStateOrAny } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { IRoom } from '../interfaces/IRoom';
import SearchRooms from "../components/SearchRooms";

const HomeScreen = () => {

  const { loading, rooms, error } = useSelector((state: RootStateOrAny) => state.roomsFetch);
  
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">All Rooms</h2>
        </Col>
      </Row>
      <SearchRooms />
      <Row>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : rooms.length > 0 ?
          <>
            {rooms.map((room: IRoom) =>
              <Col key={room._id} md={3} sm={6} xs={12} >
                <RoomCard {...room} />
              </Col>
            )}
          </>
        : (
          <>
            <Message variant="info">No Room Available</Message>
          </>
        )}
      </Row>
    </Container>
  );
};

export default HomeScreen;
