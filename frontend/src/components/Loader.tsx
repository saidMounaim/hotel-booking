import React from 'react';
import { Spinner } from 'react-bootstrap';

const Loader = () => {
  return (
    <Spinner className="justify-content-center" animation="border" role="status">
        <span className="visually-hidden">Loading...</span>
    </Spinner>
  );
};

export default Loader;
