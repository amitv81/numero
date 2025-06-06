import numerologyData from "../data/numerologyData.json";
import positiveNumbersData from "../data/positiveNumbers.json";
import { nameNumberMap } from "../data/nameNumberMapping.json";

// Calculate name number for a specific part of the name
export const calculateNameNumberForPart = (namePart) => {
  if (!namePart) return null;

  const nameSum = namePart
    .toLowerCase()
    .split("")
    .filter((char) => /[a-z]/.test(char))
    .reduce((sum, char) => {
      return sum + (nameNumberMap[char] || 0);
    }, 0);

  // Only reduce if number is more than 2 digits
  let nameNumber = nameSum;
  while (nameNumber > 80) {
    nameNumber = String(nameNumber)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }

  return nameNumber;
};

// Calculate name numbers for full name and first name
export const calculateNameNumbers = (fullName) => {
  if (!fullName) return { fullNameNumber: null, firstNameNumber: null };

  const nameParts = fullName.trim().split(/\s+/);
  const firstName = nameParts[0];

  const firstNameNumber = calculateNameNumberForPart(firstName);
  const fullNameNumber = calculateNameNumberForPart(fullName);

  return { fullNameNumber, firstNameNumber };
};

// Calculate single digit from a number
export const calculateSingleDigit = (number) => {
  if (!number) return null;
  let singleDigit = number;
  while (singleDigit > 9) {
    singleDigit = String(singleDigit)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
  }
  return singleDigit;
};

// Calculate Vedic Grid
export const calculateVedicGrid = (date, vedicOrder, name) => {
  if (!date)
    return {
      newGrid: Array(9).fill([]),
      destinyNumber: null,
      birthNumber: null,
    };

  const day = date.getDate().toString();
  const month = (date.getMonth() + 1).toString();
  const year = date.getFullYear().toString().slice(-2);

  // Initialize grid with empty arrays for each position
  const newGrid = Array(9)
    .fill()
    .map(() => []);

  // Helper function to add numbers to specific grid positions
  const addToGrid = (number) => {
    vedicOrder.forEach((gridNum, index) => {
      if (gridNum === number) {
        newGrid[index] = [...newGrid[index], number];
      }
    });
  };

  // Process digits from day, month, and year
  [...day, ...month, ...year].forEach((digit) => {
    const num = parseInt(digit);
    if (num !== 0) addToGrid(num);
  });

  // Calculate birth number
  let birthNumber = calculateSingleDigit(
    day.split("").reduce((sum, digit) => sum + parseInt(digit), 0)
  );
  // Only add birth number to grid if its day is not one of the special numbers
  if (![1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 20, 30].includes(parseInt(day))) {
    addToGrid(birthNumber);
  }

  // Calculate destiny number (using full year)
  const fullYear = date.getFullYear().toString();
  const dateString = `${day}${month}${fullYear}`;
  const destinyNumber = calculateSingleDigit(
    dateString.split("").reduce((sum, digit) => sum + parseInt(digit), 0)
  );
  addToGrid(destinyNumber);

  return {
    newGrid,
    destinyNumber,
    birthNumber,
    nameNumber: calculateNameNumberForPart(name),
  };
};

// Check if a number is an enemy number
export const isEnemyNumber = (nameNumber, birthNumber, destinyNumber) => {
  if (!nameNumber || !birthNumber || !destinyNumber) return false;

  const birthEnemyNumbers =
    numerologyData.numbers[birthNumber]?.enemyNumbers || [];
  const destinyEnemyNumbers =
    numerologyData.numbers[destinyNumber]?.enemyNumbers || [];

  return (
    birthEnemyNumbers.includes(nameNumber) ||
    destinyEnemyNumbers.includes(nameNumber)
  );
};

// Check if a number is positive
export const isPositiveNumber = (number) => {
  return positiveNumbersData.positiveNumbers.includes(number);
};

// Calculate Dasha Numbers from birth year to 80 years ahead
export const calculateDashaNumbers = (birthYear, birthNumber) => {
  const endYear = birthYear + 80; // Calculate 80 years from birth year
  const dashaNumbers = [];
  let currentDasha = birthNumber;
  let yearCounter = birthYear;
  let yearsInCurrentDasha = 0;

  while (yearCounter <= endYear) {
    // Add years for the current dasha number
    for (let i = 0; i < currentDasha && yearCounter <= endYear; i++) {
      dashaNumbers.push({
        year: yearCounter,
        dashaNumber: currentDasha,
        remainingYears: currentDasha - yearsInCurrentDasha - 1,
      });
      yearCounter++;
      yearsInCurrentDasha++;
    }

    // Reset years counter and move to next dasha number
    yearsInCurrentDasha = 0;
    currentDasha = currentDasha === 9 ? 1 : currentDasha + 1;
  }

  return dashaNumbers;
};

// Calculate Antar Dasha Numbers from birth date
export const calculateAntarDashaNumber = (birthDate) => {
  if (!birthDate) return null;

  // 1. Get last 2 digits of year
  const yearLastTwoDigits = birthDate.getFullYear().toString().slice(-2);

  // 2. Get birth number from day
  const day = birthDate.getDate();
  const birthNumber = calculateSingleDigit(day);

  // 3. Get month number
  const monthNumber = birthDate.getMonth() + 1; // Adding 1 since getMonth() returns 0-11

  // 4. Get day of the week with custom number mapping
  const jsDay = birthDate.getDay(); // 0 = Sunday, 1 = Monday, etc.
  const dayNumberMap = {
    0: 1, // Sunday
    1: 2, // Monday
    2: 9, // Tuesday
    3: 5, // Wednesday
    4: 3, // Thursday
    5: 6, // Friday
    6: 8, // Saturday
  };
  const dayNumber = dayNumberMap[jsDay];
  const daysOfWeek = [
    "Sunday",
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday",
    "Saturday",
  ];
  const dayName = daysOfWeek[jsDay];

  // Calculate sum of birth, day and month numbers and reduce to single digit
  const antarDashaNumber = calculateSingleDigit(
    yearLastTwoDigits + birthNumber + dayNumber + monthNumber
  );

  return {
    yearLastTwoDigits,
    birthNumber,
    monthNumber,
    dayNumber,
    dayName,
    antarDashaNumber,
  };
};
