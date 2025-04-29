import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VedicGrid from "./VedicGrid";
import numerologyData from "../data/numerologyData.json";

const NumerologyCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numerologyResult, setNumerologyResult] = useState(null);
  const [vedicGrid, setVedicGrid] = useState(Array(9).fill([]));
  const [dateInput, setDateInput] = useState("");
  const [name, setName] = useState("");

  // Updated Vedic grid order: 3-1-9, 6-7-5, 2-8-4
  const vedicOrder = [3, 1, 9, 6, 7, 5, 2, 8, 4];

  // Name number mapping
  const nameNumberMap = {
    a: 1,
    i: 1,
    j: 1,
    y: 1,
    b: 2,
    k: 2,
    r: 2,
    c: 3,
    g: 3,
    l: 3,
    s: 3,
    d: 4,
    m: 4,
    t: 4,
    h: 5,
    e: 5,
    n: 5,
    x: 5,
    u: 6,
    v: 6,
    w: 6,
    o: 7,
    z: 7,
    p: 8,
    f: 8,
  };

  // Calculate name number
  const calculateNameNumber = (name) => {
    if (!name) return null;

    const nameSum = name
      .toLowerCase()
      .split("")
      .filter((char) => /[a-z]/.test(char)) // Only process alphabets
      .reduce((sum, char) => {
        return sum + (nameNumberMap[char] || 0);
      }, 0);

    // Reduce to single digit
    let nameNumber = nameSum;
    while (nameNumber > 9) {
      nameNumber = String(nameNumber)
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }

    return nameNumber;
  };

  const handleDateInputChange = (event) => {
    let value = event.target.value.replace(/\D/g, ""); // Remove non-digits

    // Limit to 8 digits (DDMMYYYY)
    value = value.slice(0, 8);

    // Format as DD/MM/YYYY
    let formattedDate = "";
    if (value.length > 0) {
      formattedDate = value.slice(0, 2);
      if (value.length > 2) {
        formattedDate += "/" + value.slice(2, 4);
        if (value.length > 4) {
          formattedDate += "/" + value.slice(4, 8);
        }
      }
    }

    setDateInput(formattedDate);

    // Convert formatted date to Date object if it's complete
    if (value.length === 8) {
      const day = value.slice(0, 2);
      const month = value.slice(2, 4);
      const year = value.slice(4, 8);
      const dateObj = new Date(`${year}-${month}-${day}`);

      if (!isNaN(dateObj.getTime())) {
        setSelectedDate(dateObj);
        calculateVedicGrid(dateObj);
      }
    }
  };

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    const nameNumber = calculateNameNumber(newName);
    setNumerologyResult((prev) => ({
      ...prev,
      nameNumber: nameNumber || null,
    }));
  };

  const calculateVedicGrid = (date) => {
    if (!date) return;

    const day = date.getDate().toString();
    const month = (date.getMonth() + 1).toString();
    // Get only last two digits of the year
    const year = date.getFullYear().toString().slice(-2);

    // Initialize grid with empty arrays for each position
    const newGrid = Array(9)
      .fill()
      .map(() => []);

    // Helper function to add numbers to specific grid positions
    const addToGrid = (number) => {
      // Find all positions where this number should appear
      vedicOrder.forEach((gridNum, index) => {
        if (gridNum === number) {
          newGrid[index] = [...newGrid[index], number];
        }
      });
    };

    // Process each digit from day
    day.split("").forEach((digit) => {
      const num = parseInt(digit);
      if (num !== 0) addToGrid(num);
    });

    // Process each digit from month
    month.split("").forEach((digit) => {
      const num = parseInt(digit);
      if (num !== 0) addToGrid(num);
    });

    // Process each digit from year (now only last 2 digits)
    year.split("").forEach((digit) => {
      const num = parseInt(digit);
      if (num !== 0) addToGrid(num);
    });

    // Calculate birth number and add it to the grid
    let birthNumber = String(day)
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);
    while (birthNumber > 9) {
      birthNumber = String(birthNumber)
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    addToGrid(birthNumber);

    // Calculate destiny number (using full year for destiny number calculation)
    const fullYear = date.getFullYear().toString();
    const dateString = `${day}${month}${fullYear}`;
    let destinyNumber = dateString
      .split("")
      .reduce((sum, digit) => sum + parseInt(digit), 0);

    while (destinyNumber > 9) {
      destinyNumber = String(destinyNumber)
        .split("")
        .reduce((sum, digit) => sum + parseInt(digit), 0);
    }
    addToGrid(destinyNumber); // Add destiny number to the grid

    setVedicGrid(newGrid);
    setNumerologyResult((prev) => ({
      ...prev,
      destinyNumber,
      birthNumber,
      nameNumber: calculateNameNumber(name),
    }));
  };

  const isEnemyNumber = (number1, number2) => {
    if (!number1 || !number2) return false;
    const numberData = numerologyData.numbers[number2];
    return numberData?.enemyNumbers.includes(number1);
  };

  return (
    <div className="w-full px-8 py-8">
      {/* Input Section */}
      <div className="w-full mb-8">
        <div className="bg-white rounded-lg shadow-lg p-8">
          <h2 className="text-2xl font-semibold mb-6 text-center text-purple-800">
            Enter Your Details
          </h2>
          <div className="flex flex-col items-center">
            <div className="w-full flex flex-col lg:flex-row gap-4 lg:gap-8 max-w-4xl mx-auto">
              {/* Name Input */}
              <div className="flex-1">
                <input
                  type="text"
                  value={name}
                  onChange={handleNameChange}
                  placeholder="Enter your name"
                  className="w-full p-4 text-lg text-center border border-purple-300 rounded focus:outline-none focus:border-purple-500"
                />
              </div>

              {/* Date Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="text"
                    value={dateInput}
                    onChange={handleDateInputChange}
                    placeholder="DD/MM/YYYY"
                    maxLength="10"
                    className="w-full p-4 text-lg text-center border border-purple-300 rounded focus:outline-none focus:border-purple-500"
                  />
                  <DatePicker
                    selected={selectedDate}
                    onChange={(date) => {
                      setSelectedDate(date);
                      calculateVedicGrid(date);
                      if (date) {
                        const day = date.getDate().toString().padStart(2, "0");
                        const month = (date.getMonth() + 1)
                          .toString()
                          .padStart(2, "0");
                        const year = date.getFullYear();
                        setDateInput(`${day}/${month}/${year}`);
                      }
                    }}
                    dateFormat="dd/MM/yyyy"
                    customInput={<div style={{ display: "none" }} />}
                    showYearDropdown
                    scrollableYearDropdown
                    yearDropdownItemNumber={100}
                  />
                </div>
              </div>
            </div>
          </div>

          {numerologyResult && (
            <div className="w-full mt-8">
              <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-8">
                <div className="flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-purple-200">
                  <p className="text-lg text-purple-600 mb-2">Birth Number</p>
                  <p className="text-4xl font-bold text-purple-900">
                    {numerologyResult.birthNumber}
                  </p>
                </div>
                <div className="flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-purple-200">
                  <p className="text-lg text-purple-600 mb-2">Destiny Number</p>
                  <p className="text-4xl font-bold text-purple-900">
                    {numerologyResult.destinyNumber}
                  </p>
                </div>

                <div className={`flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 ${
                  isEnemyNumber(numerologyResult.nameNumber, numerologyResult.birthNumber)
                    ? 'border-red-500'
                    : 'border-purple-200'
                }`}>
                  <p className={`text-lg mb-2 ${
                    isEnemyNumber(numerologyResult.nameNumber, numerologyResult.birthNumber)
                      ? 'text-red-600'
                      : 'text-purple-600'
                  }`}>Name Number</p>
                  <p className={`text-4xl font-bold ${
                    isEnemyNumber(numerologyResult.nameNumber, numerologyResult.birthNumber)
                      ? 'text-red-600'
                      : 'text-purple-900'
                  }`}>
                    {numerologyResult.nameNumber || '-'}
                  </p>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>

      {/* Vedic Grid Section */}
      {selectedDate && (
        <div className="w-full">
          <VedicGrid vedicGrid={vedicGrid} vedicOrder={vedicOrder} />
        </div>
      )}
    </div>
  );
};

export default NumerologyCalculator;
