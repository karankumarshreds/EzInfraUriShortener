import React from 'react';
import './Loading.scss';

const Loading: React.FC<{ text?: string }> = ({ text = 'loading' }) => {
  return (
    <div className="loadingScreen">
      <h3 className="loadingScreen__text">
        {' '}
        {text.split('').map((each: string, i: number) => (
          <span className="loadingScreen__text__span" key={i}>
            {each}
          </span>
        ))}
      </h3>
    </div>
  );
};

export default Loading;
