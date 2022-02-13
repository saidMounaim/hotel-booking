import React, { useState, useEffect } from "react";
import { Container, Row, Col } from 'react-bootstrap';
import RoomCard from "../components/RoomCard";
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import Loader from "../components/Loader";
import Message from "../components/Message";
import { IRoom } from '../interfaces/IRoom';
import SearchRooms from "../components/SearchRooms";
import { fetchRooms } from '../redux/actions/RoomActions';
import Paginate from "../components/Paginate";


const HomeScreen = () => {

  const dispatch = useDispatch();

  const [keyword, setKeyword] = useState<string>("");
  const [numOfBeds, setNumOfBeds] = useState<number | string>("");
  const [roomType, setRoomType] = useState<string>("");

  const [currentPage, setCurrentPage] = useState<number>(1);
  const { loading, rooms, count, error } = useSelector((state: RootStateOrAny) => state.roomsFetch);

  useEffect(() => {
    dispatch(fetchRooms(keyword, numOfBeds, roomType, currentPage));
  }, [dispatch, keyword, numOfBeds, roomType, currentPage]);

  return (
    <Container>
      <Row>
        <Col>
          <h2 className="mb-4">All Rooms</h2>
        </Col>
      </Row>
      <SearchRooms 
        keyword={keyword} 
        setKeyword={setKeyword}
        numOfBeds={numOfBeds}
        setNumOfBeds={setNumOfBeds}
        roomType={roomType}
        setRoomType={setRoomType}
      />
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

export default HomeScreen;
