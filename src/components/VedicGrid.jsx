import { useState } from "react";
import Modal from "./Modal";
import numerologyData from "../data/numerologyData.json";
import { calculateYogs } from "../utils/yogCalculations";

const VedicGrid = ({ vedicGrid, vedicOrder, currentDasha, antarDashaSum }) => {
  const [modalData, setModalData] = useState(null);

  // Get all numbers present in the grid including dasha and antardasha
  const getAllGridNumbers = () => {
    const numbers = vedicGrid.flat();
    if (currentDasha) numbers.push(currentDasha);
    if (antarDashaSum) numbers.push(antarDashaSum);
    return numbers;
  };

  // Get occurrences of a number in the grid
  const getNumberOccurrences = (numbers, index) => {
    const baseNumber = numbers.length > 0 ? numbers.join(", ") : "-";
    const isDashaNumber = currentDasha && vedicOrder[index] === currentDasha;
    const gridNumber = vedicOrder[index];
    const isAntarDashaSum = antarDashaSum === gridNumber;

    return (
      <>
        <span className="text-lg lg:text-3xl font-bold text-purple-800">
          {baseNumber}{" "}
          {isDashaNumber && (
            <span className="text-red-600">{currentDasha}</span>
          )}
          {isAntarDashaSum && (
            <span className="text-orange-500">{antarDashaSum}</span>
          )}
        </span>
      </>
    );
  };

  const handleNumberClick = (number) => {
    const numberData = numerologyData.numbers[number];
    if (numberData) {
      setModalData({
        title: `Number ${number} - ${numberData.planet}`,
        data: numberData,
      });
    }
  };

  const RemediesContent = ({ data }) => {
    const yogs = calculateYogs(getAllGridNumbers());

    return (
      <div className="space-y-6 text-left">
        {yogs.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-purple-700 mb-2">Active Yogs</h4>
            <div className="space-y-3">
              {yogs.map((yog, index) => (
                <div
                  key={index}
                  className="border-b border-purple-200 pb-2 last:border-0"
                >
                  <h5 className="font-medium text-purple-600">{yog.name}</h5>
                  <p className="text-gray-700 text-sm">{yog.description}</p>
                </div>
              ))}
            </div>
          </div>
        )}

        <div>
          <h4 className="font-semibold text-purple-700 mb-2">Description</h4>
          <p className="text-gray-700">{data.description}</p>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">
              Lucky Numbers
            </h4>
            <p className="text-gray-700">{data.luckyNumbers.join(", ")}</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">
              Enemy Numbers
            </h4>
            <p className="text-gray-700">{data.enemyNumbers.join(", ")}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-purple-700 mb-2">
            Recommended Gemstones
          </h4>
          <p className="text-gray-700">{data.remedies.gemstones.join(", ")}</p>
        </div>

        <div>
          <h4 className="font-semibold text-purple-700 mb-2">Activities</h4>
          <ul className="list-disc ml-4 text-gray-700 space-y-1">
            {data.remedies.activities.map((activity, index) => (
              <li key={index}>{activity}</li>
            ))}
          </ul>
        </div>

        <div>
          <h4 className="font-semibold text-purple-700 mb-2">Mantras</h4>
          <ul className="list-disc ml-4 text-gray-700 space-y-1">
            {data.remedies.mantras.map((mantra, index) => (
              <li key={index}>{mantra}</li>
            ))}
          </ul>
        </div>

        <div className="grid grid-cols-2 gap-4">
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Fasting Day</h4>
            <p className="text-gray-700">{data.remedies.fastingDay}</p>
          </div>
          <div>
            <h4 className="font-semibold text-purple-700 mb-2">Direction</h4>
            <p className="text-gray-700">{data.remedies.direction}</p>
          </div>
        </div>

        <div>
          <h4 className="font-semibold text-purple-700 mb-2">
            Favorable Colors
          </h4>
          <p className="text-gray-700">{data.remedies.colors.join(", ")}</p>
        </div>
      </div>
    );
  };

  return (
    <div className="w-full">
      <div className="bg-white rounded-lg shadow-lg p-5">
        <h2 className="text-2xl font-semibold mb-8 text-center text-purple-800">
          Your Vedic Numerology Grid
        </h2>
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="w-full lg:w-7/12">
            <div>
              <div className="border-2 border-purple-300 p-2 rounded-lg bg-purple-50/30">
                <div className="flex flex-wrap h-full">
                  {vedicGrid.map((numbers, index) => (
                    <div key={index} className="w-1/3 p-2">
                      <div
                        className={`h-full bg-white border-2 rounded-lg p-6 flex flex-col items-center justify-center relative cursor-pointer hover:bg-purple-50 transition-colors shadow-sm hover:shadow-md ${
                          currentDasha && vedicOrder[index] === currentDasha
                            ? "border-purple-500"
                            : "border-purple-200"
                        }`}
                        onClick={() => handleNumberClick(vedicOrder[index])}
                      >
                        <span className="absolute top-3 left-3 text-base font-medium text-purple-600">
                          {vedicOrder[index]}
                        </span>
                        {getNumberOccurrences(numbers, index)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
          <div className="w-full lg:w-5/12">
            <div className="w-full space-y-6 bg-purple-50 p-6 rounded-lg">
              <h3 className="text-xl font-semibold text-purple-800">
                Grid Planes
              </h3>
              <div className="space-y-4">
                <div>
                  <h4 className="font-medium text-purple-700">
                    Mental/Practical/Fire Plane (Top Row)
                  </h4>
                  <p className="text-gray-600">
                    {numerologyData.gridPositions.topRow.meaning}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-700">
                    Materialistic/Air Plane (Middle Row)
                  </h4>
                  <p className="text-gray-600">
                    {numerologyData.gridPositions.middleRow.meaning}
                  </p>
                </div>
                <div>
                  <h4 className="font-medium text-purple-700">
                    Emotional/Water Plane (Bottom Row)
                  </h4>
                  <p className="text-gray-600">
                    {numerologyData.gridPositions.bottomRow.meaning}
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <Modal
        isOpen={modalData !== null}
        onClose={() => setModalData(null)}
        title={modalData?.title || ""}
      >
        {modalData && <RemediesContent data={modalData.data} />}
      </Modal>
    </div>
  );
};

export default VedicGrid;
