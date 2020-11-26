import React from 'react';
import { Redirect } from 'react-router-dom';
import Timer from './Timer';

const RealtimeBoard = (props) => {
  const {
    arvlCd,
    arvlMsg3,
    arvlMsg2,
    btrainNo,
    trainLineNm,
    barvlDt,
    recptnDt,
    btrainSttus,
    subwayId,
  } = props.arrival;
  const { station, enterRoom, roomNumber, user } = props;

  const timeGap = new Date() - new Date(recptnDt);
  const transformSec = parseInt(timeGap / 1000);

  const leftTime = Number(barvlDt - transformSec);
  const direction = trainLineNm.split(' - ')[0];

  const arrivalCodeToText = {
    0: '당역 진입',
    1: '도착',
    2: '출발',
    3: '전역 출발',
    4: '전역 진입',
    5: '전역도착',
    99: '운행중',
  };

  const realTime = () => {
    const position = arvlMsg2.replace(/[^0-9]/g, '');
    if (arvlCd === '99') {
      if (leftTime < 1) {
        return (
          <span>
            <span className="real">{`${position}정거장 전`}</span>
            <span className="current">{arvlMsg3}</span>
          </span>
        );
      }
      return (
        <span>
          <Timer leftTime={leftTime} {...props} />
          <span className="current">{arvlMsg3}</span>
        </span>
      );
    } else if (arvlCd === '1' || arvlCd === '2') {
      if (arvlMsg3 === station) {
        return (
          <span>
            <span className="code">당역</span>
            <span className="code">{arrivalCodeToText[arvlCd]}</span>
          </span>
        );
      }
    } else {
      return <span className="code">{arrivalCodeToText[arvlCd]}</span>;
    }
  };

  const trainStatus = btrainSttus && (
    <span className="status">{btrainSttus}</span>
  );
  const roomNo = btrainNo + subwayId;

  const handleEnter = (e) => {
    e.preventDefault();
    enterRoom(roomNo, user);
  };

  if (roomNumber) {
    return <Redirect to={`/chat/${roomNo}`} />;
  }

  return (
    <div className="container-timer">
      <button className="wrap" onClick={handleEnter}>
        <span className="direction">
          {direction}
          {trainStatus}
        </span>
        {realTime()}
      </button>
    </div>
  );
};

export default RealtimeBoard;
