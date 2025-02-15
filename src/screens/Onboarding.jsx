import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function Onboarding() {
  const navigate = useNavigate();

  const handleGetStarted = () => {
    console.log("Onboarding: Get Started clicked");
    navigate('/login');
  };

  return (
    <div className="min-h-screen flex flex-col justify-center items-center text-gray-900">
      <h1 className="text-4xl font-bold mb-6">Welcome to Nest</h1>
      <p className="mb-8">Discover investment opportunities and handle tax compliance with ease.</p>
      <button
        onClick={handleGetStarted}
        className="cursor-pointer bg-blue-500 text-white px-6 py-3 rounded hover:bg-blue-600"
      >
        Get Started
      </button>
    </div>
  );
}