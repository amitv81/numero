import Modal from "./Modal";

const GridAnalysisModal = ({
  isOpen,
  onClose,
  selectedYear,
  selectedGridNumbers,
}) => {
  return (
    <Modal
      isOpen={isOpen}
      onClose={onClose}
      title={`Grid Analysis for Year ${selectedYear}`}
    >
      <div className="space-y-6">
        {/* Dasha and Antardasha Section */}
        <div>
          <p className="text-lg text-purple-800 mb-2">
            Dasha(D) & Antar Dasha(AD):
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedGridNumbers.specialNumbers?.map((num, index) => {
              const isAntarDasha = num.toString().startsWith("AD:");
              return (
                <span
                  key={index}
                  className={`px-4 py-2 rounded-full font-medium ${
                    isAntarDasha
                      ? "bg-orange-100 text-orange-800"
                      : "bg-red-100 text-red-800"
                  }`}
                >
                  {num}
                </span>
              );
            })}
          </div>
        </div>
        {/* Positive Numbers Section */}
        <div>
          <p className="text-lg text-purple-800 mb-2">
            Positive Numbers in Grid:
          </p>
          <div className="flex flex-wrap gap-2">
            {selectedGridNumbers.regularNumbers?.map((num, index) => (
              <span
                key={index}
                className="px-4 py-2 rounded-full font-medium bg-purple-100 text-purple-800"
              >
                {num}
              </span>
            ))}
          </div>
        </div>

        {/* Negative Numbers Section */}
        <div>
          <p className="text-lg text-red-800 mb-2">Negative Numbers in Grid:</p>
          <div className="flex flex-col gap-4">
            <div className="flex flex-wrap gap-2">
              {selectedGridNumbers.negativeNumbers?.map((num, index) => (
                <span
                  key={index}
                  className="px-4 py-2 rounded-full font-medium bg-red-100 text-red-800"
                >
                  {num}
                </span>
              ))}
            </div>
            {selectedGridNumbers.negativeNumbers?.map(
              (num) =>
                selectedGridNumbers.negativityInfo[num] && (
                  <div key={num} className="bg-red-50 p-4 rounded-lg">
                    <p className="font-medium text-red-800 mb-2">
                      Number {num} Negativity:
                    </p>
                    {/* Negativity List */}{" "}
                    <ul className="list-disc list-inside space-y-1">
                      {selectedGridNumbers.negativityInfo[num].map(
                        (info, idx) => (
                          <li key={idx} className="text-red-700">
                            {info}
                          </li>
                        )
                      )}
                    </ul>
                    {/* Remedies Section */}
                    {selectedGridNumbers.remediesInfo &&
                      selectedGridNumbers.remediesInfo[num] && (
                        <div className="mt-4 border-t border-red-200 pt-4">
                          <p className="font-medium text-red-800 mb-2">
                            Remedies:
                          </p>
                          <div className="space-y-3">
                            {selectedGridNumbers.remediesInfo[num]
                              .gemstones && (
                              <div>
                                <p className="text-red-700 font-medium text-sm">
                                  Gemstones:
                                </p>
                                <div className="flex flex-wrap gap-2 mt-1">
                                  {selectedGridNumbers.remediesInfo[
                                    num
                                  ].gemstones.map((gem, idx) => (
                                    <span
                                      key={idx}
                                      className="px-3 py-1 rounded-full text-sm bg-red-50 text-red-700"
                                    >
                                      {gem}
                                    </span>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedGridNumbers.remediesInfo[num]
                              .activities && (
                              <div>
                                <p className="text-red-700 font-medium text-sm">
                                  Activities:
                                </p>
                                <ul className="list-disc list-inside space-y-1">
                                  {selectedGridNumbers.remediesInfo[
                                    num
                                  ].activities.map((activity, idx) => (
                                    <li
                                      key={idx}
                                      className="text-red-700 text-sm"
                                    >
                                      {activity}
                                    </li>
                                  ))}
                                </ul>
                              </div>
                            )}
                            {selectedGridNumbers.remediesInfo[num].mantras && (
                              <div>
                                <p className="text-red-700 font-medium text-sm">
                                  Mantras:
                                </p>
                                <div className="space-y-1 mt-1">
                                  {selectedGridNumbers.remediesInfo[
                                    num
                                  ].mantras.map((mantra, idx) => (
                                    <p
                                      key={idx}
                                      className="px-3 py-2 rounded-lg text-sm bg-red-50 text-red-700"
                                    >
                                      {mantra}
                                    </p>
                                  ))}
                                </div>
                              </div>
                            )}
                            {selectedGridNumbers.remediesInfo[num]
                              .fastingDay && (
                              <div>
                                <p className="text-red-700 font-medium text-sm">
                                  Fasting Day:
                                </p>
                                <p className="text-red-700 text-sm ml-2">
                                  {
                                    selectedGridNumbers.remediesInfo[num]
                                      .fastingDay
                                  }
                                </p>
                              </div>
                            )}
                            {selectedGridNumbers.remediesInfo[num]
                              .direction && (
                              <div>
                                <p className="text-red-700 font-medium text-sm">
                                  Direction:
                                </p>
                                <p className="text-red-700 text-sm ml-2">
                                  {
                                    selectedGridNumbers.remediesInfo[num]
                                      .direction
                                  }
                                </p>
                              </div>
                            )}
                          </div>
                        </div>
                      )}
                  </div>
                )
            )}
          </div>
        </div>
        {/* Yog Predictions Section */}
        {selectedGridNumbers.yogs?.length > 0 && (
          <div className="bg-purple-50 p-4 rounded-lg mb-4">
            <h4 className="font-semibold text-purple-700 mb-2">Active Yogs</h4>
            <div className="space-y-4">
              {selectedGridNumbers.yogs.map((yog, index) => (
                <div
                  key={index}
                  className="border-b border-purple-200 pb-3 last:border-0"
                >
                  <h5 className="font-medium text-purple-600 mb-2">
                    {yog.name}
                  </h5>
                  <ul className="list-disc list-inside space-y-1 text-gray-700 text-sm pl-2">
                    {yog.description.map((point, idx) => (
                      <li key={idx}>{point}</li>
                    ))}
                  </ul>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Finance Predictions Section */}
        {selectedGridNumbers.predictions?.finance?.length > 0 && (
          <div>
            <p className="text-lg text-green-800 mb-2">
              Financial Predictions:
            </p>
            <div className="space-y-2">
              {selectedGridNumbers.predictions.finance.map(
                (prediction, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      prediction.type === "positive"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    <p className="font-medium">{prediction.message}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}

        {/* Property Predictions Section */}
        {selectedGridNumbers.predictions?.property?.length > 0 && (
          <div>
            <p className="text-lg text-green-800 mb-2">Property Predictions:</p>
            <div className="space-y-2">
              {selectedGridNumbers.predictions.property.map(
                (prediction, idx) => (
                  <div
                    key={idx}
                    className={`p-4 rounded-lg ${
                      prediction.type === "positive"
                        ? "bg-green-50 text-green-800"
                        : "bg-red-50 text-red-800"
                    }`}
                  >
                    <p className="font-medium">{prediction.message}</p>
                  </div>
                )
              )}
            </div>
          </div>
        )}
      </div>
    </Modal>
  );
};

export default GridAnalysisModal;
