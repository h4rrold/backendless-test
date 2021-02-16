export const formatOutputValue = (value) => {
  return !isNaN(value)
    ? parseFloat(value).toLocaleString('en-US', {
        useGrouping: false,
        maximumFractionDigits: 8
      })
    : null;
};

export const formatNumer = (num) => String(parseFloat(num));
