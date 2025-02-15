# Login Journey

This guide describes the login process for Nest.

1. **Authentication Interface**  
   The login screen provides a secure authentication form powered by Supabase Auth UI.  
   - The text "Sign in with ZAPT" is displayed above the login component.
   - A link to [ZAPT Marketing Site](https://www.zapt.ai) is available for additional information.

2. **Social Login Options**  
   Users can log in using social providers such as Google, Facebook, or Apple.

3. **Post-Login Behavior**  
   After a successful login:
   - The app automatically records the user login once using the `recordLogin` function.
   - You are redirected to the Dashboard where all application features become accessible.