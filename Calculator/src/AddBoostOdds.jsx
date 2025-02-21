import React, { useState } from "react";

const AddBoostOdds = () => {
  const [odds1, setOdds1] = useState(0);
  const [odds2, setOdds2] = useState(-110);
  const [realOdds, setRealOdds] = useState(0);

  const calculateStakes = () => {
    setOdds1(parseFloat(odds1));
    setOdds2(parseFloat(odds2));

    const first = (odds1 + 100) / 100;
    const second = first / (1 + 100 / Math.abs(odds2));

    setRealOdds(first - second - 1);
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        add boost calc
      </h1>
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Odds
              <input
                type="text"
                value={odds1}
                onChange={(e) => setOdds1(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              extra leg odds
              <input
                type="text"
                value={odds2}
                onChange={(e) => setOdds2(Number(e.target.value))}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>
          <button
            onClick={calculateStakes}
            className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
          >
            Calculate real odds
          </button>
        </div>
        {realOdds > 0 && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Results
            </h2>
            <div className="bg-green-50 p-3 rounded">
              <p className="font-medium text-green-800">Real Odds</p>
              <div className="text-sm text-green-700 flex justify-between mt-2">
                <span>American Odds:</span>
                <span>+{Math.round(realOdds * 100)}</span>
              </div>
              <div className="text-sm text-green-700 flex justify-between">
                <span>Decimal Odds:</span>
                <span>{(realOdds + 1).toFixed(3)}</span>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AddBoostOdds;
