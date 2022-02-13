import React from 'react';
import { Col, Form, FormGroup, Row } from 'react-bootstrap';

type SearchRoomsParams = {
    keyword: string,
    setKeyword: React.Dispatch<React.SetStateAction<string>>,
    numOfBeds: number | string,
    setNumOfBeds: React.Dispatch<React.SetStateAction<number | string>>,
    roomType: string,
    setRoomType: React.Dispatch<React.SetStateAction<string>>
}

const SearchRooms: React.FC<SearchRoomsParams> = 
({ keyword, setKeyword, numOfBeds, setNumOfBeds, roomType, setRoomType }) => {

  return (
    <Form className="mb-4">
        <Row>
            <Col md={4}>
                <FormGroup controlId="location">
                    <Form.Label>Search</Form.Label>
                    <Form.Control 
                        type="text"
                        name="keyword"
                        placeholder="Search"
                        value={keyword}
                        onChange={(e) => setKeyword(e.target.value)}
                    />
                </FormGroup>
            </Col>
            <Col md={4}>
                <FormGroup controlId="numOfBeds">
                    <Form.Label>Num of Beds</Form.Label>
                    <Form.Select 
                        name="numOfBeds" 
                        value={numOfBeds} 
                        onChange={(e) => setNumOfBeds(e.target.value)} 
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
            <Col md={4}>
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
    </Form>
  );
};

export default SearchRooms;
