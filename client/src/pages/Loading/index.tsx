import React from 'react';
import './Loading.scss';

const Loading: React.FC = () => {
  return (
    <div className="loadingScreen">
      <h3 className="loadingScreen__text">
        {' '}
        <span className="loadingScreen__text__span">l</span>
        <span className="loadingScreen__text__span">o</span>
        <span className="loadingScreen__text__span">a</span>
        <span className="loadingScreen__text__span">d</span>
        <span className="loadingScreen__text__span">i</span>
        <span className="loadingScreen__text__span">n</span>
        <span className="loadingScreen__text__span">g</span>
      </h3>
    </div>
  );
};

export default Loading;
