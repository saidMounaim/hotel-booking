import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { IRoom } from '../interfaces/IRoom';
import Rating from './Rating';

type IRoomCard = Pick<IRoom, 'images' | 'name' | 'pricePerNight' | 'numOfReviews'>;

const RoomCard: React.FC<IRoomCard> = (props: IRoomCard) => {

  const { images, name, pricePerNight, numOfReviews } = props;

  return (
    <Card className="card-room">
        <Card.Img variant="top" src={images[0].image} />
        <Card.Body>
            <Card.Title as="h4">{name}</Card.Title>
            <Card.Text as="h5" className="mt-2 mb-2" >${pricePerNight} / Per Night</Card.Text>
            <Rating reviews={numOfReviews} />
            <Button className="w-100" variant="primary">View Details</Button>
        </Card.Body>
    </Card>
  );
};

export default RoomCard;
