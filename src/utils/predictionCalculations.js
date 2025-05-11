const calculateFinancePredictions = (
  specialNumbers,
  financeNumbers,
  negativeNumbers
) => {
  // Handle undefined or null inputs
  if (!specialNumbers || !Array.isArray(specialNumbers)) return [];
  if (!financeNumbers || !Array.isArray(financeNumbers)) return [];
  if (!negativeNumbers) negativeNumbers = []; // Convert undefined to empty array

  const hasFinanceNumber = specialNumbers.some((num) =>
    financeNumbers.includes(num)
  );
  const hasNegativeFinanceNumber = financeNumbers.some((num) =>
    negativeNumbers.includes(num)
  );

  if (hasFinanceNumber && !hasNegativeFinanceNumber) {
    return [
      {
        type: "positive",
        message:
          "Finance Opportunity - Good period for financial growth and stability",
      },
    ];
  }
  return [];
};

const calculatePropertyPredictions = (
  specialNumbers,
  regularNumbers,
  negativeNumbers
) => {
  // Handle undefined or null inputs
  if (!regularNumbers || !Array.isArray(regularNumbers)) return [];
  if (!specialNumbers || !Array.isArray(specialNumbers)) return [];
  if (!negativeNumbers) negativeNumbers = []; // Convert undefined to empty array

  const propertyFavorableNumbers = [1, 5, 6, 8];
  const propertyAlternateNumbers = [1, 5, 4, 8];

  // Check any property condition
  if (
    // Case 1: No 1 or 8 in regular numbers but present in special numbers
    (!regularNumbers.some((num) => [1, 8].includes(num)) &&
      specialNumbers.some((num) => [1, 8].includes(num))) ||
    // Case 2: Number 1 in regular numbers and special numbers have 1,5,6
    (regularNumbers.includes(1) &&
      specialNumbers.some((num) => propertyFavorableNumbers.includes(num))) ||
    // Case 3: 8 not negative and special numbers have 1,5,4,8
    (!negativeNumbers.includes(8) &&
      specialNumbers.some((num) => propertyAlternateNumbers.includes(num))) ||
    // Case 4: Number 1 in regular, 8 not negative, and special numbers have 1,5,6,4
    (regularNumbers.includes(1) &&
      !negativeNumbers.includes(8) &&
      specialNumbers.some((num) =>
        [...propertyFavorableNumbers, 4].includes(num)
      ))
  ) {
    return [
      {
        type: "positive",
        message: "Property Opportunity - Favorable time for property dealings",
      },
    ];
  }

  return [];
};

/**
 * Calculate predictions based on grid numbers and their relationships
 */
export const analyzePredictions = (gridData) => {
  // Get special numbers (Antar Dasha and Dasha)
  const specialNumbers = [
    gridData.antarDashaNumber, // Antar Dasha number
    gridData.dashaNumber, // Dasha number
  ].filter((num) => num !== undefined);

  // Finance Predictions
  const financeNumbers = [3, 5, 6];
  const finance = calculateFinancePredictions(
    specialNumbers,
    financeNumbers,
    gridData.negativeNumbers
  );

  // Property Predictions
  const property = calculatePropertyPredictions(
    specialNumbers,
    gridData.regularNumbers,
    gridData.negativeNumbers
  );

  return {
    finance,
    property,
  };
};
