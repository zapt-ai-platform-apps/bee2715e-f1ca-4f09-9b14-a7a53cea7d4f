import React, { createContext, useContext, useEffect, useState } from 'react';
import { supabase, recordLogin } from '../../supabaseClient';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [session, setSession] = useState(null);
  const [loginRecorded, setLoginRecorded] = useState(false);

  useEffect(() => {
    const getSession = async () => {
      const { data: { session } } = await supabase.auth.getSession();
      setSession(session);
      if (session?.user?.email && !loginRecorded) {
        try {
          console.log("Recording login for", session.user.email);
          await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
          setLoginRecorded(true);
        } catch (error) {
          console.error("Failed to record login:", error);
          import("@sentry/browser").then(Sentry => {
            Sentry.captureException(error);
          });
        }
      }
    };

    getSession();

    const { data: listener } = supabase.auth.onAuthStateChange((event, session) => {
      console.log("Auth state changed:", event);
      setSession(session);
      if (session?.user?.email && !loginRecorded) {
        (async () => {
          try {
            console.log("Recording login for", session.user.email);
            await recordLogin(session.user.email, import.meta.env.VITE_PUBLIC_APP_ENV);
            setLoginRecorded(true);
          } catch (error) {
            console.error("Failed to record login:", error);
            import("@sentry/browser").then(Sentry => {
              Sentry.captureException(error);
            });
          }
        })();
      }
    });

    return () => {
      listener.subscription.unsubscribe();
    };
  }, [loginRecorded]);

  const signOut = async () => {
    try {
      await supabase.auth.signOut();
      console.log("User signed out.");
      setSession(null);
      setLoginRecorded(false);
    } catch (error) {
      console.error("Error signing out:", error);
      import("@sentry/browser").then(Sentry => {
        Sentry.captureException(error);
      });
    }
  };

  return (
    <AuthContext.Provider value={{ session, signOut }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
export { AuthContext };