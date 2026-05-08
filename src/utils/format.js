export function printNumber(rawNumber = 0, precision = 2, locale = "en-US") {
  const floatNumber = rawNumber ? parseFloat(rawNumber) : 0.0;

  const formatedNumber = new Intl.NumberFormat(locale, {
    minimumFractionDigits: precision,
  }).format(floatNumber);

  return formatedNumber.includes(",") ? formatedNumber : `${formatedNumber}`;
}

export function printDate(rawDate = new Date(), locale = "es-CL") {
  return new Date(rawDate).toLocaleDateString(locale);
}

export const formatNumber = (number, minValue) => {
  const formatedNumber = printNumber(number, minValue);
  const decimal =
    formatedNumber.split(".").length > 1 ? formatedNumber.split(".")[1] : "";

  const length = decimal.length;

  let newLength = 0;
  for (let index = length - 1; index >= 0; index--) {
    const digit = decimal.charAt(index);
    if (Number(digit) > 0) {
      newLength = index;
      break;
    }
  }

  return printNumber(number, newLength < 2 ? 2 : newLength + 1);
};
