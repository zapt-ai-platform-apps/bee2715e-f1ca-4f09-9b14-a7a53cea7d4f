import React from 'react';
import { useAuth } from '../features/auth/AuthContext';
import InvestmentEligibilityChecker from '../features/investmentChecker/InvestmentEligibilityChecker';
import DocumentUpload from '../features/documentStorage/DocumentUpload';
import TaxComplianceCenter from '../features/taxCompliance/TaxComplianceCenter';
import ChatWidget from '../components/ChatWidget';

export default function Dashboard() {
  const { signOut } = useAuth();

  return (
    <div className="min-h-screen flex flex-col text-gray-900">
      <header className="flex justify-between items-center p-4 bg-gray-100">
        <h1 className="text-2xl font-bold">Dashboard</h1>
        <button
          onClick={signOut}
          className="cursor-pointer bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded"
        >
          Sign Out
        </button>
      </header>
      <main className="flex-grow p-4 overflow-auto">
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Investment Eligibility Checker</h2>
          <InvestmentEligibilityChecker />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Document Upload</h2>
          <DocumentUpload />
        </section>
        <section className="mb-8">
          <h2 className="text-xl font-semibold mb-2">Tax Compliance Center</h2>
          <TaxComplianceCenter />
        </section>
      </main>
      <footer className="p-4 bg-gray-100 text-center">
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="cursor-pointer text-blue-500 underline">
          Made on ZAPT
        </a>
      </footer>
      <ChatWidget />
    </div>
  );
}