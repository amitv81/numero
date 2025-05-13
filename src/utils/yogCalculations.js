// Function to count occurrences of a number in the grid
const countNumberOccurrences = (numbers, targetNumber) => {
  return numbers.reduce(
    (count, num) => (num === targetNumber ? count + 1 : count),
    0
  );
};

// Function to check if a number is missing from the grid
const isNumberMissing = (numbers, targetNumber) => {
  return !numbers.includes(targetNumber);
};

const calculateYogs = (numbers) => {
  // Count occurrences of numbers 4, 5 and 9
  const count4 = countNumberOccurrences(numbers, 4);
  const count5 = countNumberOccurrences(numbers, 5);
  const count9 = countNumberOccurrences(numbers, 9);
  const count8 = countNumberOccurrences(numbers, 8);

  // Check if numbers are missing
  const is5Missing = isNumberMissing(numbers, 5);
  const is9Missing = isNumberMissing(numbers, 9);
  const is2Missing = isNumberMissing(numbers, 2);

  const yogs = [];

  // Bandhan Yog: Either (Single 9 and single 4, and 5 missing) OR (Single 5 and single 4, and 9 missing)
  if (
    (count4 === 1 && count9 === 1 && is5Missing) ||
    (count5 === 1 && count4 === 1 && is9Missing)
  ) {
    yogs.push({
      name: "Bandhan Yog",
      description: [
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Loose Bandhan Yog: Multiple 4 (even frequency) and single/multiple 9, and 5 must be missing OR (Single 5 and even frequency of 4, and 9 must be missing)
  if (
    (count4 > 1 && count4 % 2 === 0 && count9 >= 1 && is5Missing) ||
    (count5 === 1 && count4 % 2 === 0 && is9Missing)
  ) {
    yogs.push({
      name: "Loose Bandhan Yog",
      description: [
        "The problem will be reduced",
        "The person will be able to recover from illness",
        "Will get bail easily",
        "----------------------------------------",
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Strong Bandhan Yog: Multiple 9 and single 4, and 5 must be missing
  if (count9 > 1 && count4 === 1 && is5Missing) {
    yogs.push({
      name: "Strong Bandhan Yog",
      description: [
        "Either imprisoned or bound by health problems",
        "Hospitalization, Jail, Litigation and Health Problems",
        "Cannot control their speech",
        "Can pass lewd remarks or loose comments",
      ],
    });
  }

  // Accident Yog: Single 8 and single 4, and 2 must be missing
  if (count8 === 1 && count4 === 1 && is2Missing) {
    yogs.push({
      name: "Accident Yog",
      description: [
        "Makes native accident-prone",
        "The native behaves irrationally",
        "This combination is great for research and if natives have this combination in their birth chart, they will do very well in research-related vocationCannot control their speech",
        "Married life is generally problematic",
        "The Natives with this combination build air castles, and most of their plans and talks will be in the air",
      ],
    });
  }

  return yogs;
};

export { calculateYogs };
