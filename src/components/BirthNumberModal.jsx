import React, { useEffect, useState } from "react";
import Modal from "./Modal";

const BirthNumberModal = ({ isOpen, onClose, birthNumber }) => {
  const [birthNumberData, setBirthNumberData] = useState({
    qualities: [],
    negativeQualities: [],
    careers: [],
    luckyNumbers: [],
    neutralNumbers: [],
    enemyNumbers: [],
    colors: [],
    direction: "",
    mantras: [],
    provableHealthIssues: [],
  });

  useEffect(() => {
    if (isOpen && birthNumber) {
      import("../data/numerologyData.json").then((data) => {
        const numberData = data.numbers[birthNumber];
        if (numberData) {
          setBirthNumberData({
            qualities: numberData.qualities || [],
            negativeQualities: numberData.negativeQualities || [],
            careers: numberData.careers || [],
            luckyNumbers: numberData.luckyNumbers || [],
            neutralNumbers: numberData.neutralNumbers || [],
            enemyNumbers: numberData.enemyNumbers || [],
            colors: numberData.colors || [],
            direction: numberData.direction || "",
            mantras: numberData.remedies?.mantras || [],
            provableHealthIssues: numberData.provableHealthIssues || [],
          });
        }
      });
    }
  }, [isOpen, birthNumber]);

  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Birth Number ${birthNumber} Analysis`}
    >
      {" "}
      <div className="space-y-6">
        {/* Positive Qualities */}
        {birthNumberData.qualities.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">
              Basic Qualities
            </h4>
            <div className="flex flex-wrap gap-2">
              {birthNumberData.qualities.map((quality, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                >
                  {quality}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Negative Qualities */}
        {birthNumberData.negativeQualities &&
          birthNumberData.negativeQualities.length > 0 && (
            <div className="bg-red-50 p-4 rounded-lg">
              <h4 className="font-semibold text-red-800 mb-3">Challenges</h4>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.negativeQualities.map((quality, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700"
                  >
                    {quality}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Health Issues */}
        {birthNumberData.provableHealthIssues &&
          birthNumberData.provableHealthIssues.length > 0 && (
            <div className="bg-orange-50 p-4 rounded-lg">
              <h4 className="font-semibold text-orange-800 mb-3">
                Health Issues to Watch For
              </h4>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.provableHealthIssues.map((issue, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-orange-100 text-orange-700"
                  >
                    {issue}
                  </span>
                ))}
              </div>
            </div>
          )}

        {/* Suitable Professions */}
        {birthNumberData.careers.length > 0 && (
          <div className="bg-green-50 p-4 rounded-lg">
            <h4 className="font-semibold text-green-800 mb-3">
              Suitable Professions
            </h4>
            <div className="flex flex-wrap gap-2">
              {birthNumberData.careers.map((careers, idx) => (
                <span
                  key={idx}
                  className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                >
                  {careers}
                </span>
              ))}
            </div>
          </div>
        )}
        {/* Numerical Associations */}
        <div className="bg-blue-50 p-4 rounded-lg">
          <h4 className="font-semibold text-blue-800 mb-3">
            Number Associations
          </h4>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <p className="text-blue-700 font-medium mb-1">Lucky Numbers:</p>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.luckyNumbers.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-700"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-700 font-medium mb-1">Neutral Numbers:</p>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.neutralNumbers.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-700"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-blue-700 font-medium mb-1">Enemy Numbers:</p>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.enemyNumbers.map((num, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-700"
                  >
                    {num}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Colors and Direction */}
        <div className="bg-purple-50 p-4 rounded-lg">
          <h4 className="font-semibold text-purple-800 mb-3">Best Suites</h4>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <p className="text-purple-700 font-medium mb-1">Colors:</p>
              <div className="flex flex-wrap gap-2">
                {birthNumberData.colors.map((color, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700"
                  >
                    {color}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <p className="text-purple-700 font-medium mb-1">Direction:</p>
              <span className="px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-700">
                {birthNumberData.direction}
              </span>
            </div>
          </div>
        </div>

        {/* Mantras */}
        {birthNumberData.mantras.length > 0 && (
          <div className="bg-amber-50 p-4 rounded-lg">
            <h4 className="font-semibold text-amber-800 mb-3">Mantras</h4>
            <div className="space-y-2">
              {birthNumberData.mantras.map((mantra, idx) => (
                <p
                  key={idx}
                  className="px-3 py-2 rounded-lg text-sm font-medium bg-amber-100 text-amber-700"
                >
                  {mantra}
                </p>
              ))}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default BirthNumberModal;
