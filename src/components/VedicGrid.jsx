const VedicGrid = ({ selectedDate, vedicGrid, vedicOrder }) => {
  // Get occurrences of a number in the grid
  const getNumberOccurrences = (numbers) => {
    return numbers.length > 0 ? numbers.join(", ") : "-";
  };

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
                  className="bg-purple-50 border border-purple-200 rounded p-4 flex flex-col items-center justify-center relative"
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
    </div>
  );
};

export default VedicGrid;