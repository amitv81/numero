/**
 * Calculate predictions based on grid numbers and their relationships
 */
export const analyzePredictions = (gridData) => {
  const predictions = {
    finance: [],
    // Can add more categories here in future like:
    // career: [],
    // relationships: [],
    // health: [],
    // etc.
  };

  // Get special numbers (Antar Dasha and Dasha)
  const specialNumbers = [
    gridData.antarDashaNumber, // Antar Dasha number
    gridData.dashaNumber, // Dasha number
  ].filter((num) => num !== undefined);

  // Finance Predictions
  const financeNumbers = [1, 3, 5, 6, 8, 9];
  const hasFinanceNumber = specialNumbers.some((num) =>
    financeNumbers.includes(num)
  );

  // Check if any finance numbers are in negative numbers array
  const hasNegativeFinanceNumber = financeNumbers.some((num) =>
    gridData.negativeNumbers?.includes(num)
  );
  //   alert(hasNegativeFinanceNumber);
  if (hasFinanceNumber && !hasNegativeFinanceNumber) {
    predictions.finance.push({
      type: "positive",
      message: "Great Finance - Good period for financial growth and stability",
      reason:
        "Presence of favorable numbers (3, 5, or 6) in Dasha/Antar Dasha without negativity",
    });
  }

  // Add more prediction rules here in future...

  return predictions;
};
