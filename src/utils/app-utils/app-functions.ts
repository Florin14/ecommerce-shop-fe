export const formatNumberWithTwoDecimals = (number) => {
  const parsedNumber = parseFloat(number);

  if (!isNaN(parsedNumber)) {
    const formattedNumber = parsedNumber.toFixed(2);
    return formattedNumber; // Return the formatted string directly
  } else {
    return NaN;
  }
};
