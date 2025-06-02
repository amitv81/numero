import { useState } from "react";
import VedicGrid from "./VedicGrid";
import DashaNumbers from "./DashaNumbers";
import AntarDashaGrid from "./AntarDashaGrid";
import BirthNumberModal from "./BirthNumberModal";
import {
  calculateNameNumbers,
  calculateSingleDigit,
  calculateVedicGrid,
  isEnemyNumber,
  isPositiveNumber,
  calculateDashaNumbers,
  calculateAntarDashaNumber,
} from "../utils/numerologyCalculations";

const NumerologyCalculator = () => {
  const [selectedDate, setSelectedDate] = useState(null);
  const [numerologyResult, setNumerologyResult] = useState(null);
  const [vedicGrid, setVedicGrid] = useState(Array(9).fill([]));
  const [name, setName] = useState("");
  const [singleDigitNameNumber, setSingleDigitNameNumber] = useState(null);
  const [dashaNumbers, setDashaNumbers] = useState([]);
  const [showDasha, setShowDasha] = useState(false);
  const [antarDashaSum, setAntarDashaSum] = useState(null);
  const [showBirthNumberModal, setShowBirthNumberModal] = useState(false);
  const [selectedNumberType, setSelectedNumberType] = useState("birth"); // can be "birth" or "destiny"

  // Updated Vedic grid order: 3-1-9, 6-7-5, 2-8-4
  const vedicOrder = [3, 1, 9, 6, 7, 5, 2, 8, 4];

  const handleNameChange = (event) => {
    const newName = event.target.value;
    setName(newName);
    const { fullNameNumber, firstNameNumber } = calculateNameNumbers(newName);
    setNumerologyResult((prev) => ({
      ...prev,
      nameNumber: fullNameNumber,
      firstNameNumber: firstNameNumber,
    }));

    setSingleDigitNameNumber(calculateSingleDigit(fullNameNumber));
  };

  const handleDateChange = (date) => {
    setSelectedDate(date);
    const result = calculateVedicGrid(date, vedicOrder, name);
    setVedicGrid(result.newGrid);
    setNumerologyResult((prev) => ({
      ...prev,
      destinyNumber: result.destinyNumber,
      birthNumber: result.birthNumber,
      nameNumber: result.nameNumber,
    }));

    // Calculate dasha numbers when date changes
    if (date && result.birthNumber) {
      const dashas = calculateDashaNumbers(
        date.getFullYear(),
        result.birthNumber
      );
      setDashaNumbers(dashas);

      // Calculate Antar Dasha numbers for current year while preserving birth month and day
      const currentYear = new Date().getFullYear();
      const currentDate = new Date(date);
      currentDate.setFullYear(currentYear);
      const antarDashaResult = calculateAntarDashaNumber(currentDate);
      setAntarDashaSum(antarDashaResult?.antarDashaNumber || null);
    }
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
              </div>{" "}
              {/* Date Input */}
              <div className="flex-1">
                <div className="relative">
                  <input
                    type="date"
                    value={
                      selectedDate
                        ? selectedDate.toISOString().split("T")[0]
                        : ""
                    }
                    onChange={(e) => {
                      const date = new Date(e.target.value);
                      date.setHours(12); // Set to noon to avoid timezone issues
                      handleDateChange(date);
                    }}
                    className="w-full p-4 text-lg text-center border border-purple-300 rounded focus:outline-none focus:border-purple-500"
                  />
                </div>
              </div>
            </div>
          </div>

          {numerologyResult && (
            <div className="w-full mt-8">
              <div className="flex flex-col lg:flex-row justify-center gap-4 lg:gap-8">
                {/* Birth Number Box */}
                <div
                  className="flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => {
                    setSelectedNumberType("birth");
                    setShowBirthNumberModal(true);
                  }}
                >
                  <p className="text-lg text-purple-600 mb-2">Birth Number</p>
                  <p className="text-4xl font-bold text-purple-900">
                    {numerologyResult.birthNumber}
                  </p>
                </div>
                {/* Destiny Number Box */}{" "}
                <div
                  className="flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 border-purple-200 cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => {
                    setSelectedNumberType("destiny");
                    setShowBirthNumberModal(true);
                  }}
                >
                  <p className="text-lg text-purple-600 mb-2">Destiny Number</p>
                  <p className="text-4xl font-bold text-purple-900">
                    {numerologyResult.destinyNumber}
                  </p>
                </div>
                <div
                  className={`flex-1 max-w-sm bg-purple-50 p-6 rounded-lg flex flex-col items-center justify-center border-2 ${
                    isEnemyNumber(
                      singleDigitNameNumber,
                      numerologyResult.birthNumber,
                      numerologyResult.destinyNumber
                    )
                      ? "border-red-500"
                      : numerologyResult.firstNameNumber &&
                        numerologyResult.nameNumber &&
                        isPositiveNumber(numerologyResult.firstNameNumber) &&
                        isPositiveNumber(numerologyResult.nameNumber)
                      ? "border-green-500 bg-green-100"
                      : "border-purple-200"
                  }`}
                >
                  <p className="text-lg text-purple-600 mb-2">Name Number</p>
                  <div className="text-center">
                    <p
                      className={`text-4xl font-bold ${
                        numerologyResult.nameNumber
                          ? isPositiveNumber(numerologyResult.nameNumber)
                            ? "text-green-600"
                            : "text-red-600"
                          : "text-purple-900"
                      }`}
                    >
                      {numerologyResult.nameNumber || "-"}
                    </p>
                    <div className="space-y-1 mt-1">
                      <p
                        className={`text-sm ${
                          numerologyResult.firstNameNumber
                            ? isPositiveNumber(numerologyResult.firstNameNumber)
                              ? "text-green-600"
                              : "text-red-600"
                            : "text-purple-600"
                        }`}
                      >
                        {name.trim().split(" ")[0] || "First Name"}:{" "}
                        {numerologyResult.firstNameNumber || "-"}
                        {numerologyResult.firstNameNumber && (
                          <img
                            src={
                              isPositiveNumber(numerologyResult.firstNameNumber)
                                ? "/pass.svg"
                                : "/cross.svg"
                            }
                            alt={
                              isPositiveNumber(numerologyResult.firstNameNumber)
                                ? "Positive"
                                : "Negative"
                            }
                            className="inline-block ml-1 w-4 h-4"
                          />
                        )}
                      </p>
                      <p
                        className={`text-sm ${
                          numerologyResult.nameNumber
                            ? isPositiveNumber(numerologyResult.nameNumber)
                              ? "text-green-600"
                              : "text-red-600"
                            : "text-purple-600"
                        }`}
                      >
                        {name || "Enter Full Name"}:{" "}
                        {numerologyResult.nameNumber || "-"}
                        {numerologyResult.nameNumber && (
                          <img
                            src={
                              isPositiveNumber(numerologyResult.nameNumber)
                                ? "/pass.svg"
                                : "/cross.svg"
                            }
                            alt={
                              isPositiveNumber(numerologyResult.nameNumber)
                                ? "Positive"
                                : "Negative"
                            }
                            className="inline-block ml-1 w-4 h-4"
                          />
                        )}
                      </p>
                      {numerologyResult.firstNameNumber &&
                        numerologyResult.nameNumber && (
                          <p
                            className={`text-sm mt-2 font-medium ${
                              isPositiveNumber(
                                numerologyResult.firstNameNumber
                              ) && isPositiveNumber(numerologyResult.nameNumber)
                                ? "text-green-600"
                                : isPositiveNumber(
                                    numerologyResult.firstNameNumber
                                  )
                                ? "text-yellow-600"
                                : "text-red-600"
                            }`}
                          >
                            {isPositiveNumber(
                              numerologyResult.firstNameNumber
                            ) && isPositiveNumber(numerologyResult.nameNumber)
                              ? "Congratulations! Your first name & full name is compatible with your birth and destiny number"
                              : isPositiveNumber(
                                  numerologyResult.firstNameNumber
                                )
                              ? "Your first name is compatible with your birth and destiny number but your full name is not"
                              : "Your name is not compatible with your birth and destiny number"}
                          </p>
                        )}
                      <p
                        className={`text-sm hidden ${
                          isEnemyNumber(
                            singleDigitNameNumber,
                            numerologyResult.birthNumber,
                            numerologyResult.destinyNumber
                          )
                            ? "text-red-600 font-semibold"
                            : "text-purple-600"
                        }`}
                      >
                        Single Digit: {singleDigitNameNumber || "-"}
                        {isEnemyNumber(
                          singleDigitNameNumber,
                          numerologyResult.birthNumber,
                          numerologyResult.destinyNumber
                        ) && " (Enemy Number)"}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
      <div className="w-full flex justify-center mb-4">
        <button
          onClick={() => setShowDasha(!showDasha)}
          className="px-6 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors"
        >
          {showDasha ? "Hide Dasha(s)" : "Show Dasha(s)"}
        </button>
      </div>
      {showDasha && <DashaNumbers dashaNumbers={dashaNumbers} />}
      {/* Vedic Grid Section */}
      {selectedDate && (
        <>
          <div className="w-full">
            <VedicGrid
              vedicGrid={vedicGrid}
              vedicOrder={vedicOrder}
              currentDasha={
                dashaNumbers.find((d) => d.year === new Date().getFullYear())
                  ?.dashaNumber
              }
              antarDashaSum={antarDashaSum}
            />
          </div>
          <AntarDashaGrid birthDate={selectedDate} />
        </>
      )}
      {/* Birth Number Modal */}{" "}
      <BirthNumberModal
        isOpen={showBirthNumberModal}
        onClose={() => setShowBirthNumberModal(false)}
        birthNumber={
          selectedNumberType === "birth"
            ? numerologyResult?.birthNumber
            : numerologyResult?.destinyNumber
        }
        numberType={selectedNumberType}
      />
    </div>
  );
};

export default NumerologyCalculator;
