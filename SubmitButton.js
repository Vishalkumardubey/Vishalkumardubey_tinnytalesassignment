// SubmitButton.js
import React from 'react';

function SubmitButton({ onClick, disabled, isLoading }) {
  return (
    <button onClick={onClick} disabled={disabled}>
      {isLoading ? 'Loading...' : 'Submit'}
    </button>
  );
}

export default SubmitButton;