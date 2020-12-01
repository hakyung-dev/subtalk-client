import React from 'react';
import train from '../styles/images/train.png';

const OutModal = (props) => {
  const { closeModal } = props;

  return (
    <div className="out" onClick={() => closeModal()}>
      <div className="container-alarm">
        <div className="modal-body">
          <div className="title-modal">ERROR</div>
          <div className="alarm">열차와 사용자의 위치가 벗어났습니다.</div>
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
