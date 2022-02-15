import React, { useState } from 'react';
import {  Container, Form, Row, Col, FormGroup, FloatingLabel, Button } from 'react-bootstrap';
import axios from 'axios';

type TRoomData = {
    name: string,
    description: string,
    address: string,
    guestCapacity: number,
    numOfBeds: number,
    roomType: string,
    internet: boolean,
    airConditioned: boolean,
    breakfast: boolean,
    petsAllowed: boolean,
    roomCleaning: boolean,
    price: number,
    imagesRoom: {}[]
}

const AdminCreateRoomScreen = () => {

    const [name, setName] = useState<TRoomData['name']>("");
    const [description, setDescription] = useState<TRoomData['description']>("");
    const [address, setAddress] = useState<TRoomData['address']>("");
    const [guestCapacity, setGuestCapacity] = useState<TRoomData['guestCapacity']>(0);
    const [numOfBeds, setNumOfBeds] = useState<TRoomData['numOfBeds']>(0);
    const [roomType, setRoomType] = useState<TRoomData['roomType']>("King");
    const [internet, setInternet] = useState<TRoomData['internet']>(false);
    const [airConditioned, setAirConditioned] = useState<TRoomData['airConditioned']>(false);
    const [breakfast, setBreakfast] = useState<TRoomData['breakfast']>(false);
    const [petsAllowed, setPetsAllowed] = useState<TRoomData['petsAllowed']>(false);
    const [roomCleaning, setRoomCleaning] = useState<TRoomData['roomCleaning']>(false);
    const [price, setPrice] = useState<TRoomData['price']>(0);
    const [imagesRoom, setImagesRoom] = useState<TRoomData['imagesRoom']>([{}]);

    const handlerSubmit = (e: React.FormEvent) => {
        e.preventDefault();
    }

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
                allImages.push({ image: data[i].path });
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
                                    value={guestCapacity}
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
                                    value={numOfBeds}
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
                        />
                    </FormGroup>
                    <FormGroup className="mb-4" >
                        <Button>
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
