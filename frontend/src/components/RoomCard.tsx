import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';

const RoomCard: React.FC = () => {
  return (
    <Card className="card-room">
        <Card.Img variant="top" src="" />
        <Card.Body>
            <Card.Title as="h4">Card Title</Card.Title>
            <Card.Text as="h5" className="mt-3 mb-3" >$200 / Per Night</Card.Text>
            <Button className="w-100" variant="primary">View Details</Button>
        </Card.Body>
    </Card>
  );
};

export default RoomCard;
