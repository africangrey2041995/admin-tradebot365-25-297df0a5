
import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { toast } from 'sonner';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MailIcon, 
  KeyIcon, 
  Loader2
} from 'lucide-react';
import { useLanguage } from '@/contexts/LanguageContext';

const SignIn = () => {
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const navigate = useNavigate();
  const { t } = useLanguage();

  // Handle mock sign in for demonstration
  const handleMockSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (emailAddress && password) {
        toast.success(t('Login successful'), {
          description: t('Welcome back'),
        });
        navigate('/');
      } else {
        toast.error(t('Login failed'), {
          description: t('Please check your login information'),
        });
      }
      setIsLoading(false);
    }, 1500);
  };

  // Mock Google sign in
  const handleMockGoogleSignIn = () => {
    setIsGoogleLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      toast.success(t('Login successful'), {
        description: t('Logged in with Google'),
      });
      navigate('/');
      setIsGoogleLoading(false);
    }, 1500);
  };

  return (
    <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
      <div className="absolute top-8 left-8">
        <Link to="/">
          <img 
            src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
            alt="Trade Bot 365 Logo" 
            className="h-16 w-auto object-contain" 
          />
        </Link>
      </div>
      
      <div className="absolute top-8 right-8">
        <Link to="/sign-up">
          <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white">
            {t('Sign up')}
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md"
      >
        <Card className="border-zinc-700 bg-zinc-900/80 backdrop-blur-lg shadow-xl">
          <CardHeader className="space-y-1">
            <CardTitle className="text-2xl font-bold text-white">{t('Login')}</CardTitle>
            <CardDescription className="text-zinc-400">
              {t('Login to access the trading bot management system')}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="relative w-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700/90 text-white font-medium"
                onClick={handleMockGoogleSignIn}
                disabled={isGoogleLoading}
              >
                {isGoogleLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <svg className="mr-2 h-5 w-5" viewBox="0 0 24 24">
                    <path
                      d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                      fill="#4285F4"
                    />
                    <path
                      d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                      fill="#34A853"
                    />
                    <path
                      d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                      fill="#FBBC05"
                    />
                    <path
                      d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                      fill="#EA4335"
                    />
                  </svg>
                )}
                {t('Login with Google')}
              </Button>
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">
                  {t('Or login with')}
                </span>
              </div>
            </div>
            
            <form onSubmit={handleMockSignIn} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">{t('Email')}</Label>
                <div className="relative">
                  <MailIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="your@email.com"
                    value={emailAddress}
                    onChange={(e) => setEmailAddress(e.target.value)}
                    className="pl-10 border-zinc-700 bg-zinc-800/70 text-white focus-visible:ring-tradebot focus-visible:border-tradebot"
                    required
                  />
                </div>
              </div>
              
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <Label htmlFor="password" className="text-zinc-400">{t('Password')}</Label>
                  <Link 
                    to="#" 
                    className="text-xs text-tradebot hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast(t('Feature in development'), {
                        description: t('The forgot password feature is under development')
                      });
                    }}
                  >
                    {t('Forgot password?')}
                  </Link>
                </div>
                <div className="relative">
                  <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                  <Input
                    id="password"
                    type="password"
                    placeholder="••••••••"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10 border-zinc-700 bg-zinc-800/70 text-white focus-visible:ring-tradebot focus-visible:border-tradebot"
                    required
                  />
                </div>
              </div>
              
              <Button
                type="submit"
                variant="default"
                className="w-full bg-tradebot hover:bg-tradebot/90"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    {t('Login')}
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-zinc-800 pt-4">
            <p className="text-center text-sm text-zinc-500">
              {t('Don\'t have an account?')}{" "}
              <Link to="/sign-up" className="text-tradebot hover:underline">
                {t('Sign up now')}
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-zinc-500 text-xs">
        © 2024 Trade Bot 365. All rights reserved.
      </div>
    </div>
  );
};

export default SignIn;
