
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
        
        // Handle sign in - for OAuth we don't need to pass parameters to attemptFirstFactor
        if (searchParams.has('__clerk_status') && searchParams.get('__clerk_status') === 'running') {
          // First factor verification is being handled automatically by Clerk
          // Just complete the sign-in process
          const result = await signIn.create({
            strategy: "oauth_callback",
            redirectUrl: '/sso-callback',
          });
          
          if (result.status === "complete") {
            navigate('/');
          } else {
            navigate('/sign-in');
          }
          return;
        }
        
        // Handle sign up
        const firstParam = window.location.search.substring(1).split('&')[0];
        if (firstParam.startsWith('__clerk_ticket')) {
          // For OAuth sign up, we also use a different approach
          const result = await signUp.create({
            strategy: "oauth_callback",
            redirectUrl: '/sso-callback',
          });
          
          if (result.status === "complete") {
            navigate('/');
          } else {
            navigate('/sign-up');
          }
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
