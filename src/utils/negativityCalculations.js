/**
 * Analyzes the negativity of numbers in a grid based on various rules
 */
export const analyzeNumbersNegativity = (gridData) => {
  const gridNumbers = gridData.vedicGrid
    .filter((arr) => arr && arr.length > 0)
    .reduce((acc, curr) => [...acc, ...curr], []);

  const specialNumberValues = [
    gridData.antarDashaNumber, // Antar Dasha number
    gridData.dashaNumber, // Dasha number
  ].filter((num) => num !== undefined);

  // Combine all numbers to check for negatives
  const allNumbers = [...gridNumbers, ...specialNumberValues];

  // Count frequency of each number
  const numberFrequency = {};
  allNumbers.forEach((num) => {
    numberFrequency[num] = (numberFrequency[num] || 0) + 1;
  });

  // Apply negativity rules
  return applyNegativityRules(gridNumbers, numberFrequency, gridData);
};

/**
 * Apply specific rules to determine negative numbers
 */
const applyNegativityRules = (gridNumbers, numberFrequency, gridData) => {
  // Use Set to ensure unique numbers
  const negativeNumbersSet = new Set();
  const regularNumbersSet = new Set();

  // Process each number only once by using Set
  const uniqueGridNumbers = [...new Set(gridNumbers)];

  uniqueGridNumbers.forEach((num) => {
    const totalFrequency = numberFrequency[num];

    // Rule 1: Special case for number 1
    if (num === 1) {
      console.log("NUMER 1", gridData, totalFrequency);
      if (totalFrequency > 1 && gridData.destinyNumber !== 1) {
        negativeNumbersSet.add(num);
      } else {
        regularNumbersSet.add(num);
      }
      return;
    }

    // Rule 2: Special case for numbers 4 and 8
    if (num === 4 || num === 8) {
      if (totalFrequency > 1 && totalFrequency % 2 === 1) {
        negativeNumbersSet.add(num);
      } else {
        regularNumbersSet.add(num);
      }
      return;
    }

    // Rule 3: Default case for all other numbers
    if (totalFrequency > 1) {
      negativeNumbersSet.add(num);
    } else {
      regularNumbersSet.add(num);
    }
  });

  return {
    negativeNumbers: Array.from(negativeNumbersSet),
    regularNumbers: Array.from(regularNumbersSet),
  };
};
