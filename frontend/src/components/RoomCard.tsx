import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IRoom } from '../interfaces/IRoom';

type IRoomCard = Pick<IRoom, 'images' | 'name' | 'pricePerNight'>;

const RoomCard: React.FC<IRoomCard> = (props: IRoomCard) => {

  const { images, name, pricePerNight } = props;

  return (
    <Card className="card-room">
        <Card.Img variant="top" src={images[0].image} />
        <Card.Body>
            <Card.Title as="h4">{name}</Card.Title>
            <Card.Text as="h5" className="mt-3 mb-3" >${pricePerNight} / Per Night</Card.Text>
            <Button className="w-100" variant="primary">View Details</Button>
        </Card.Body>
    </Card>
  );
};

export default RoomCard;
