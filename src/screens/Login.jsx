import React from 'react';
import LoginForm from '../features/auth/LoginForm';

export default function Login() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-gray-900">
      <LoginForm />
    </div>
  );
}