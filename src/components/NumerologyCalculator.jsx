import { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import VedicGrid from "./VedicGrid";

const NumerologyCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numerologyResult, setNumerologyResult] = useState(null);
  const [vedicGrid, setVedicGrid] = useState(Array(9).fill([]));

  // Updated Vedic grid order: 3-1-9, 6-7-5, 2-8-4
  const vedicOrder = [3, 1, 9, 6, 7, 5, 2, 8, 4];

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
    setNumerologyResult({ destinyNumber, birthNumber });
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    calculateVedicGrid(date);
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
        {/* Left Panel - Date Selection and Basic Numbers */}
        <div className="lg:col-span-4">
          <div className="bg-white rounded-lg shadow-lg p-6">
            <h2 className="text-xl font-semibold mb-4 text-center text-purple-800">
              Select Your Birth Date
            </h2>
            <div className="mb-6">
              <DatePicker
                selected={selectedDate}
                onChange={handleDateChange}
                dateFormat="dd/MM/yyyy"
                placeholderText="Select date"
                showYearDropdown
                scrollableYearDropdown
                yearDropdownItemNumber={100}
                className="w-full p-2 border border-purple-300 rounded focus:outline-none focus:border-purple-500"
              />
            </div>

            {numerologyResult && (
              <div className="space-y-4">
                <div className="bg-purple-50 p-4 rounded-lg">
                  <h3 className="font-semibold text-purple-800 mb-2">
                    Your Numbers
                  </h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <p className="text-sm text-purple-600">Destiny Number</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {numerologyResult.destinyNumber}
                      </p>
                    </div>
                    <div>
                      <p className="text-sm text-purple-600">Birth Number</p>
                      <p className="text-2xl font-bold text-purple-900">
                        {numerologyResult.birthNumber}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Right Panel - Vedic Grid */}
        <VedicGrid
          selectedDate={selectedDate}
          vedicGrid={vedicGrid}
          vedicOrder={vedicOrder}
        />
      </div>
    </div>
  );
};

export default NumerologyCalculator;
