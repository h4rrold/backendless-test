import React from 'react';
import PropTypes from 'prop-types';
import './Button.scss';

export const Button = (props) => {
  const { value, onClick, type } = props;

  return (
    <button
      onClick={(e) => onClick(e, value)}
      className={`button calclulator-button ${type ? 'button-' + type : ''}`}
    >
      {value}
    </button>
  );
};

Button.propTypes = {
  value: PropTypes.string,
  onClick: PropTypes.func,
  type: PropTypes.oneOf(['clear', 'common', 'equal', 'operation', 'backspace'])
};

Button.defaultProps = {
  value: '0',
  onClick: () => ({}),
  type: 'common'
};
