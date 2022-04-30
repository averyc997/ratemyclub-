import React from "react";

import { useNavigate } from "react-router-dom";

const Error = () => {
  const history = useNavigate();
  return (
    <main className="fof">
      <h1>Error 404</h1>
      <p>
        Oops! Something went wrong! The page you are looking for does not
        currently exist.
      </p>
      <a onClick={() => history(`/`)} href="#" className="btn btn-primary">
        Return to Home
      </a>
    </main>
  );
};
export default Error;
