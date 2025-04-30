import React from "react";

const DashaNumbers = ({ dashaNumbers }) => {
  if (dashaNumbers.length === 0) return null;

  return (
    <div className="w-full mt-8">
      <div className="bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-semibold mb-6 text-center text-purple-800">
          Your Dasha Numbers Timeline
        </h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {dashaNumbers
            .filter(
              (dasha, index, self) =>
                index === 0 || self[index - 1].dashaNumber !== dasha.dashaNumber
            )
            .map((dasha, index) => {
              const endYear = dasha.year + dasha.dashaNumber - 1;
              return (
                <div
                  key={index}
                  className={`p-4 rounded-lg border-2 ${
                    new Date().getFullYear() >= dasha.year &&
                    new Date().getFullYear() <= endYear
                      ? "border-purple-500 bg-purple-50"
                      : "border-purple-200"
                  }`}
                >
                  <p className="text-lg font-semibold text-purple-800">
                    From: {dasha.year} - {endYear}
                  </p>
                  <p className="text-xl font-bold text-purple-600">
                    Dasha: {dasha.dashaNumber}
                  </p>
                </div>
              );
            })}
        </div>
      </div>
    </div>
  );
};

export default DashaNumbers;
