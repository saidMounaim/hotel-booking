import React, { useEffect } from "react";
import { Container, Row, Col, Card } from 'react-bootstrap';
import RoomCard from "../components/RoomCard";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { fetchRooms } from '../redux/actions/RoomActions';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { IRoom } from '../interfaces/IRoom';
import SearchRooms from "../components/SearchRooms";

const HomeScreen = () => {

  const dispatch = useDispatch();

  const { loading, rooms, error } = useSelector((state: RootStateOrAny) => state.roomsFetch);

  useEffect(() => {
    dispatch(fetchRooms());
  }, [dispatch]);
  
  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">All Rooms</h2>
        </Col>
      </Row>
      <SearchRooms />
      <Row>
        {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
          <>
            {rooms.map((room: IRoom) =>
              <Col key={room._id} md={3} sm={6} xs={12} >
                <RoomCard {...room} />
              </Col>
            )}
          </>
        )}
      </Row>
    </Container>
  );
};

export default HomeScreen;
