import React from 'react';
import PropTypes from 'prop-types';
import './Display.scss';

export const Display = (props) => {
  const { getResult, firstOperand, secondOperand, operation, isError } = props;

  return (
    <div className="display calculator-display">
      <p className="display-main-line">{`${firstOperand ?? ''} ${operation ?? ''} ${
        secondOperand ?? ''
      }`}</p>
      <p className="display-result-line">{isError ? 'Error' : getResult() ?? firstOperand}</p>
    </div>
  );
};

Display.propTypes = {
  firstOperand: PropTypes.string,
  secondOperand: PropTypes.string,
  operation: PropTypes.string,
  isError: PropTypes.bool,
  getResult: PropTypes.func
};

Display.defaultProps = {
  getResult: () => '0',
  isError: false,
  firstOperand: '0',
  secondOperand: null,
  operation: null
};
