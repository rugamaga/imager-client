import React from 'react'

const spinner_url = 'assets/spinner.svg';

export const NextLoader = ({loading, onClick}) => {
  if( loading ) {
    return (
      <div className="imagebox">
        <img src={spinner_url} />
      </div>
    );
  } else {
    return (
      <a onClick={onClick}><div className="imagebox loader"><span>next</span></div></a>
    );
  }
};
