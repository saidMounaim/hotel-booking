import React, { useState, useEffect } from 'react'
import { RootStateOrAny, useDispatch, useSelector } from 'react-redux';
import  { useNavigate, useParams } from 'react-router-dom'; 
import Message from '../components/Message';
import Loader from '../components/Loader';
import { getRoomDetails } from '../redux/actions/RoomActions';
import { IRoom, TImage } from '../interfaces/IRoom';
import { Container, Row, Col, Form, FormGroup, Button, FloatingLabel, Image } from 'react-bootstrap';
import { updateRoom } from '../redux/actions/RoomActions';
import axios from 'axios';
import { UPDATE_ROOM_RESET } from '../redux/constants/RoomConstants';


type TId = {
  id: IRoom['_id']
}

const AdminEditRoomScreen = () => {

  const dispatch = useDispatch();

  let navigate = useNavigate();
  let { id } = useParams<TId>();

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
  const [oldImages, setOldImages] = useState<TImage[]>([]);
  const [newImages, setNewImages] = useState<any>(null);
  
  const { loading: loadingUpdate, success: successUpdate, error: errorUpdate } = useSelector((state: RootStateOrAny) => state.roomUpdate);
  
  const { room, loading, error } = useSelector((state: RootStateOrAny) => state.roomDetails);

  useEffect(() => {
    if(successUpdate) {
        dispatch(getRoomDetails(id as string));
        navigate("/admin/rooms");
        dispatch({ type: UPDATE_ROOM_RESET });
    }
    if(!room?.name || room._id !== id) {
      dispatch(getRoomDetails(id as string));
    } else {
      setName(room.name);
      setDescription(room.description);
      setAddress(room.address);
      setGuestCapacity(room.guestCapacity);
      setNumOfBeds(room.numOfBeds);
      setRoomType(room.roomType);
      setInternet(room.internet);
      setAirConditioned(room.petsAllowed);
      setBreakfast(room.breakfast);
      setPetsAllowed(room.petsAllowed);
      setRoomCleaning(room.roomCleaning);
      setPrice(room.pricePerNight);
      setOldImages(room.images);
    }
  }, [dispatch, room, successUpdate, id]);
  
  const removeImage = (imageId: string) => {
    const removedImage: any = oldImages.filter((e: TImage) => e._id !== imageId);
    setOldImages(removedImage);
  }

    const uploadImagesHandler = (e: React.FormEvent) => {
        
        const target = e.target as HTMLInputElement;

        if (!target.files?.length) {
            return;
        }

        const files = target.files;

        setNewImages(files);

    }

    const handlerSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        const formData = new FormData();

        for(let i = 0; i < newImages?.length; i++) {
            formData.append("image", newImages[i]);
        }

        try {
            
            const config = {
                headers: {
                    "Content-Type": "multipart/form-data"
                }
            }

            const { data } = await axios.post("/api/uploads", formData, config);

            const allImages: TImage[] = oldImages;
            for(let i = 0; i < data?.length; i++) {
                allImages.push({ image: `/${data[i].path.toString().replace("\\", "/")}` });
            }

            dispatch(updateRoom(id as string, { name, description, address, guestCapacity, numOfBeds, category: roomType, internet, airConditioned, breakfast, petsAllowed, roomCleaning, pricePerNight: price, images: allImages }));

        } catch (error: any) {
            console.log(error.message);
        }

    }

  return (
    <Container>
        <Row>
            <Col md={12}>
                <h3 className="mb-3">Edit Room</h3>
            </Col>
        </Row>
        <Row>
          <Col md={12}>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> :
              <>
                {errorUpdate && <Message variant="danger">{errorUpdate}</Message>}
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
                                  {[1,2,3,4,5].map((guest: number) =>
                                    <option value={guest} key={guest}>{guest}</option>
                                  )}
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
                                  {[1,2,3,4,5].map((numOfBeds: number) =>
                                    <option value={numOfBeds} key={numOfBeds}>{numOfBeds}</option>
                                  )}
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
                            required={oldImages.length === 0 ? true : false}
                        />
                    </FormGroup>
                    <div className="images-preview mb-4">
                        <Row>
                            {oldImages.map((image: TImage) =>
                                <Col md={3} key={image._id}>
                                    <Image src={image.image} alt="Image Room" fluid />
                                    <Button
                                        className="mt-2" 
                                        onClick={() => removeImage(image._id as string)}
                                    >
                                        Remove Image
                                    </Button>
                                </Col>
                            )}
                        </Row>
                    </div>
                    <FormGroup className="mb-4" >
                        <Button type="submit">
                            {loadingUpdate ? <Loader /> : `Update`}
                        </Button>
                    </FormGroup>
                </Form>
              </>
            }
          </Col>
        </Row>
    </Container>
  )
}

export default AdminEditRoomScreen