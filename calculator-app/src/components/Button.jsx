// src/components/Button.jsx
import React from 'react';

function Button({ label, onClick }) {
  return (
    <button onClick={onClick} className="calculator-button">
      {label}
    </button>
  );
}

export default Button;