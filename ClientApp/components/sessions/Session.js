import React from 'react';

const Session = (props) => {
  return (
    <li key={props.id} className="session">
      <h2>{props.session.title}</h2>
      <div dangerouslySetInnerHTML={{__html: props.session.abstract}} />
    </li>
  );    
}


export default Session;