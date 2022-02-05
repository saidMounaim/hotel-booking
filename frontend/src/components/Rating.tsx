import React from 'react';

type TReview = {
    reviews?: Number
}

const Rating: React.FC<TReview> = ({ reviews }) => {
  return (
      <div className="rating mb-3">
        <i
          className={
            Number(reviews) >= 1
              ? `bi bi-star-fill`
              : Number(reviews) >= 0.5
              ? `bi bi-star-half`
              : `bi bi-star`
          }
        ></i>
        <i
          className={
            Number(reviews) >= 2
              ? `bi bi-star-fill`
              : Number(reviews) >= 1.5
              ? `bi bi-star-half`
              : `bi bi-star`
          }
        ></i>
        <i
          className={
            Number(reviews) >= 3
              ? `bi bi-star-fill`
              : Number(reviews) >= 2.5
              ? `bi bi-star-half`
              : `bi bi-star`
          }
        ></i>
        <i
          className={
            Number(reviews) >= 4
              ? `bi bi-star-fill`
              : Number(reviews) >= 3.5
              ? `bi bi-star-half`
              : `bi bi-star`
          }
        ></i>
        <i
          className={
            Number(reviews) >= 5
              ? `bi bi-star-fill`
              : Number(reviews) >= 4.5
              ? `bi bi-star-half`
              : `bi bi-star`
          }
        ></i>
        <span>({reviews} Reviews)</span>
      </div>
  );
};

export default Rating;
