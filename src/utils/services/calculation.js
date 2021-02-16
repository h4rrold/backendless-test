export const performCalculation = (firstOperand, operation, secondOperand, errCallback) => {
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
        if (errCallback && typeof errCallback === 'function') {
          errCallback();
        }
        return;
      }
      return curOper / prevOper;
    default:
      return 0;
  }
};
