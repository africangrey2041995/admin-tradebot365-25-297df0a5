
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSignIn, useSignUp } from '@clerk/clerk-react';
import { Loader2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function SSOCallback() {
  const { isLoaded: isSignInLoaded, signIn } = useSignIn();
  const { isLoaded: isSignUpLoaded, signUp } = useSignUp();
  const navigate = useNavigate();
  const { toast } = useToast();

  useEffect(() => {
    if (!isSignInLoaded || !isSignUpLoaded) return;

    // Handle the OAuth callback by resuming the sign-in/sign-up process
    async function handleCallback() {
      try {
        const searchParams = new URLSearchParams(window.location.search);
        
        // Check for sign-in flow
        if (searchParams.has('__clerk_status')) {
          // For sign-in with OAuth, we need to complete the OAuth flow without additional parameters
          // The Clerk SDK will automatically use the current URL to complete the OAuth flow
          await signIn.attemptFirstFactor();
          
          navigate('/');
          return;
        }
        
        // Handle sign-up verification
        const firstParam = window.location.search.substring(1).split('&')[0];
        if (firstParam.startsWith('__clerk_ticket')) {
          // For sign-up with email verification
          const code = searchParams.get('__clerk_ticket') || '';
          await signUp.attemptEmailAddressVerification({
            code
          });
          
          navigate('/');
          return;
        }
        
        // If we get here, something went wrong
        toast({
          variant: "destructive",
          title: "Lỗi xác thực",
          description: "Không thể xác thực đăng nhập. Vui lòng thử lại."
        });
        navigate('/sign-in');
      } catch (err) {
        console.error('Error during OAuth callback:', err);
        toast({
          variant: "destructive",
          title: "Lỗi xác thực",
          description: "Đã xảy ra lỗi khi xử lý xác thực."
        });
        navigate('/sign-in');
      }
    }

    handleCallback();
  }, [isSignInLoaded, isSignUpLoaded, signIn, signUp, navigate, toast]);

  return (
    <div className="h-screen w-full flex flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
      <Loader2 className="h-10 w-10 animate-spin text-primary mb-4" />
      <p className="text-white text-lg">Đang xử lý xác thực...</p>
    </div>
  );
}
