import React from 'react';

type TReview = {
    reviews?: Number
}

const Rating: React.FC<TReview> = ({ reviews }) => {
  return (
      <div className="rating mb-3">
        {reviews === 0.5 ? 
            <i className="bi bi-star-half"></i> : 
            reviews === 1 ? 
            <i className="bi bi-star-fill"></i>
            : <i className="bi bi-star"></i>
        }
        {reviews === 1.5 ? 
            <i className="bi bi-star-half"></i> : 
            reviews === 2 ? 
            <i className="bi bi-star-fill"></i>
            : <i className="bi bi-star"></i>
        }
        {reviews === 2.5 ? 
            <i className="bi bi-star-half"></i> : 
            reviews === 3 ? 
            <i className="bi bi-star-fill"></i>
            : <i className="bi bi-star"></i>
        }
        {reviews === 3.5 ? 
            <i className="bi bi-star-half"></i> : 
            reviews === 4 ? 
            <i className="bi bi-star-fill"></i>
            : <i className="bi bi-star"></i>
        }
        {reviews === 4.5 ? 
            <i className="bi bi-star-half"></i> : 
            reviews === 5 ? 
            <i className="bi bi-star-fill"></i>
            : <i className="bi bi-star"></i>
        } 
        <span>({reviews} Reviews)</span>
      </div>
  );
};

export default Rating;
