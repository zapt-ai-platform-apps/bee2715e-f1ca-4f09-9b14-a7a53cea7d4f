import React from 'react';
import { Auth } from '@supabase/auth-ui-react';
import { ThemeSupa } from '@supabase/auth-ui-shared';
import { supabase } from '../../supabaseClient';

const LoginForm = () => {
  return (
    <div className="max-w-md mx-auto p-4">
      <div className="text-center mb-4">
        <h2 className="text-2xl font-bold">Sign in with ZAPT</h2>
        <a href="https://www.zapt.ai" target="_blank" rel="noreferrer" className="text-blue-500 underline">
          Visit ZAPT Marketing Site
        </a>
      </div>
      <Auth
        supabaseClient={supabase}
        appearance={{ theme: ThemeSupa }}
        providers={['google', 'facebook', 'apple']}
        socialLayout="horizontal"
      />
    </div>
  );
};

export default LoginForm;