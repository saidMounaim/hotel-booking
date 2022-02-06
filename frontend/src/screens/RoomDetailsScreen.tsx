import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { getRoomDetails } from '../redux/actions/RoomActions';
import { IRoom } from '../interfaces/IRoom';
import Loader from '../components/Loader';
import { Container, Row, Col, Carousel, ListGroup, Card, Form, FormGroup, Button, FloatingLabel } from 'react-bootstrap';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { createRoomReview } from '../redux/actions/RoomActions';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { Link } from 'react-router-dom';
import { checkRoomBooking } from '../redux/actions/BookingActions';

type TId = {
    id: IRoom['_id']
}

type TBookingRoom = {
    checkInDate: Date,
    checkOutDate: Date,
    daysOfStay: Number
}

const RoomDetailsScreen = () => {

    const [comment, setComment] = useState<string>("");
    const [rating, setRating] = useState<Number>(0);
    const [hover, setHover] = useState<Number>(0);
    const [checkInDate, setCheckInDate] = useState<TBookingRoom['checkInDate']>();
    const [checkOutDate, setCheckOutDate] = useState<TBookingRoom['checkOutDate']>();
    const [daysOfStay, setDaysOfStay] = useState<TBookingRoom['daysOfStay']>(0);
    const { id } = useParams<TId>();

    const { loggedIn } = useAuthStatus();

    const dispatch = useDispatch();

    const { loading, room, error } = useSelector((state: RootStateOrAny) => state.roomDetails);

    const { loading: loadingCreateReview, success: successCreateReview, error: errorCreateReview } = 
    useSelector((state: RootStateOrAny) => state.roomCreateReview);

    const { loading: loadingRoomIsAvailable, success: successRoomIsAvailable, error: errorRoomIsAvailable }
    = useSelector((state: RootStateOrAny) => state.roomBookingCheck);

    useEffect(() => {
        dispatch(getRoomDetails(id as string));
    }, [dispatch, id]);

    const onChange = (dates: any) => {
        const [checkInDate, checkOutDate] = dates;
        setCheckInDate(checkInDate);
        setCheckOutDate(checkOutDate);

        if (checkInDate && checkOutDate) {

            // Calclate days of stay

            const days = Math.abs(checkInDate - checkOutDate) / (1000 * 60 * 60 * 24);

            setDaysOfStay(days);

            dispatch(checkRoomBooking(id as string, checkInDate.toISOString(), checkOutDate.toISOString()));

        }

    }
    

    const handleReview = (e: React.FormEvent) => {
        e.preventDefault();

        if(comment !== "") {
            dispatch(createRoomReview(id as string, { rating, comment }));
            setComment("");
            setRating(0);
        }

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

                            {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                            {successCreateReview && <Message variant="success">Added Review</Message>}
                            
                            {loggedIn ? (
                            <Form onSubmit={handleReview}>
                                <FormGroup className="field-rating">
                                    {[...Array(5)].map((star, index) => {
                                        index += 1;
                                        return (
                                        <button
                                            type="button"
                                            key={index}
                                            className={index <= (hover || rating) ? "bi bi-star-fill" : "bi bi-star"}
                                            onClick={() => setRating(index)}
                                            onMouseEnter={() => setHover(index)}
                                            onMouseLeave={() => setHover(rating)}
                                        >
                                        </button>
                                        );
                                    })}
                                </FormGroup>
                                <FormGroup className="mt-3 mb-3">
                                    <FloatingLabel controlId="floatingTextarea2" label="Comments">
                                        <Form.Control
                                        as="textarea"
                                        placeholder="Leave a comment here"
                                        name="comment"
                                        value={comment}
                                        onChange={(e) => setComment(e.target.value)}
                                        style={{ height: '100px' }}
                                        />
                                    </FloatingLabel>
                                </FormGroup>
                                <FormGroup>
                                    <Button type="submit">
                                        Add Review
                                    </Button>
                                </FormGroup>
                            </Form>
                            ) : (
                                <Message variant="info">
                                    <Link to="/login">Sign in</Link> to write a review
                                </Message>
                            )}
                            <hr />
                            {loadingCreateReview && <Loader />}
                            <ListGroup variant="flush">
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
                                    {loadingRoomIsAvailable && <Loader />}
                                    {successRoomIsAvailable && <Message variant="success">Room Is Available And Days Of Stay is {daysOfStay}</Message>}                               
                                    {errorRoomIsAvailable && <Message variant="danger">{errorRoomIsAvailable}</Message>}
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
