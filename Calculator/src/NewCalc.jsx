import React, { useState } from "react";

const NewCalc = () => {
  const [odds1, setOdds1] = useState(1.426); // Default odds1: -235
  const [odds2, setOdds2] = useState(2.05); // Default odds2: +105
  const [totalStake, setTotalStake] = useState(60); // Default total stake
  const [stake1, setStake1] = useState(0);
  const [stake2, setStake2] = useState(0);
  const [error, setError] = useState("");
  const [profit, setProfit] = useState(0);
  const [isDecimalOdds, setIsDecimalOdds] = useState(true);

  // Add new state for input values
  const [odds1Input, setOdds1Input] = useState(
    isDecimalOdds ? "1.426" : "-235"
  );
  const [odds2Input, setOdds2Input] = useState(isDecimalOdds ? "2.05" : "+105");

  // Add conversion functions
  const americanToDecimal = (american) => {
    if (!american) return 0;
    if (american > 0) {
      return american / 100 + 1;
    } else {
      return 100 / Math.abs(american) + 1;
    }
  };
  // test

  const decimalToAmerican = (decimal) => {
    if (!decimal || decimal <= 1) return 0;
    if (decimal >= 2) {
      return Math.round((decimal - 1) * 100);
    } else {
      return Math.round(-100 / (decimal - 1));
    }
  };

  const handleOdds1Change = (value) => {
    setOdds1Input(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setOdds1(isDecimalOdds ? numValue : americanToDecimal(numValue));
    }
  };

  const handleOdds2Change = (value) => {
    setOdds2Input(value);
    const numValue = parseFloat(value);
    if (!isNaN(numValue)) {
      setOdds2(isDecimalOdds ? numValue : americanToDecimal(numValue));
    }
  };

  // Update the toggle handler to convert the displayed values
  const handleOddsTypeToggle = (useDecimal) => {
    setIsDecimalOdds(useDecimal);
    if (useDecimal) {
      setOdds1Input(odds1.toFixed(3));
      setOdds2Input(odds2.toFixed(3));
    } else {
      setOdds1Input(decimalToAmerican(odds1).toString());
      setOdds2Input(decimalToAmerican(odds2).toString());
    }
  };

  const calculateStakes = () => {
    if (odds1 <= 1 || odds2 <= 1 || totalStake <= 0) {
      setError("Please enter valid odds and total stake.");
      return;
    }

    const stake1Amount = totalStake / odds1;
    const stake2Amount = totalStake - stake1Amount;

    setStake1(stake1Amount.toFixed(2));
    setStake2(stake2Amount.toFixed(2));

    // Calculate potential profit when winning by exactly 1 (push scenario)
    const potentialProfit = stake1Amount * odds1 - totalStake;
    setProfit(potentialProfit.toFixed(2));
  };

  return (
    <div className="max-w-2xl mx-auto p-6">
      <h1 className="text-3xl font-bold text-gray-800 text-center mb-8">
        Push Bet Calculator
      </h1>

      {error && (
        <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
          {error}
        </div>
      )}

      <div className="mb-6">
        <div className="flex justify-center space-x-4">
          <button
            onClick={() => handleOddsTypeToggle(true)}
            className={`px-4 py-2 rounded-md ${
              isDecimalOdds
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            Decimal Odds
          </button>
          <button
            onClick={() => handleOddsTypeToggle(false)}
            className={`px-4 py-2 rounded-md ${
              !isDecimalOdds
                ? "bg-blue-600 text-white"
                : "bg-gray-200 text-gray-700"
            }`}
          >
            American Odds
          </button>
        </div>
      </div>

      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Odds 1 (Moneyline)
              <input
                type="text"
                value={odds1Input}
                onChange={(e) => handleOdds1Change(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>

          <div className="space-y-2">
            <label className="block text-sm font-medium text-gray-700">
              Odds 2 (-1.5)
              <input
                type="text"
                value={odds2Input}
                onChange={(e) => handleOdds2Change(e.target.value)}
                className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
              />
            </label>
          </div>
        </div>

        <div className="space-y-2">
          <label className="block text-sm font-medium text-gray-700">
            Total Stake ($)
            <input
              type="number"
              min="0.01"
              step="0.01"
              value={totalStake}
              onChange={(e) => setTotalStake(parseFloat(e.target.value) || 0)}
              className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
            />
          </label>
        </div>

        <button
          onClick={calculateStakes}
          className="w-full bg-blue-600 text-white py-3 px-4 rounded-md hover:bg-blue-700 transition-colors duration-200 font-medium focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
        >
          Calculate Stakes
        </button>

        {(stake1 > 0 || stake2 > 0) && (
          <div className="mt-8 bg-gray-50 rounded-lg p-6">
            <h2 className="text-xl font-semibold text-gray-800 mb-4">
              Betting Strategy
            </h2>
            <div className="space-y-4">
              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">
                    Moneyline Bet
                  </span>
                  <span className="text-gray-900 font-semibold">${stake1}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Place ${stake1} at odds of{" "}
                  {isDecimalOdds ? odds1.toFixed(3) : decimalToAmerican(odds1)}
                  {!isDecimalOdds && ` (${odds1.toFixed(3)})`}
                </div>
              </div>

              <div className="bg-white p-4 rounded-md shadow-sm">
                <div className="flex justify-between items-center mb-2">
                  <span className="font-medium text-gray-700">
                    Spread Bet (-1.5)
                  </span>
                  <span className="text-gray-900 font-semibold">${stake2}</span>
                </div>
                <div className="text-sm text-gray-600">
                  Place ${stake2} at odds of{" "}
                  {isDecimalOdds ? odds2.toFixed(3) : decimalToAmerican(odds2)}
                  {!isDecimalOdds && ` (${odds2.toFixed(3)})`}
                </div>
              </div>

              <div className="bg-gray-100 p-4 rounded-md">
                <h3 className="font-medium text-gray-800 mb-3">
                  Potential Outcomes:
                </h3>

                <div className="space-y-3">
                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-medium text-green-800">Win by 2+</p>
                    <div className="space-y-1 mt-2">
                      <div className="text-sm text-green-700 flex justify-between">
                        <span>Bet 1 (Moneyline):</span>
                        <span>
                          +$
                          {(
                            Number(stake1) * Number(odds1) -
                            Number(stake1)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-green-700 flex justify-between">
                        <span>Bet 2 (-1.5):</span>
                        <span>
                          +$
                          {(
                            Number(stake2) * Number(odds2) -
                            Number(stake2)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-green-700 border-t border-green-200 pt-1 flex justify-between font-semibold">
                        <span>Total Profit:</span>
                        <span>
                          +$
                          {(
                            Number(stake1) * Number(odds1) -
                            Number(stake1) +
                            Number(stake2) * Number(odds2) -
                            Number(stake2)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-green-50 p-3 rounded">
                    <p className="font-medium text-green-800">
                      Win by Exactly 1 (Push)
                    </p>
                    <div className="space-y-1 mt-2">
                      <div className="text-sm text-green-700 flex justify-between">
                        <span>Bet 1 (Moneyline):</span>
                        <span>
                          +$
                          {(
                            Number(stake1) * Number(odds1) -
                            Number(stake1)
                          ).toFixed(2)}
                        </span>
                      </div>
                      <div className="text-sm text-green-700 flex justify-between">
                        <span>Bet 2 (-1.5):</span>
                        <span>-${Number(stake2).toFixed(2)}</span>
                      </div>
                      <div className="text-sm text-green-700 border-t border-green-200 pt-1 flex justify-between font-semibold">
                        <span>Total Profit:</span>
                        <span>
                          +$
                          {(
                            Number(stake1) * Number(odds1) -
                            Number(stake1) -
                            Number(stake2)
                          ).toFixed(2)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="bg-red-50 p-3 rounded">
                    <p className="font-medium text-red-800">Loss</p>
                    <p className="text-sm text-red-700">
                      Loss: -${Number(totalStake).toFixed(2)}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NewCalc;
