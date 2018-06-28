import React from 'react';

const Session = (props) => {
  const deleteButton = props.isOwner ? <input type="button" className="btn btn-danger" value="X" onClick={props.delete}/> : null;
  return (
    <li key={props.id} className="session">
      <h2>{props.session.title}</h2>
      <div dangerouslySetInnerHTML={{__html: props.session.abstract}} />
      {deleteButton}
    </li>
  );    
}


export default Session;