import React, { useState, useEffect } from 'react';
import {  Container, Form, Row, Col, FormGroup, FloatingLabel, Button } from 'react-bootstrap';
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import axios from 'axios';
import { Navigate, useNavigate } from 'react-router-dom';
import { createRoom } from '../redux/actions/RoomActions';
import { IRoom } from '../interfaces/IRoom';
import Message from '../components/Message';

const AdminCreateRoomScreen = () => {

    let navigate = useNavigate();
    const dispatch = useDispatch();

    const [name, setName] = useState<IRoom['name']>("");
    const [description, setDescription] = useState<IRoom['description']>("");
    const [address, setAddress] = useState<IRoom['address']>("");
    const [guestCapacity, setGuestCapacity] = useState<IRoom['guestCapacity']>(0);
    const [numOfBeds, setNumOfBeds] = useState<IRoom['numOfBeds']>(0);
    const [roomType, setRoomType] = useState<IRoom['category'] | string>("King");
    const [internet, setInternet] = useState<IRoom['internet']>(false);
    const [airConditioned, setAirConditioned] = useState<IRoom['airConditioned']>(false);
    const [breakfast, setBreakfast] = useState<IRoom['breakfast']>(false);
    const [petsAllowed, setPetsAllowed] = useState<IRoom['petsAllowed']>(false);
    const [roomCleaning, setRoomCleaning] = useState<IRoom['roomCleaning']>(false);
    const [price, setPrice] = useState<IRoom['pricePerNight']>(0);
    const [imagesRoom, setImagesRoom] = useState<IRoom['images']>([{image: ""}]);

    const { success, error } = useSelector((state: RootStateOrAny) => state.roomCreate);

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();

        dispatch(createRoom({ name, description, address, guestCapacity, numOfBeds, category: roomType, internet, airConditioned, breakfast, petsAllowed, roomCleaning, pricePerNight: price, images: imagesRoom }));

    }

    useEffect(() => {
      if(success) {
        navigate("/");
      }
    }, [dispatch, success]);


    const uploadImagesHandler = async (e: React.FormEvent) => {
        
        const target = e.target as HTMLInputElement;

        if (!target.files?.length) {
            return;
        }

        const images = target.files;

        const formData = new FormData();

        for(let i = 0; i < images.length; i++) {
            formData.append("image", images[i]);
        }

        try {
            
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/uploads", formData, config);

            const allImages = [];
            for(let i = 0; i < data.length; i++) {
                allImages.push({ image: `/${data[i].path}` });
            }

            setImagesRoom(allImages);

        } catch (error: any) {
            console.log(error.message);
        }

    }

  return (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="mb-3">Create Room</h3>
            </Col>
        </Row>
        <Row>
            <Col md={12}>
                {error && (
                    <Message variant='danger'>
                        {error}
                    </Message>
                )}
                <Form onSubmit={handlerSubmit}>
                    <FormGroup controlId="name">
                        <Form.Label>
                            Name
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Name"
                            name="name"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <FormGroup className="mt-3 mb-3">
                        <FloatingLabel controlId="description" label="Description">
                            <Form.Control
                                as="textarea"
                                placeholder="Description"
                                name="description"
                                value={description}
                                onChange={(e) => setDescription(e.target.value)}
                                style={{ height: '100px' }}
                                required
                            />
                        </FloatingLabel>
                    </FormGroup>
                    <FormGroup controlId="address">
                        <Form.Label>
                            Address
                        </Form.Label>
                        <Form.Control 
                            type="text"
                            placeholder="Address"
                            name="address"
                            value={address}
                            onChange={(e) => setAddress(e.target.value)}
                            required
                        />
                    </FormGroup>
                    <Row className="mt-3 mb-3">
                        <Col md={4} sm={12}>
                            <FormGroup controlId="guestCapacity">
                                <Form.Label>
                                    Guest Capacity
                                </Form.Label>
                                <Form.Select 
                                    name="guestCapacity" 
                                    value={Number(guestCapacity)}
                                    onChange={(e) => setGuestCapacity(Number(e.target.value))}
                                    aria-label="Default select example"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                        <Col md={4} sm={12}>
                            <FormGroup controlId="numOfBeds">
                                <Form.Label>
                                    Num Of Beds
                                </Form.Label>
                                <Form.Select 
                                    name="numOfBeds"
                                    value={Number(numOfBeds)}
                                    onChange={(e) => setNumOfBeds(Number(e.target.value))}
                                    aria-label="Default select example"
                                >
                                    <option value="1">1</option>
                                    <option value="2">2</option>
                                    <option value="3">3</option>
                                    <option value="4">4</option>
                                    <option value="5">5</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                        <Col md={4} sm={12}>
                            <FormGroup controlId="roomType">
                                <Form.Label>Room Type</Form.Label>
                                <Form.Select 
                                    name="roomType"
                                    value={roomType}
                                    onChange={(e) => setRoomType(e.target.value)}
                                    aria-label="Default select example"
                                >
                                    <option value="King">King</option>
                                    <option value="Single">Single</option>
                                    <option value="Twins">Twins</option>
                                </Form.Select>
                            </FormGroup>
                        </Col>
                    </Row>
                    <Row className="mb-3">
                        <Col md={2} sm={12}>
                            <Form.Group controlId="internet">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Internet" 
                                    checked={internet ? true : false}
                                    onChange={(e) => setInternet(!internet)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="breakfast">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Breakfast" 
                                    checked={breakfast ? true : false}
                                    onChange={(e) => setBreakfast(!breakfast)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="airConditioned">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Air Conditioned" 
                                    checked={airConditioned ? true : false}
                                    onChange={(e) => setAirConditioned(!airConditioned)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="petsAllowed">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Pets Allowed" 
                                    checked={petsAllowed ? true : false}
                                    onChange={(e) => setPetsAllowed(!petsAllowed)}
                                />
                            </Form.Group>
                        </Col>
                        <Col md={2} sm={12}>
                            <Form.Group controlId="roomCleaning">
                                <Form.Check 
                                    type="checkbox" 
                                    label="Room Cleaning" 
                                    checked={roomCleaning ? true : false}
                                    onChange={(e) => setRoomCleaning(!roomCleaning)}
                                />
                            </Form.Group>
                        </Col>
                    </Row>
                    <FormGroup className="mb-3" controlId="price">
                        <Form.Label>
                            Price
                        </Form.Label>
                        <Form.Control 
                            type="number"
                            value={Number(price)}
                            onChange={(e) => setPrice(Number(e.target.value))}
                            placeholder="Price Per Night"
                            min="10" 
                            max="100"
                        />
                    </FormGroup>
                    <FormGroup className="mb-3" controlId="images">
                        <Form.Label>
                            Images
                        </Form.Label>
                        <Form.Control 
                            type="file"
                            name="images"
                            onChange={uploadImagesHandler}
                            multiple
                            required
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" >
                        <Button type="submit">
                            Create
                        </Button>
                    </FormGroup>
                </Form>
            </Col>
        </Row>
    </Container>  
  );
};

export default AdminCreateRoomScreen;
