import React, { useState } from 'react';
import Display from '../display';
import Button from '../button';
import { MAX_NUM_LENGTH } from '../../utils/constants';
import { formatOutputValue, formatNumer } from '../../utils/format';
import { performCalculation } from '../../utils/services/calculation';
import './Calculator.scss';

export const Calculator = () => {
  const [isError, setIsError] = useState(false);
  const [firstOperand, setFirstOperand] = useState('0');
  const [secondOperand, setSecondOperand] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumButtonClick = (_, num) => {
    if (!firstOperand || !operation) {
      firstOperand.length < MAX_NUM_LENGTH && setFirstOperand(formatNumer(firstOperand + num));
      return;
    }
    if (isError) {
      setIsError(false);
    }
    const second = secondOperand ?? '0';
    if (second.length < MAX_NUM_LENGTH) {
      setSecondOperand(formatNumer(second + num));
    }
  };

  const handleOperationClick = (_, operation) => {
    if (!firstOperand) {
      return;
    }
    setOperation(operation);
  };

  const handleBackspaceButton = () => {
    if (isError) {
      setIsError(false);
    }
    if (secondOperand) {
      setSecondOperand(null);
      return;
    }
    if (operation) {
      setOperation(null);
      return;
    }

    setFirstOperand('0');
  };

  const handleClearButton = () => {
    setOperation(null);
    setSecondOperand(null);
    setFirstOperand('0');
    setIsError(false);
  };

  const handleEqualButton = () => {
    if (isError) {
      return;
    }
    if (!secondOperand && !firstOperand && !operation) {
      return;
    }
    setOperation(null);
    setSecondOperand(null);

    const result = performCalculation(firstOperand, operation, secondOperand, () => {
      setIsError(true);
    });
    if (result) {
      setFirstOperand(formatOutputValue(result));
    }
  };

  const handleDecimalButton = () => {
    if (!secondOperand && !firstOperand.includes('.')) {
      setFirstOperand(firstOperand + '.');
    } else if (secondOperand && !secondOperand.includes('.')) {
      setSecondOperand(secondOperand + '.');
    }

    if (isError) {
      setIsError(false);
    }
  };

  const handlePercentButton = () => {
    if (!secondOperand) {
      setFirstOperand(formatNumer(firstOperand / 100));
      setOperation(null);
      return;
    }
    setSecondOperand(secondOperand + '%');
  };

  return (
    <div className="calculator">
      <Display
        firstOperand={firstOperand}
        secondOperand={secondOperand}
        operation={operation}
        getResult={() =>
          formatOutputValue(
            performCalculation(firstOperand, operation, secondOperand, () => {
              setIsError(true);
            })
          )
        }
        isError={isError}
      />
      <div className="numpad">
        <Button value="AC" className="clear" onClick={handleClearButton} />
        <Button value={null} className="backspace" onClick={handleBackspaceButton} />
        <Button value="%" className="common" onClick={handlePercentButton} />
        <Button value="/" className="operation" onClick={handleOperationClick} />
        <Button value="7" className="common" onClick={handleNumButtonClick} />
        <Button value="8" className="common" onClick={handleNumButtonClick} />
        <Button value="9" className="common" onClick={handleNumButtonClick} />
        <Button value="*" className="operation" onClick={handleOperationClick} />
        <Button value="4" className="common" onClick={handleNumButtonClick} />
        <Button value="5" className="common" onClick={handleNumButtonClick} />
        <Button value="6" className="common" onClick={handleNumButtonClick} />
        <Button value="-" className="operation" onClick={handleOperationClick} />
        <Button value="1" className="common" onClick={handleNumButtonClick} />
        <Button value="2" className="common" onClick={handleNumButtonClick} />
        <Button value="3" className="common" onClick={handleNumButtonClick} />
        <Button value="+" className="operation" onClick={handleOperationClick} />
        <Button value="." className="operation" onClick={handleDecimalButton} />
        <Button value="0" className="common" onClick={handleNumButtonClick} />
        <Button value="=" className="equal" onClick={handleEqualButton} />
      </div>
    </div>
  );
};
