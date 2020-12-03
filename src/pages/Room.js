import React, { useEffect, useState, useRef } from 'react';
import socketClient from '../config/socket';

import TrainInfo from '../components/TrainInfo';
import OutModal from '../components/OutModal';
import GeoStatus from '../components/GeoStatus';

const Room = (props) => {
  const { roomNumber, roomMessages, user, submitMessage, outRoom } = props;
  const [text, setText] = useState('');
  const [typing, setTyping] = useState('');
  const [isModal, setIsModal] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  });

  useEffect(() => {
    socketClient.on('who typing', (name) => {
      setTyping(`${name}님이 작성 중...`);
      setTimeout(() => {
        setTyping('');
      }, 2000);
    });
  }, []);

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const closeModal = () => {
    outRoom(roomNumber, user);
    setIsModal(false);
  };

  const handleModal = () => {
    setIsModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text) return;
    const date = new Date().toString();
    const message = {
      text: text,
      time: date.slice(16, 21),
    };
    submitMessage(roomNumber, user, message);
    setText('');
  };

  const handleTyping = () => {
    socketClient.emit('typing', roomNumber, user);
  };

  const chatList = roomMessages.map((message, index) => {
    const messageClass =
      message.user.id === user.id
        ? 'me'
        : message.user.id === '000000000'
        ? 'notice'
        : 'you';
    return (
      <div className={`message ${messageClass}`} key={index}>
        {messageClass === 'you' && (
          <div className="text-user">{message.user.name}</div>
        )}
        <div className="wrap-message">
          <div className={`text-${messageClass}`}>{message.message}</div>
          {message.user.id !== '000000000' && (
            <div className={`text-time-${messageClass}`}>{message.time}</div>
          )}
        </div>
      </div>
    );
  });

  return (
    <div className="container-room">
      <div className="room-head">
        <GeoStatus
          {...props}
          handleModal={handleModal}
          closeModal={closeModal}
        />
        <TrainInfo {...props} />
      </div>
      <div className="room-body-chat bg-room">
        <div ref={scrollRef} className="box-chat">
          {chatList}
        </div>
      </div>
      <div className="room-body-submit">
        <div className="box-ing">{typing}</div>
        <form onSubmit={handleSubmit} className="form-chat">
          <input
            className="input-message"
            type="text"
            placeholder="대화내용을 입력하세요"
            value={text}
            onChange={handleChange}
            onKeyPress={handleTyping}
          />
          <button className="submit" type="submit">
            ▲
          </button>
        </form>
      </div>
      {isModal && <OutModal {...props} closeModal={closeModal} />}
    </div>
  );
};

export default Room;
