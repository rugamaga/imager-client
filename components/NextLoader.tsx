import React from 'react'

import spinner from '../assets/spinner.svg'

export const NextLoader = ({loading, onClick}) => {
  if( loading ) {
    return (
      <div className="imagebox">
        <img src={spinner} />
      </div>
    );
  } else {
    return (
      <a onClick={onClick}><div className="imagebox loader"><span>next</span></div></a>
    );
  }
};
