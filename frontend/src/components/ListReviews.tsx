import React from 'react';
import { ListGroup } from 'react-bootstrap';
import Rating from './Rating';

type TListReviews = {
    roomReviews: []
}

const ListReviews: React.FC<TListReviews> = ({ roomReviews }) => {
  return (
    <ListGroup variant="flush">
        {roomReviews?.map((r: any) =>
            <ListGroup.Item key={r._id}>
                <h4>{r.name}</h4>
                <Rating reviews={r.rating} />
                <p>
                    {r.comment}
                </p>
            </ListGroup.Item>
        )}
    </ListGroup>
  );
};

export default ListReviews;
