import React, { useState } from 'react';
import Display from '../display';
import Button from '../button';
import { MAX_NUM_LENGTH } from '../../utils/constants';
import { formatOutputValue } from '../../utils/format';
import './Calculator.scss';

export const Calculator = () => {
  const [isError, setIsError] = useState(false);
  const [firstOperand, setFirstOperand] = useState('0');
  const [secondOperand, setSecondOperand] = useState(null);
  const [operation, setOperation] = useState(null);

  const handleNumButtonClick = (_, num) => {
    if (!firstOperand || !operation) {
      firstOperand.length < MAX_NUM_LENGTH &&
        setFirstOperand(String(parseFloat(firstOperand + num)));
      return;
    }
    if (isError) {
      setIsError(false);
    }
    const second = secondOperand ?? '0';
    if (second.length < MAX_NUM_LENGTH) {
      setSecondOperand(String(parseFloat(second + num)));
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

    const result = performCalculation();
    if (result) {
      setFirstOperand(String(formatOutputValue(result)));
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
      setFirstOperand(String(firstOperand / 100));
      setOperation(null);
      return;
    }
    setSecondOperand(secondOperand + '%');
  };

  const performCalculation = () => {
    if (!firstOperand || !operation || !secondOperand) {
      return;
    }

    let curOper = +firstOperand,
      prevOper = null;

    if (secondOperand.includes('%')) {
      prevOper = (parseFloat(secondOperand) * curOper) / 100;
    } else {
      prevOper = +secondOperand;
    }

    switch (operation) {
      case '+':
        return curOper + prevOper;
      case '-':
        return curOper - prevOper;
      case '*':
        return curOper * prevOper;
      case '/':
        if (prevOper === 0) {
          setIsError(true);
          return;
        }
        return curOper / prevOper;
      default:
        return 0;
    }
  };

  return (
    <div className="calculator">
      <Display
        firstOperand={firstOperand}
        secondOperand={secondOperand}
        operation={operation}
        getResult={() => formatOutputValue(performCalculation())}
        isError={isError}
      />
      <div className="numpad">
        <Button value="AC" type="clear" onClick={handleClearButton} />
        <Button value={null} type="backspace" onClick={handleBackspaceButton} />
        <Button value="%" type="common" onClick={handlePercentButton} />
        <Button value="/" type="operation" onClick={handleOperationClick} />
        <Button value="7" type="common" onClick={handleNumButtonClick} />
        <Button value="8" type="common" onClick={handleNumButtonClick} />
        <Button value="9" type="common" onClick={handleNumButtonClick} />
        <Button value="*" type="operation" onClick={handleOperationClick} />
        <Button value="4" type="common" onClick={handleNumButtonClick} />
        <Button value="5" type="common" onClick={handleNumButtonClick} />
        <Button value="6" type="common" onClick={handleNumButtonClick} />
        <Button value="-" type="operation" onClick={handleOperationClick} />
        <Button value="1" type="common" onClick={handleNumButtonClick} />
        <Button value="2" type="common" onClick={handleNumButtonClick} />
        <Button value="3" type="common" onClick={handleNumButtonClick} />
        <Button value="+" type="operation" onClick={handleOperationClick} />
        <Button value="." type="operation" onClick={handleDecimalButton} />
        <Button value="0" type="common" onClick={handleNumButtonClick} />
        <Button value="=" type="equal" onClick={handleEqualButton} />
      </div>
    </div>
  );
};
