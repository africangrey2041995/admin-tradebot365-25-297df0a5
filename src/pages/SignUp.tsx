
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
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
  UserIcon,
  Loader2
} from 'lucide-react';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [fullName, setFullName] = useState('');
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  // If clerk isn't loaded yet, show a simple loading state
  if (!isLoaded) {
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800">
        <Loader2 className="h-12 w-12 animate-spin text-white/50" />
      </div>
    );
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      
      await signUp.create({
        firstName: fullName.split(' ')[0],
        lastName: fullName.split(' ').slice(1).join(' ') || '',
        emailAddress,
        password,
      });

      // Send email verification code
      await signUp.prepareEmailAddressVerification({ strategy: "email_code" });
      
      setPendingVerification(true);
      
      toast({
        title: "Mã xác thực đã được gửi",
        description: "Vui lòng kiểm tra email của bạn",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký",
        description: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi đăng ký",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleVerify = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      
      const completeSignUp = await signUp.attemptEmailAddressVerification({
        code,
      });
      
      if (completeSignUp.status === "complete") {
        await setActive({ session: completeSignUp.createdSessionId });
        toast({
          title: "Xác thực thành công",
          description: "Chào mừng bạn đến với Trade Bot 365",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Xác thực thất bại",
          description: "Vui lòng kiểm tra lại mã xác thực",
        });
      }
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Lỗi xác thực",
        description: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi xác thực",
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleSignUpWithGoogle = async () => {
    if (!isLoaded) return;

    try {
      setIsGoogleLoading(true);
      await signUp.authenticateWithRedirect({
        strategy: "oauth_google",
        redirectUrl: "/",
        redirectUrlComplete: "/",
      });
    } catch (err: any) {
      toast({
        variant: "destructive",
        title: "Lỗi đăng ký với Google",
        description: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi đăng ký với Google",
      });
      setIsGoogleLoading(false);
    }
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
        <Link to="/sign-in">
          <Button variant="outline" className="border-zinc-700 bg-zinc-800/50 hover:bg-zinc-700 text-white">
            Đăng nhập
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
            <CardTitle className="text-2xl font-bold text-white">
              {pendingVerification ? "Xác Thực Email" : "Đăng Ký"}
            </CardTitle>
            <CardDescription className="text-zinc-400">
              {pendingVerification 
                ? "Nhập mã xác thực đã được gửi đến email của bạn" 
                : "Tạo tài khoản để sử dụng hệ thống quản lý bot giao dịch"}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {pendingVerification ? (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Label htmlFor="code" className="text-zinc-400">Mã xác thực</Label>
                  <Input
                    id="code"
                    type="text"
                    placeholder="Nhập mã 6 số"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border-zinc-700 bg-zinc-800/70 text-white focus-visible:ring-tradebot focus-visible:border-tradebot"
                    required
                  />
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
                      Xác thực
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <>
                <div className="flex flex-col space-y-3">
                  <Button 
                    variant="outline" 
                    className="relative w-full bg-zinc-800/80 border-zinc-700 hover:bg-zinc-700/90 text-white font-medium"
                    onClick={handleSignUpWithGoogle}
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
                    Đăng ký với Google
                  </Button>
                </div>
                
                <div className="relative my-4">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-zinc-900 px-2 text-zinc-500">
                      Hoặc đăng ký với
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-zinc-400">Họ và tên</Label>
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                      <Input
                        id="fullName"
                        type="text"
                        placeholder="Nguyen Van A"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="pl-10 border-zinc-700 bg-zinc-800/70 text-white focus-visible:ring-tradebot focus-visible:border-tradebot"
                        required
                      />
                    </div>
                  </div>
                  
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
                    <Label htmlFor="password" className="text-zinc-400">Mật khẩu</Label>
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
                    <p className="text-xs text-zinc-500">Mật khẩu phải có ít nhất 8 ký tự</p>
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
                        Đăng Ký
                        <ArrowRight className="ml-2 h-4 w-4" />
                      </>
                    )}
                  </Button>
                </form>
              </>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-zinc-800 pt-4">
            <p className="text-center text-sm text-zinc-500">
              Đã có tài khoản?{" "}
              <Link to="/sign-in" className="text-tradebot hover:underline">
                Đăng nhập ngay
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

export default SignUp;
