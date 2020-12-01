import React from 'react';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="container-not bg-basic">
      <div className="top">
        <h1>Page Not Found</h1>
        <p>해당 페이지를 찾을 수 없습니다.</p>
        <Link to="/">HOME</Link>
      </div>
    </div>
  );
};

export default NotFound;
