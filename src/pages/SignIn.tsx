
import React, { useState } from 'react';
import { useSignIn } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { 
  ArrowRight, 
  MailIcon, 
  KeyIcon, 
  Loader2,
  AlertCircle,
  TrendingUp,
  CircleDollarSign,
  LineChart,
  Zap,
  Shield
} from 'lucide-react';
import TradeBotLogo from '@/components/common/TradeBotLogo';
import { isValidEmail } from '@/utils/validationUtils';

const SignIn = () => {
  const { isLoaded, signIn, setActive } = useSignIn();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const [errors, setErrors] = useState<{email?: string; password?: string; general?: string}>({});
  const { toast } = useToast();
  const navigate = useNavigate();

  // Kiểm tra Clerk có hoạt động không
  const clerkEnabled = Boolean(import.meta.env.VITE_CLERK_PUBLISHABLE_KEY);

  if (!isLoaded && clerkEnabled) {
    return (
      <div className="flex min-h-screen w-full flex-col items-center justify-center bg-gradient-to-br from-zinc-900 via-zinc-800 to-zinc-900">
        <div className="relative">
          <div className="absolute -inset-1 rounded-lg bg-gradient-to-r from-tradebot/30 via-tradebot/10 to-blue-500/30 blur-xl"></div>
          <Loader2 className="h-14 w-14 animate-spin text-tradebot relative" />
        </div>
        <p className="text-zinc-400 mt-8 animate-pulse">Đang tải ứng dụng...</p>
      </div>
    );
  }

  const validateForm = () => {
    const newErrors: {email?: string; password?: string} = {};
    let isValid = true;

    if (!emailAddress) {
      newErrors.email = 'Email không được để trống';
      isValid = false;
    } else if (!isValidEmail(emailAddress)) {
      newErrors.email = 'Email không đúng định dạng';
      isValid = false;
    }

    if (!password) {
      newErrors.password = 'Mật khẩu không được để trống';
      isValid = false;
    } else if (password.length < 8) {
      newErrors.password = 'Mật khẩu phải có ít nhất 8 ký tự';
      isValid = false;
    }

    setErrors(newErrors);
    return isValid;
  };

  const handleMockSignIn = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    setIsLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Đăng nhập thành công",
        description: "Chào mừng bạn quay trở lại",
      });
      navigate('/');
      setIsLoading(false);
    }, 1500);
  };

  const handleMockGoogleSignIn = () => {
    setIsGoogleLoading(true);
    
    setTimeout(() => {
      toast({
        title: "Đăng nhập thành công",
        description: "Đã đăng nhập với Google",
      });
      navigate('/');
      setIsGoogleLoading(false);
    }, 1500);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded || !clerkEnabled) return;

    if (!validateForm()) return;

    try {
      setIsLoading(true);
      setErrors({});
      
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
      setErrors({
        general: err.errors?.[0]?.message || "Đã có lỗi xảy ra khi đăng nhập"
      });
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
    if (!isLoaded || !clerkEnabled) return;

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

  const onSubmit = clerkEnabled ? handleSubmit : handleMockSignIn;
  const onGoogleSignIn = clerkEnabled ? handleSignInWithGoogle : handleMockGoogleSignIn;

  return (
    <div className="flex min-h-screen w-full items-center justify-center relative overflow-hidden bg-[#0e0f12]">
      {/* Background elements */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-0 left-0 right-0 h-[500px] bg-gradient-to-b from-zinc-900/80 via-zinc-800/20 to-transparent"></div>
        <div className="absolute inset-0 bg-[url('/lovable-uploads/baec666a-ccac-4ef0-bb3e-8468d891488b.png')] bg-cover opacity-5"></div>
        
        {/* Animated background glows */}
        <motion.div 
          className="absolute top-1/4 left-1/4 w-[500px] h-[500px] rounded-full bg-tradebot/5 blur-[100px]"
          animate={{ 
            scale: [1, 1.2, 1], 
            opacity: [0.15, 0.2, 0.15] 
          }}
          transition={{ 
            duration: 8, 
            repeat: Infinity, 
            repeatType: "reverse" 
          }}
        />
        
        <motion.div 
          className="absolute bottom-1/4 right-1/4 w-[400px] h-[400px] rounded-full bg-blue-500/5 blur-[100px]"
          animate={{ 
            scale: [1, 1.5, 1], 
            opacity: [0.1, 0.15, 0.1] 
          }}
          transition={{ 
            duration: 10, 
            repeat: Infinity, 
            repeatType: "reverse",
            delay: 2 
          }}
        />
      </div>
      
      {/* Tech elements */}
      <div className="absolute top-24 left-20 text-white/10">
        <LineChart className="h-16 w-16" />
      </div>
      <div className="absolute bottom-24 left-32 text-white/10">
        <CircleDollarSign className="h-10 w-10" />
      </div>
      <div className="absolute top-32 right-20 text-white/10">
        <TrendingUp className="h-12 w-12" />
      </div>
      <div className="absolute bottom-40 right-36 text-white/10">
        <Shield className="h-14 w-14" />
      </div>
      
      <div className="absolute top-8 left-8 z-10">
        <Link to="/">
          <div className="relative group">
            <motion.div 
              className="absolute -inset-1 rounded-lg bg-gradient-to-r from-tradebot/30 via-tradebot/20 to-blue-500/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300 blur-sm"
              animate={{ scale: [1, 1.02, 1] }}
              transition={{ duration: 3, repeat: Infinity }}
            ></motion.div>
            <TradeBotLogo size="large" showBetaTag />
          </div>
        </Link>
      </div>
      
      <div className="absolute top-8 right-8 z-10">
        <Link to="/sign-up">
          <Button variant="outline" className="border-zinc-700/60 bg-zinc-800/40 hover:bg-zinc-700/60 text-white backdrop-blur-md">
            Đăng ký
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </Link>
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="w-full max-w-md z-10"
      >
        <div className="relative">
          <div className="absolute -inset-0.5 bg-gradient-to-r from-tradebot/50 to-blue-600/50 rounded-2xl blur-lg opacity-20"></div>
          <Card className="border-zinc-700/50 bg-zinc-900/60 backdrop-blur-xl shadow-2xl relative">
            <motion.div 
              className="absolute right-5 top-5 text-tradebot"
              animate={{ 
                rotateZ: [0, 10, -10, 0],
                scale: [1, 1.05, 0.95, 1]
              }}
              transition={{ 
                duration: 5, 
                repeat: Infinity,
                repeatType: "loop",
                ease: "easeInOut"
              }}
            >
              <Zap className="h-6 w-6" />
            </motion.div>
            <CardHeader className="space-y-1">
              <CardTitle className="text-2xl font-bold text-white flex items-center">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-tradebot to-blue-500">
                  Đăng Nhập
                </span>
              </CardTitle>
              <CardDescription className="text-zinc-400">
                Đăng nhập để truy cập hệ thống quản lý bot giao dịch AI
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              {errors.general && (
                <Alert variant="destructive" className="border-red-800/50 bg-red-950/50 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4" />
                  <AlertDescription>{errors.general}</AlertDescription>
                </Alert>
              )}
              
              {!clerkEnabled && (
                <Alert className="border-amber-800/50 bg-amber-950/30 text-amber-200 backdrop-blur-sm">
                  <AlertCircle className="h-4 w-4 text-amber-300" />
                  <AlertDescription className="text-amber-200">
                    Hệ thống đang chạy ở chế độ demo. Bạn có thể đăng nhập với bất kỳ thông tin nào.
                  </AlertDescription>
                </Alert>
              )}
              
              <div className="flex flex-col space-y-3">
                <Button 
                  variant="outline" 
                  className="relative w-full bg-zinc-800/40 border-zinc-700/50 hover:bg-zinc-700/60 text-white font-medium backdrop-blur-sm overflow-hidden group"
                  onClick={onGoogleSignIn}
                  disabled={isGoogleLoading}
                >
                  <motion.div 
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/5 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"
                  />
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
                  <span className="w-full border-t border-zinc-700/50" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-zinc-900/80 px-2 text-zinc-500 backdrop-blur-sm">
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
                      className={`pl-10 border-zinc-700/50 bg-zinc-800/40 text-white focus-visible:ring-tradebot focus-visible:border-tradebot/70 transition-all duration-300 backdrop-blur-sm ${errors.email ? 'border-red-600/70' : ''}`}
                    />
                  </div>
                  {errors.email && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.email}
                    </motion.p>
                  )}
                </div>
                
                <div className="space-y-2">
                  <div className="flex items-center justify-between">
                    <Label htmlFor="password" className="text-zinc-400">Mật khẩu</Label>
                    <Link 
                      to="#" 
                      className="text-xs text-tradebot hover:text-tradebot/80 transition-colors"
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
                      className={`pl-10 border-zinc-700/50 bg-zinc-800/40 text-white focus-visible:ring-tradebot focus-visible:border-tradebot/70 transition-all duration-300 backdrop-blur-sm ${errors.password ? 'border-red-600/70' : ''}`}
                    />
                  </div>
                  {errors.password && (
                    <motion.p 
                      initial={{ opacity: 0, y: -5 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="text-xs text-red-500 mt-1"
                    >
                      {errors.password}
                    </motion.p>
                  )}
                </div>
                
                <Button
                  type="submit"
                  variant="tradebot"
                  className="w-full shadow-lg hover:shadow-tradebot/30 transition-all duration-300 relative overflow-hidden group"
                  disabled={isLoading}
                >
                  <motion.div 
                    className="absolute inset-0 w-full bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-all duration-700"
                  />
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
            <CardFooter className="flex flex-col space-y-4 border-t border-zinc-800/50 pt-4">
              <p className="text-center text-sm text-zinc-500">
                Chưa có tài khoản?{" "}
                <Link to="/sign-up" className="text-tradebot hover:text-tradebot/80 transition-colors">
                  Đăng ký ngay
                </Link>
              </p>
            </CardFooter>
          </Card>
        </div>
      </motion.div>
      
      <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 text-zinc-500 text-xs">
        © 2024 Trade Bot 365. All rights reserved.
      </div>
    </div>
  );
};

export default SignIn;
