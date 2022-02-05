import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { getRoomDetails } from '../redux/actions/RoomActions';
import { IRoom } from '../interfaces/IRoom';
import Loader from '../components/Loader';
import { Container, Row, Col, Carousel, ListGroup, Card } from 'react-bootstrap';
import Message from '../components/Message';
import Rating from '../components/Rating';

type TId = {
    id: IRoom['_id']
}

type TBookingRoom = {
    checkInDate: Date,
    checkOutDate: Date,
    daysOfStay: Number
}

const RoomDetailsScreen = () => {

    const [checkInDate, setCheckInDate] = useState<TBookingRoom['checkInDate']>();
    const [checkOutDate, setCheckOutDate] = useState<TBookingRoom['checkOutDate']>();
    const [daysOfStay, setDaysOfStay] = useState<TBookingRoom['daysOfStay']>();
    const { id } = useParams<TId>();

    const dispatch = useDispatch();

    const { loading, room, error } = useSelector((state: RootStateOrAny) => state.roomDetails);

    useEffect(() => {
        dispatch(getRoomDetails(id as string));
    }, [dispatch, id]);

    const onChange = (dates: any) => {
        const [checkInDate, checkOutDate] = dates;
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);
    }
    

  return (
      <Container className="pb-4">
        <Row>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Col>
                    <h1 className="mb-2">{room.name}</h1>
                    <span className="d-block mb-2">{room.address}</span>
                    <Rating reviews={room.ratings} />
                    <div className="carousel-room mt-3 mb-3">
                        <Carousel>
                            {room.images?.map((img: any) =>
                                <Carousel.Item key={img._id}>
                                    <img
                                        className="d-block w-100"
                                        src={img.image}
                                        alt={img._id}
                                    />
                                </Carousel.Item>
                            )}
                        </Carousel>
                    </div>
                    <Row>
                        <Col xs={12} sm={12} md={7}>
                            <h3>Description</h3>
                            <p>
                                {room.description}
                            </p>
                            <h4 className="mt-3 mb-4">Features:</h4>
                            <ListGroup variant="flush">
                                <ListGroup.Item>
                                    <i className="bi bi-people-fill"></i>
                                    {room.guestCapacity} Guests
                                </ListGroup.Item>
                                <ListGroup.Item>{room.numOfBeds} Beds</ListGroup.Item>
                                <ListGroup.Item>
                                    {room.internet ? 
                                        <i className="bi bi-check"></i> : 
                                        <i className="bi bi-x"></i>
                                    }
                                    Internet
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {room.airConditioned ? 
                                        <i className="bi bi-check"></i> : 
                                        <i className="bi bi-x"></i>
                                    }
                                    Air Conditioned
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {room.petsAllowed ? 
                                        <i className="bi bi-check"></i> : 
                                        <i className="bi bi-x"></i>
                                    }
                                    Pets Allowed
                                </ListGroup.Item>
                                <ListGroup.Item>
                                    {room.roomCleaning ? 
                                        <i className="bi bi-check"></i> : 
                                        <i className="bi bi-x"></i>
                                    }
                                    Room Cleaning
                                </ListGroup.Item>
                            </ListGroup>

                            <h4 className="mt-3 mb-4">Reviews</h4>

                            <ListGroup>
                                {room.reviews?.map((r: any) =>
                                    <ListGroup.Item>
                                        <h4>{r.name}</h4>
                                        <Rating reviews={r.rating} />
                                        <p>
                                            {r.comment}
                                        </p>
                                    </ListGroup.Item>
                                )}
                            </ListGroup>
                        </Col>
                        <Col xs={12} sm={12} md={5}>
                            <Card className="shadow p-3 mb-5 bg-body rounded">
                                <Card.Body>
                                    <Card.Title>${room.pricePerNight} / Per Night</Card.Title>
                                    <hr />
                                    <p className="mb-3">Pick Check In & Check Out Date</p>
                                    <DatePicker
                                        dateFormat="DD-MM-YYYY"
                                        className='w-100'
                                        selected={checkInDate}
                                        onChange={onChange}
                                        startDate={checkInDate}
                                        endDate={checkOutDate}
                                        minDate={new Date()}
                                        selectsRange
                                        inline
                                    />                                
                                </Card.Body>
                            </Card>
                        </Col>
                    </Row>
                </Col>
            )}
        </Row>
      </Container>
  );
};

export default RoomDetailsScreen;
