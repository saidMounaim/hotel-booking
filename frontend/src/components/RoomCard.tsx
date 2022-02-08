import React from 'react';
import { Card, Button } from 'react-bootstrap';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { IRoom } from '../interfaces/IRoom';
import Rating from './Rating';

type IRoomCard = Pick<IRoom, '_id' | 'images' | 'name' | 'pricePerNight' | 'ratings'>;

const RoomCard: React.FC<IRoomCard> = (props: IRoomCard) => {

  const { _id, images, name, pricePerNight, ratings } = props;

  return (
    <Card className="card-room">
        <Card.Img variant="top" src={images[0].image} />
        <Card.Body>
            <Link to={`/room/${_id}`}>
              <Card.Title as="h4">{name}</Card.Title>
            </Link>
            <Card.Text as="h5" className="mt-2 mb-2" >${pricePerNight} / Per Night</Card.Text>
            <Rating reviews={ratings} />
            <LinkContainer to={`/room/${_id}`}>
              <Button className="w-100" variant="primary">View Details</Button>
            </LinkContainer>
        </Card.Body>
    </Card>
  );
};

export default RoomCard;
