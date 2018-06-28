import React from 'react';

const Session = (props) => {
  const deleteButton = props.isOwner ? <input type="button" title="Delete This Session" className="btn btn-sm btn-danger" value="X" onClick={props.delete}/> : null;
  return (
    <li key={props.id} className="session">
      <h2>{props.session.title} {deleteButton}</h2>
      <div dangerouslySetInnerHTML={{__html: props.session.abstract}} />
    </li>
  );    
}

export default Session;