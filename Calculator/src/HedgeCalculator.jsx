import { useState } from "react";

const HedgeCalculator = () => {
  const [calculatedStake2, setCalculatedStake2] = useState(null);
  const [scenario1Profit, setScenario1Profit] = useState(null);
  const [scenario2Profit, setScenario2Profit] = useState(null);
  const [newOdds1, setNewOdds1] = useState("");
  const [newOdds2, setNewOdds2] = useState("");
  const [newStake1, setNewStake1] = useState(50);

  const calculateOptimalStake2 = () => {
    const stake1Value = Number(newStake1);

    const stake2 = (stake1Value * newOdds1) / newOdds2;
    const totalStake = stake1Value + stake2;

    const profitScenario1 = stake1Value * newOdds1 - totalStake;
    const profitScenario2 = stake2 * newOdds2 - totalStake;

    setCalculatedStake2(stake2.toFixed(2));
    setScenario1Profit(profitScenario1.toFixed(2));
    setScenario2Profit(profitScenario2.toFixed(2));
  };
  return (
    <>
      <div className="max-w-3xl mx-auto mt-8 p-6 bg-white rounded-xl shadow-md border border-gray-200">
        <h3 className="text-xl font-semibold mb-6 text-gray-800">
          Hedge Calculator
        </h3>
        <div className="space-y-4">
          <div className="grid md:grid-cols-2 gap-4">
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Odds 1
                </label>
                <input
                  type="number"
                  value={newOdds1}
                  onChange={(e) => setNewOdds1(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter first odds"
                />
              </div>
              <div>
                <label className="block text-gray-700 text-sm font-medium mb-2">
                  Stake 1 ($)
                </label>
                <input
                  type="number"
                  value={newStake1}
                  onChange={(e) => setNewStake1(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                  placeholder="Enter stake amount"
                />
              </div>
            </div>
            <div>
              <label className="block text-gray-700 text-sm font-medium mb-2">
                Odds 2
              </label>
              <input
                type="number"
                value={newOdds2}
                onChange={(e) => setNewOdds2(e.target.value)}
                className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                placeholder="Enter second odds"
              />
            </div>
          </div>
          <div>
            <button
              onClick={calculateOptimalStake2}
              className="w-full px-4 py-2 bg-blue-500 text-white font-medium rounded-lg hover:bg-blue-600 transition-colors"
            >
              Calculate Hedge
            </button>
          </div>
        </div>

        {calculatedStake2 !== null && (
          <div className="mt-6 space-y-4">
            <div className="grid md:grid-cols-2 gap-4">
              <div className="p-4 bg-blue-50 rounded-lg">
                <p className="text-sm text-blue-600 mb-1">Required Stake 2</p>
                <p className="text-2xl font-bold text-gray-900">
                  ${calculatedStake2}
                </p>
                <div className="mt-2 text-xs text-gray-600">
                  <p>Odds 1: {newOdds1}</p>
                  <p>Odds 2: {newOdds2}</p>
                  <p>
                    Total Stake: $
                    {(Number(newStake1) + Number(calculatedStake2)).toFixed(2)}
                  </p>
                </div>
              </div>
              <div className="p-4 bg-green-50 rounded-lg">
                <p className="text-sm text-green-600 mb-1">Profit Scenarios</p>
                <div className="space-y-2">
                  <div>
                    <p className="text-sm">If Odds 1 wins:</p>
                    <p className="font-bold text-green-600">
                      ${scenario1Profit}
                    </p>
                    <p className="text-xs text-gray-600">
                      (${newStake1} × {newOdds1} - total stake)
                    </p>
                  </div>
                  <div>
                    <p className="text-sm">If Odds 2 wins:</p>
                    <p className="font-bold text-green-600">
                      ${scenario2Profit}
                    </p>
                    <p className="text-xs text-gray-600">
                      (${calculatedStake2} × {newOdds2} - total stake)
                    </p>
                  </div>
                </div>
              </div>
            </div>
            <p className="text-sm text-gray-500">
              This calculation shows the required stake for the second bet and
              the resulting profit for each scenario. The total investment
              required is $ hah
              {(Number(newStake1) + Number(calculatedStake2)).toFixed(2)}.
            </p>
          </div>
        )}
      </div>
    </>
  );
};

export default HedgeCalculator;
