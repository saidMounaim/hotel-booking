import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import { useSelector, useDispatch, RootStateOrAny } from 'react-redux';
import { getRoomDetails } from '../redux/actions/RoomActions';
import { IRoom } from '../interfaces/IRoom';
import Loader from '../components/Loader';
import { Container, Row, Col } from 'react-bootstrap';
import Message from '../components/Message';

type TId = {
    id: IRoom['_id']
}

const RoomDetailsScreen = () => {

    const { id } = useParams<TId>();

    const dispatch = useDispatch();

    const { loading, room, error } = useSelector((state: RootStateOrAny) => state.roomDetails);

    useEffect(() => {
        dispatch(getRoomDetails(id as string));
    }, [dispatch, id]);
    

  return (
      <Container>
        <Row>
            {loading ? <Loader /> : error ? <Message variant="danger">{error}</Message> : (
                <Col>
                    <h1 className="mb-2">{room.name}</h1>
                </Col>
            )}
        </Row>
      </Container>
  );
};

export default RoomDetailsScreen;
