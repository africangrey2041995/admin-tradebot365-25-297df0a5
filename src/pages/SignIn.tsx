
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MailIcon, 
  KeyIcon, 
  Loader2
} from 'lucide-react';

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // Show a proper loading state rather than infinite spinner
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <Loader2 className="h-12 w-12 animate-spin text-white/50 mb-4" />
        <p className="text-white/70">Đang tải ứng dụng...</p>
      </div>
    );
  }

  // Handle mock sign in for demonstration without Clerk credentials
  const handleMockSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    setIsLoading(true);
    
    // Simulate API call
    setTimeout(() => {
      if (emailAddress && password) {
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra lại thông tin đăng nhập",
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
      toast({
        title: "Đăng nhập thành công",
        description: "Đã đăng nhập với Google",
      });
      navigate('/');
      setIsGoogleLoading(false);
    }, 1500);
  };

  // Real Clerk auth handler
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      const result = await signIn.create({
        identifier: emailAddress,
        password,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast({
          title: "Đăng nhập thành công",
          description: "Chào mừng bạn quay trở lại",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Đăng nhập thất bại",
          description: "Vui lòng kiểm tra lại thông tin đăng nhập",
        });
      }
    } catch (err: any) {
      console.error("Login error:", err);
      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập",
        description: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi đăng nhập",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignInWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      setIsGoogleLoading(true);
      await signIn.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      console.error("Google login error:", err);
      toast({
        variant: "destructive",
        title: "Lỗi đăng nhập với Google",
        description: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi đăng nhập với Google",
      });
      setIsGoogleLoading(false);
    }
  };

  // Use mock handlers if Clerk setup has issues
  const onSubmit = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? handleSubmit : handleMockSignIn;
  const onGoogleSignIn = import.meta.env.VITE_CLERK_PUBLISHABLE_KEY ? handleSignInWithGoogle : handleMockGoogleSignIn;

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
            Đăng ký
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
            <CardTitle className="text-2xl font-bold text-white">Đăng Nhập</CardTitle>
            <CardDescription className="text-zinc-400">
              Đăng nhập để truy cập hệ thống quản lý bot giao dịch
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex flex-col space-y-3">
              <Button 
                variant="outline" 
                className="relative w-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700/90 text-white font-medium"
                onClick={onGoogleSignIn}
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
                Đăng nhập với Google
              </Button>
            </div>
            
            <div className="relative my-4">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t border-zinc-700" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-zinc-900 px-2 text-zinc-500">
                  Hoặc đăng nhập với
                </span>
              </div>
            </div>
            
            <form onSubmit={onSubmit} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="text-zinc-400">Email</Label>
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
                  <Label htmlFor="password" className="text-zinc-400">Mật khẩu</Label>
                  <Link 
                    to="#" 
                    className="text-xs text-tradebot hover:underline"
                    onClick={(e) => {
                      e.preventDefault();
                      toast({
                        title: "Chức năng đang phát triển",
                        description: "Tính năng quên mật khẩu đang được phát triển"
                      });
                    }}
                  >
                    Quên mật khẩu?
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
                variant="tradebot"
                className="w-full"
                disabled={isLoading}
              >
                {isLoading ? (
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                ) : (
                  <>
                    Đăng Nhập
                    <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </form>
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-zinc-800 pt-4">
            <p className="text-center text-sm text-zinc-500">
              Chưa có tài khoản?{" "}
              <Link to="/sign-up" className="text-tradebot hover:underline">
                Đăng ký ngay
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
