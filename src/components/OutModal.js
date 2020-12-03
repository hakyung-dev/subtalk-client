import React, { useEffect } from 'react';
import train from '../styles/images/train.png';

import Timer from './Timer';

const OutModal = (props) => {
  const { closeModal } = props;

  useEffect(() => {
    const callOut = setTimeout(closeModal, 11000);
    return () => clearTimeout(callOut);
  }, [closeModal]);

  return (
    <div className="out">
      <div className="container-alarm">
        <div className="modal-body">
          <div className="title-modal">ERROR</div>
          <div className="alarm">
            열차와 사용자의 위치가 벗어났습니다.<br></br>
            홈으로 이동하기 <Timer leftTime={10} />
          </div>
          <div className="container-train">
            <img src={train} className="train" alt="train" />
          </div>
        </div>
        <button className="close-modal" onClick={() => closeModal()}>
          홈으로 돌아갑니다.
        </button>
      </div>
    </div>
  );
};

export default OutModal;
