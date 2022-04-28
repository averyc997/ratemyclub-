import React from "react";

import { useNavigate } from 'react-router-dom';

const Error = () => {
  const history = useNavigate();
    return (
        <>
          <h1>Oops! Something went wrong!</h1>
          <a onClick={() => history(`/`)} href="#">Return to Home</a>
        </>
      );
}
export default Error;
