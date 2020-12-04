import React, { useState, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

const Home = (props) => {
  const { setName, getLocation, user } = props;
  const [value, setValue] = useState('');
  const [error, setError] = useState('');

  useEffect(() => {
    getLocation();
  }, [getLocation]);

  useEffect(() => {
    setTimeout(() => setError(''), 2000);
  }, [error]);

  const handleChange = (e) => {
    setValue(e.target.value);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (value.length < 2) {
      return setError('이름은 두 글자 이상 되어야 합니다.');
    }
    if (value.length > 10) {
      return setError('이름은 열 글자 이하만 가능합니다.');
    }

    setName(value);
  };

  if (user) {
    return <Redirect to="/map" />;
  }

  return (
    <div className="container bg-basic">
      <div className="top">
        <h1 className="title">SUB_TALK</h1>
        <form className="container-form" onSubmit={handleSubmit}>
          <div>이름을 입력해주세요.</div>
          <input
            type="text"
            name="name"
            placeholder="NAME"
            autoComplete="off"
            value={value}
            onChange={handleChange}
          />
          <div className="error">{error}</div>
          <button className="button-enter">ENTER</button>
        </form>
      </div>
    </div>
  );
};

export default Home;
