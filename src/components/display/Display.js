import React, { useState, useRef, useEffect } from 'react';
import PropTypes from 'prop-types';
import './Display.scss';

export const Display = (props) => {
  const ref = useRef();
  const [scale, setScale] = useState(1);
  const { getResult, firstOperand, secondOperand, operation, isError } = props;

  useEffect(() => {
    if (ref.current) {
      const node = ref.current;
      const parentNode = ref.current.parentNode;
      const availableWidth = parentNode.offsetWidth;
      const actualWidth = node.offsetWidth;
      const actualScale = availableWidth / actualWidth;

      if (scale === actualScale) return;

      if (actualScale < 1) {
        setScale(actualScale);
      } else if (scale < 1) {
        setScale(1);
      }
    }
  }, [firstOperand, secondOperand, operation]);

  return (
    <div className="display calculator-display">
      <p ref={ref} style={{ transform: `scale(${scale}, ${scale})` }} className="display-main-line">
        {`${firstOperand ?? ''} ${operation ?? ''} ${secondOperand ?? ''}`}
      </p>
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
