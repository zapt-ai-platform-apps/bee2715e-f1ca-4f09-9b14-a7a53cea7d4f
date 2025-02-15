import React, { useState } from 'react';

export default function InvestmentEligibilityChecker() {
  const [income, setIncome] = useState('');
  const [invested, setInvested] = useState('');
  const [eligibility, setEligibility] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleCheckEligibility = (e) => {
    e.preventDefault();
    console.log("Checking eligibility with income:", income, "and invested:", invested);
    setLoading(true);
    setTimeout(() => {
      const eligible = parseFloat(income) > 50000 && parseFloat(invested) > 10000;
      setEligibility(eligible);
      setLoading(false);
    }, 1000);
  };

  return (
    <form onSubmit={handleCheckEligibility} className="space-y-4">
      <div>
        <label className="block mb-1">Annual Income</label>
        <input
          type="number"
          value={income}
          onChange={(e) => setIncome(e.target.value)}
          className="box-border border p-2 w-full"
          required
        />
      </div>
      <div>
        <label className="block mb-1">Current Investments</label>
        <input
          type="number"
          value={invested}
          onChange={(e) => setInvested(e.target.value)}
          className="box-border border p-2 w-full"
          required
        />
      </div>
      <button type="submit" disabled={loading} className="cursor-pointer bg-green-500 hover:bg-green-600 text-white px-4 py-2 rounded disabled:opacity-50">
        {loading ? 'Checking...' : 'Check Eligibility'}
      </button>
      {eligibility !== null && (
        <div className="mt-4">
          {eligibility ? (
            <span className="text-green-600 font-bold">Eligible for investment opportunities!</span>
          ) : (
            <span className="text-red-600 font-bold">Not eligible based on provided information.</span>
          )}
        </div>
      )}
    </form>
  );
}