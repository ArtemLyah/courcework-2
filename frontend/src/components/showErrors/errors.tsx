import * as React from 'react';
import { SerializedException } from '@courcework/common';
import './errors.css';

interface ShowErrorsProps {
  error?: SerializedException;
}

const ShowErrors = ({ error }: ShowErrorsProps) => {
  let renderErrors;

  if (!error) {
    return null;
  }
  
  if (Array.isArray(error.message)) {
    renderErrors = error.message.map((message, index) => {
      return (
        <p key={index} className='error-msg'>{message}</p>
      );
    });
  }
  else {
    renderErrors = <p className='error-msg'>{error.message}</p>;
  }

  return (
    <div className="errors">
      { renderErrors }
    </div>
  );
}
 
export default ShowErrors;