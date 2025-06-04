import { useState, useEffect, useCallback, useMemo } from "react";
import GridAnalysisModal from "./GridAnalysisModal";
import {
  calculateAntarDashaNumber,
  calculateVedicGrid,
  calculateDashaNumbers,
  calculateSingleDigit,
} from "../utils/numerologyCalculations";
import { analyzeNumbersNegativity } from "../utils/negativityCalculations";
import { analyzePredictions } from "../utils/predictionCalculations";
import { calculateYogs } from "../utils/yogCalculations";

const AntarDashaGrid = ({ birthDate }) => {
  const [yearFrom, setYearFrom] = useState("");
  const [yearTo, setYearTo] = useState("");
  const [yearFromOptions, setYearFromOptions] = useState([]);
  const [yearToOptions, setYearToOptions] = useState([]);
  const [yearGrids, setYearGrids] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedGridNumbers, setSelectedGridNumbers] = useState({
    regularNumbers: [],
    negativeNumbers: [],
    specialNumbers: [],
    negativityInfo: {},
    predictions: {},
    yogs: [],
  });
  const [selectedYear, setSelectedYear] = useState(null);

  // Vedic grid order: 3-1-9, 6-7-5, 2-8-4
  const vedicOrder = useMemo(() => [3, 1, 9, 6, 7, 5, 2, 8, 4], []);

  // Calculate the base Vedic grid once from birth date
  const baseVedicData = useMemo(() => {
    if (!birthDate) return null;
    const result = calculateVedicGrid(birthDate, vedicOrder, "");
    return {
      newGrid: result.newGrid,
      destinyNumber: result.destinyNumber,
    };
  }, [birthDate, vedicOrder]);

  const generateYearGrids = useCallback(() => {
    if (!birthDate || !yearFrom || !yearTo || !baseVedicData) return;

    const grids = [];
    // Get all dasha numbers for the birth date
    const dashaNumbers = calculateDashaNumbers(
      birthDate.getFullYear(),
      calculateSingleDigit(birthDate.getDate())
    );

    for (let year = yearFrom; year <= yearTo; year++) {
      // Create a new date object for each year while preserving the birth date's month and day
      const yearDate = new Date(birthDate);
      yearDate.setFullYear(year);

      // Only calculate antar dasha number for this year
      const antarDashaResult = calculateAntarDashaNumber(yearDate);

      // Find the dasha number for this year
      const dashaForYear = dashaNumbers.find(
        (d) => d.year === year
      )?.dashaNumber;

      if (antarDashaResult) {
        grids.push({
          year,
          ...antarDashaResult,
          vedicGrid: baseVedicData.newGrid,
          dashaNumber: dashaForYear,
          destinyNumber: baseVedicData.destinyNumber,
        });
      }
    }
    setYearGrids(grids);
  }, [yearFrom, yearTo, birthDate, baseVedicData]);
  useEffect(() => {
    if (birthDate) {
      // Generate year options for "Year From" dropdown
      const birthYear = birthDate.getFullYear();
      const currentYear = new Date().getFullYear();
      const fromYears = [];
      for (let year = birthYear; year <= currentYear + 5; year++) {
        fromYears.push(year);
      }
      setYearFromOptions(fromYears);
      setYearFrom(currentYear); // Set default value to current year

      // Generate year options for "Year To" dropdown
      const toYears = [];
      for (let year = currentYear; year <= currentYear + 50; year++) {
        toYears.push(year);
      }
      setYearToOptions(toYears);
      setYearTo(currentYear + 5); // Set default value to current year + 5
    }
  }, [birthDate]);

  useEffect(() => {
    generateYearGrids();
  }, [generateYearGrids]);

  const handleYearFromChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYearFrom(selectedYear);
    // Ensure yearTo is not less than yearFrom
    if (selectedYear > yearTo) {
      setYearTo(selectedYear);
    }
  };

  const handleYearToChange = (e) => {
    const selectedYear = parseInt(e.target.value);
    setYearTo(selectedYear);
  };
  const handleGridClick = (gridData) => {
    // Import numerology data
    import("../data/numerologyData.json").then((data) => {
      // Analyze negativity using the utility function
      const { negativeNumbers, regularNumbers } =
        analyzeNumbersNegativity(gridData);

      // Build negativity info      // Build negativity info and remedies info
      const negativityInfo = {};
      const remediesInfo = {};
      negativeNumbers.forEach((num) => {
        // Add negativity information
        if (data.numbers[num]?.negativity) {
          const negativityList = data.numbers[num].negativity.filter(
            (info) => info !== ""
          );
          if (negativityList.length > 0) {
            negativityInfo[num] = negativityList;
          }
        }
        // Add remedies information
        if (data.numbers[num]?.remedies) {
          remediesInfo[num] = data.numbers[num].remedies;
        }
      });

      // Generate predictions
      const predictions = analyzePredictions({
        ...gridData,
        negativeNumbers,
        regularNumbers,
      });

      // Create array for Antar Dasha and Dasha numbers
      const specialNumbers = [
        ...(gridData.antarDashaNumber
          ? [`AD:${gridData.antarDashaNumber}`]
          : []),
        ...(gridData.dashaNumber ? [`D:${gridData.dashaNumber}`] : []),
      ];

      // Calculate birth number from birth date
      const birthNumber = calculateSingleDigit(birthDate.getDate());

      // Calculate Yogs
      const allNumbers = [
        ...gridData.vedicGrid.flat().filter((num) => num !== ""),
        gridData.antarDashaNumber,
        gridData.dashaNumber,
      ].filter(Boolean);

      const yogs = calculateYogs(allNumbers);
      setSelectedGridNumbers({
        regularNumbers,
        negativeNumbers,
        specialNumbers,
        negativityInfo,
        remediesInfo,
        predictions,
        yogs,
        birthNumber,
      });
      setSelectedYear(gridData.year);
      setIsModalOpen(true);
    });
  };

  const renderGrid = (gridData) => {
    return (
      <div
        key={gridData.year}
        className="bg-white rounded-lg shadow p-4 flex-1 min-w-[300px] cursor-pointer hover:bg-purple-50 transition-colors"
        onClick={() => handleGridClick(gridData)}
      >
        <h3 className="text-xl font-semibold text-purple-800 mb-4">
          Year {gridData.year}
        </h3>
        <div className="grid grid-cols-3 gap-2">
          {vedicOrder.map((number, index) => {
            const gridNumbers = gridData.vedicGrid[index];
            const isAntarDashaSum = gridData.antarDashaNumber === number;
            const isDashaNumber = gridData.dashaNumber === number;
            return (
              <div
                key={index}
                className="aspect-square border-2 border-purple-200 rounded-lg p-2 flex flex-col items-center justify-center relative"
              >
                <span className="absolute top-1 left-1 text-sm font-medium text-purple-600">
                  {number}
                </span>
                <span className="text-lg font-bold text-purple-800">
                  {gridNumbers && gridNumbers.length > 0
                    ? gridNumbers.join(", ")
                    : "-"}
                </span>
                {isAntarDashaSum && (
                  <span className="text-sm font-bold text-green-500 mt-1">
                    [{gridData.antarDashaNumber}]
                  </span>
                )}
                {isDashaNumber && (
                  <span className="text-sm font-bold text-red-500 mt-1">
                    [{gridData.dashaNumber}]
                  </span>
                )}
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  if (!birthDate) return null;

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-8 mt-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-800">
          Antar Dasha Analysis
        </h2>

        <div className="flex flex-col md:flex-row gap-4 justify-center mb-6">
          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Year From
            </label>
            <select
              value={yearFrom}
              onChange={handleYearFromChange}
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
            >
              {yearFromOptions.map((year) => (
                <option key={year} value={year}>
                  {year}
                </option>
              ))}
            </select>
          </div>

          <div className="flex-1 max-w-xs">
            <label className="block text-sm font-medium text-purple-700 mb-2">
              Year To
            </label>
            <select
              value={yearTo}
              onChange={handleYearToChange}
              className="w-full p-2 border border-purple-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500"
              min={yearFrom}
            >
              {yearToOptions
                .filter((year) => year >= yearFrom)
                .map((year) => (
                  <option key={year} value={year}>
                    {year}
                  </option>
                ))}
            </select>
          </div>
        </div>

        {/* Grids Container */}
        {yearGrids.length > 0 && (
          <div className="mt-8">
            <div className="flex flex-wrap gap-6 justify-center">
              {yearGrids.map((gridData) => renderGrid(gridData))}
            </div>
          </div>
        )}
      </div>

      <GridAnalysisModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        selectedYear={selectedYear}
        selectedGridNumbers={selectedGridNumbers}
      />
    </div>
  );
};

export default AntarDashaGrid;
