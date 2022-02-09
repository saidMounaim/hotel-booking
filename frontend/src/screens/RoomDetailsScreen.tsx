import React, { useState, useEffect } from 'react';
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { getRoomDetails } from '../redux/actions/RoomActions';
import { IRoom } from '../interfaces/IRoom';
import Loader from '../components/Loader';
import { Container, Row, Col, Carousel, Button, Card } from 'react-bootstrap';
import FormReview from '../components/FormReview';
import Message from '../components/Message';
import Rating from '../components/Rating';
import { checkRoomBooking } from '../redux/actions/BookingActions';
import ListReviews from '../components/ListReviews';
import RoomFeatures from '../components/RoomFeatures';
import { useAuthStatus } from '../hooks/useAuthStatus';
import { Link } from 'react-router-dom';
import { CHECK_ROOM_BOOKING_RESET, CREATE_BOOKING_RESET } from '../redux/constants/BookingConstants';
import axios from 'axios';
import { PayPalButton } from "react-paypal-button-v2";
import { createBooking } from '../redux/actions/BookingActions';



type TId = {
    id: IRoom['_id']
}

type TBookingRoom = {
    checkInDate: Date,
    checkOutDate: Date,
    daysOfStay: Number
}

declare global {
    interface Window {
        paypal:any;
    }
}

const RoomDetailsScreen = () => {

    const { loggedIn } = useAuthStatus();

    const [checkInDate, setCheckInDate] = useState<TBookingRoom['checkInDate']>();
    const [checkOutDate, setCheckOutDate] = useState<TBookingRoom['checkOutDate']>();
    const [daysOfStay, setDaysOfStay] = useState<TBookingRoom['daysOfStay']>(0);

    const [sdkReady, setSdkReady] = useState<Boolean>(false);

    const { id } = useParams<TId>();

    const dispatch = useDispatch();

    const { loading, room, error } = useSelector((state: RootStateOrAny) => state.roomDetails);

    const { loading: loadingCreateReview, success: successCreateReview, error: errorCreateReview } = 
    useSelector((state: RootStateOrAny) => state.roomCreateReview);

    const { loading: loadingRoomIsAvailable, success: successRoomIsAvailable, error: errorRoomIsAvailable }
    = useSelector((state: RootStateOrAny) => state.roomBookingCheck);

    const { loading: loadingBookingCreate, success: successBookingCreate, error: errorBookingCreate } 
    = useSelector((state: RootStateOrAny) => state.bookingCreate);

    useEffect(() => {

        const addPaypalScript = async () => {
            const { data: clientId } = await axios.get("/api/config/paypal");
            const script = document.createElement("script");
            script.type = "text/javascript";
            script.src = `https://www.paypal.com/sdk/js?client-id=${clientId}`;
            script.async = true;
            script.onload = () => {
                setSdkReady(true);
            };
            document.body.appendChild(script);
        };

        if (!window.paypal && !successBookingCreate) {
            addPaypalScript();
        } else {
            setSdkReady(true);
        }

        dispatch(getRoomDetails(id as string));
        dispatch({ type: CHECK_ROOM_BOOKING_RESET });
        dispatch({ type: CREATE_BOOKING_RESET });
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

    
    const successPaymentHandler = (paymentResult: any) => {
            
        const amountPaid = Number(room.pricePerNight) * Number(daysOfStay);

        const paymentInfo = {
            id: paymentResult.id,
            status: paymentResult.status,
            update_time: paymentResult.update_time,
            email_address: paymentResult.payer.email_address,
        }

        const bookingData = {
            room: id,
            checkInDate: checkInDate?.toISOString(), 
            checkOutDate: checkOutDate?.toISOString(), 
            amountPaid, 
            paymentInfo,
            daysOfStay,
        }

        dispatch(createBooking(bookingData));
        dispatch({ type: CHECK_ROOM_BOOKING_RESET });
        dispatch({ type: CREATE_BOOKING_RESET });

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
                        <Col xs={12} sm={12} md={8}>
                            <h3>Description</h3>
                            <p>
                                {room.description}
                            </p>

                            <RoomFeatures room={room} />

                            <h4 className="mt-3 mb-4">Reviews</h4>

                            {errorCreateReview && <Message variant="danger">{errorCreateReview}</Message>}
                            {successCreateReview && <Message variant="success">Added Review</Message>}
                            
                            <FormReview idRoom={room._id} />
                            
                            <hr />
                            {loadingCreateReview && <Loader />}

                            <ListReviews roomReviews={room.reviews} />

                        </Col>
                        <Col xs={12} sm={12} md={4}>
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
                                    {successRoomIsAvailable && <Message variant="success">Room Is Available</Message>}                               
                                    {errorRoomIsAvailable && <Message variant="danger">{errorRoomIsAvailable}</Message>}

                                    {loggedIn && successRoomIsAvailable && ( 
                                        <Button size="lg" variant="primary" className="mb-3">
                                            Pay ${Number(room.pricePerNight) * Number(daysOfStay)}
                                        </Button>
                                     )}

                                     {!sdkReady && <Loader />}

                                     {loggedIn && successRoomIsAvailable && sdkReady && !successBookingCreate && (
                                        <PayPalButton
                                            amount={Number(room.pricePerNight) * Number(daysOfStay)}
                                            onSuccess={successPaymentHandler}
                                        />
                                     )}

                                     {!loggedIn && !successRoomIsAvailable && (
                                        <Message variant="info">
                                            Please <Link to="/login">Sign In</Link> for booking
                                        </Message>
                                     )}
                                
                                     {successBookingCreate && (
                                        <Message variant="success">
                                            Your booking has been paymented
                                        </Message>
                                     )}

                                     {errorBookingCreate && (
                                        <Message variant="success">
                                            {errorBookingCreate}
                                        </Message>
                                     )}

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
