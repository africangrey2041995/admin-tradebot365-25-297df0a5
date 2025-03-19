
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const navigate = useNavigate();

  useEffect(() => {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    // Handle the OAuth callback by resuming the sign-in/sign-up process
    async function handleCallback() {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        
        // Handle sign in
        if (searchParams.has('__clerk_status') && searchParams.get('__clerk_status') === 'running') {
          await signIn.attemptFirstFactor({
            strategy: 'oauth_callback',
            redirectUrl: '/sso-callback',
          });
          navigate('/');
          return;
        }
        
        // Handle sign up
        const firstParam = window.location.search.substring(1).split('&')[0];
        if (firstParam.startsWith('__clerk_ticket')) {
          // Handle sign-up OAuth callback
          await signUp.attemptEmailAddressVerification({
            strategy: 'oauth_callback',
            redirectUrl: '/sso-callback',
          });
          navigate('/');
          return;
        }
        
        // If we get here, something went wrong
        navigate('/sign-in');
      } catch (err) {
        console.error('Error during OAuth callback:', err);
        navigate('/sign-in');
      }
    }

    handleCallback();
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, navigate]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-white text-lg">Đang xử lý xác thực...</p>
    </div>
  );
}
