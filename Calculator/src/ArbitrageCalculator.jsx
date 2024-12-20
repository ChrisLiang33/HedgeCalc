import React, { useState } from "react";

const ArbitrageCalculator = () => {
  const [odds1, setOdds1] = useState("");
  const [odds2, setOdds2] = useState("");
  const [targetWin, setTargetWin] = useState(20);
  const [isArb, setIsArbitrage] = useState(false);

  const checkArb = () => {
    const arbPercentage = 1 / odds1 + 1 / odds2;
    const isArb = arbPercentage < 1;
    setIsArbitrage(isArb);
  };
  const ArbCalc = () => {
    const d1 = odds1 - 1;
    const d2 = odds2 - 1;

    const det = d1 * d2 - 1;
    const stake1 = (targetWin * (1 + d2)) / det;
    const stake2 = (targetWin * (1 + d1)) / det;

    return {
      stake1: stake1.toFixed(2),
      stake2: stake2.toFixed(2),
      totalStake: (stake1 + stake2).toFixed(2),
      netProfit: targetWin,
    };
  };
  const reset = () => {
    setOdds1("");
    setOdds2("");
    setIsArbitrage(false);
  };

  return (
    <>
      <div className="max-w-3xl mx-auto space-y-8 mb-12">
        <div className="grid md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <label className="block">
              <span className="text-lg text-gray-700 font-medium block mb-3">
                Odds 1
              </span>
              <input
                type="number"
                value={odds1}
                onChange={(e) => setOdds1(e.target.value)}
                className="w-full px-6 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                placeholder="Enter first odds"
              />
              <div className="flex gap-2 mt-2">
                {[2.2, 2.25, 2.3, 2.35, 2.4].map((odds) => (
                  <button
                    key={odds}
                    onClick={() => setOdds1(odds)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {odds}
                  </button>
                ))}
              </div>
            </label>
          </div>

          <div className="space-y-6">
            <label className="block">
              <span className="text-lg text-gray-700 font-medium block mb-3">
                Odds 2
              </span>
              <input
                type="number"
                value={odds2}
                onChange={(e) => setOdds2(e.target.value)}
                className="w-full px-6 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                placeholder="Enter second odds"
              />
              <div className="flex gap-2 mt-2">
                {[1.7, 1.8, 1.88, 1.95, 2].map((odds) => (
                  <button
                    key={odds}
                    onClick={() => setOdds2(odds)}
                    className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded-lg transition-colors"
                  >
                    {odds}
                  </button>
                ))}
              </div>

              <label className="block">
                <span className="text-lg text-gray-700 font-medium block mb-3">
                  Target Win Amount
                </span>
                <input
                  type="number"
                  value={targetWin}
                  onChange={(e) => setTargetWin(e.target.value)}
                  className="w-full px-6 py-3 bg-gray-50 border border-gray-300 rounded-xl focus:ring-2 focus:ring-blue-500 focus:border-blue-500 outline-none transition-all text-lg"
                  placeholder="Enter target profit"
                />
              </label>
            </label>
            <button
              onClick={() => reset()}
              className="px-4 py-2 bg-gray-500 text-white text-sm font-medium rounded-lg hover:bg-gray-600 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 shadow-md"
            >
              Reset
            </button>
          </div>
        </div>
        <div className="flex justify-center pt-4">
          <button
            onClick={checkArb}
            className="px-12 py-4 bg-yellow-500 text-white text-lg font-semibold rounded-xl hover:bg-yellow-600 transform transition-all duration-200 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-yellow-500 focus:ring-offset-2 shadow-lg"
          >
            Calculate Arbitrage
          </button>
        </div>
        {/* Results Section */}
        {targetWin && isArb && (
          <div className="mb-12 p-8 bg-green-50 rounded-xl border border-green-200 max-w-3xl mx-auto">
            <h3 className="text-2xl font-semibold mb-6 text-green-800">
              Target Profit Calculation
            </h3>
            {(() => {
              const result = ArbCalc();
              return (
                <div className="grid md:grid-cols-2 gap-8 text-gray-700">
                  <div className="space-y-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <div className="space-y-4">
                      <h4 className="text-lg font-semibold text-gray-900 mb-4">
                        Bet Details
                      </h4>

                      <div className="flex items-center justify-between p-4 bg-blue-50 rounded-lg">
                        <div>
                          <span className="text-blue-600 text-xl font-bold">
                            {odds1}
                          </span>
                          <p className="text-sm text-blue-600 mt-1">Odds 1</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            ${result.stake1}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Win: ${((odds1 - 1) * result.stake1).toFixed(2)}
                          </p>
                        </div>
                      </div>

                      <div className="flex items-center justify-between p-4 bg-red-50 rounded-lg">
                        <div>
                          <span className="text-red-600 text-xl font-bold">
                            {odds2}
                          </span>
                          <p className="text-sm text-red-600 mt-1">Odds 2</p>
                        </div>
                        <div className="text-right">
                          <span className="text-2xl font-bold text-gray-900">
                            ${result.stake2}
                          </span>
                          <p className="text-sm text-gray-600 mt-1">
                            Win: ${((odds2 - 1) * result.stake2).toFixed(2)}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="space-y-6 bg-white rounded-xl p-6 shadow-md border border-gray-100">
                    <h4 className="text-lg font-semibold text-gray-900 mb-4">
                      Summary
                    </h4>

                    <div className="space-y-4">
                      <div className="flex justify-between items-center p-4 bg-gray-50 rounded-lg">
                        <span className="text-gray-600 font-medium">
                          Total Stake
                        </span>
                        <span className="text-xl font-bold text-gray-900">
                          ${result.totalStake}
                        </span>
                      </div>

                      <div className="flex justify-between items-center p-4 bg-green-50 rounded-lg">
                        <span className="text-green-600 font-medium">
                          Guaranteed Profit
                        </span>
                        <span className="text-2xl font-bold text-green-600">
                          ${result.netProfit}
                        </span>
                      </div>

                      <div className="text-sm text-gray-500 mt-4">
                        <p className="flex items-center">
                          <svg
                            className="w-4 h-4 mr-2"
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path
                              fillRule="evenodd"
                              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z"
                              clipRule="evenodd"
                            />
                          </svg>
                          Profit is guaranteed regardless of outcome
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              );
            })()}
          </div>
        )}
      </div>
    </>
  );
};

export default ArbitrageCalculator;
