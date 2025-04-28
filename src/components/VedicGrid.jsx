import { useState } from "react";
import Modal from "./Modal";
import numerologyData from "../data/numerologyData.json";

const VedicGrid = ({ selectedDate, vedicGrid, vedicOrder }) => {
  const [modalData, setModalData] = useState(null);

  // Get occurrences of a number in the grid
  const getNumberOccurrences = (numbers) => {
    return numbers.length > 0 ? numbers.join(", ") : "-";
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

  const RemediesContent = ({ data }) => (
    <div className="space-y-6 text-left">
      <div>
        <h4 className="font-semibold text-purple-700 mb-2">Description</h4>
        <p className="text-gray-700">{data.description}</p>
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
        <h4 className="font-semibold text-purple-700 mb-2">Favorable Colors</h4>
        <p className="text-gray-700">{data.remedies.colors.join(", ")}</p>
      </div>
    </div>
  );

  return (
    <div className="lg:col-span-8">
      {selectedDate && (
        <div className="bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-semibold mb-4 text-center text-purple-800">
            Vedic Numerology Grid
          </h2>
          <div className="aspect-square max-w-3xl mx-auto">
            <div className="grid grid-cols-3 gap-1 h-full border-2 border-purple-300 p-1">
              {vedicGrid.map((numbers, index) => (
                <div
                  key={index}
                  className="bg-purple-50 border border-purple-200 rounded p-4 flex flex-col items-center justify-center relative cursor-pointer hover:bg-purple-100 transition-colors"
                  onClick={() => handleNumberClick(vedicOrder[index])}
                >
                  <span className="absolute top-1 left-1 text-xs text-purple-400">
                    {vedicOrder[index]}
                  </span>
                  <span className="text-xl font-semibold text-purple-800">
                    {getNumberOccurrences(numbers)}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

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
