import React from "react";
import ArbitrageCalculator from "./ArbitrageCalculator";
import HedgeCalculator from "./HedgeCalculator";
import NewCalc from "./NewCalc";

const App = () => {
  return (
    <>
      <div className="min-h-screen bg-gradient-to-br from-blue-300 to-blue-600 p-4 md:p-8 lg:p-12">
        <div className="max-w-7xl mx-auto bg-white rounded-2xl shadow-xl p-6 md:p-10">
          <h1 className="text-4xl font-bold mb-12 text-gray-800 text-center">
            Sports Arbitrage Calculator
          </h1>
          <div className="flex flex-col md:flex-row gap-6">
            <div className="flex-1">
              <ArbitrageCalculator />
            </div>
            <div className="flex-1">
              <HedgeCalculator />
            </div>
            <NewCalc />
          </div>
        </div>
      </div>
    </>
  );
};

export default App;
