import React from 'react';
import { ListGroup } from 'react-bootstrap';

type TRoomFeatures = {
    guestCapacity: Number,
    numOfBeds: Number,
    internet: boolean,
    airConditioned: boolean,
    petsAllowed: boolean,
    roomCleaning: boolean
}

type TRoomFeaturesProps = {
    room: TRoomFeatures
}

const RoomFeatures: React.FC<TRoomFeaturesProps> = ({ room }) => {
  return (
      <>
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
    </>
  );
};

export default RoomFeatures;
