
import React, { useState } from 'react';
import { useSignUp } from '@clerk/clerk-react';
import { useNavigate, Link } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { useToast } from '@/hooks/use-toast';
import { motion } from 'framer-motion';
import { 
  ArrowRight, 
  MailIcon, 
  KeyIcon, 
  Loader2, 
  UserIcon, 
  PhoneIcon 
} from 'lucide-react';

const SignUp = () => {
  const { isLoaded, signUp, setActive } = useSignUp();
  const [emailAddress, setEmailAddress] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('');
  const [pendingVerification, setPendingVerification] = useState(false);
  const [code, setCode] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isGoogleLoading, setIsGoogleLoading] = useState(false);
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isLoaded) return;

    try {
      setIsLoading(true);
      
      const result = await signUp.create({
        emailAddress,
        password,
        username,
        phoneNumber
      });

      // Send verification email
      await signUp.prepareEmailAddressVerification({
        strategy: 'email_code',
      });

      setPendingVerification(true);
      
      toast({
        title: "Mã xác nhận đã được gửi",
        description: "Vui lòng kiểm tra email của bạn để lấy mã xác nhận",
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
      
      const result = await signUp.attemptEmailAddressVerification({
        code,
      });

      if (result.status === 'complete') {
        await setActive({ session: result.createdSessionId });
        toast({
          title: "Xác thực thành công",
          description: "Chào mừng bạn đến với Trade Bot 365",
        });
        navigate('/');
      } else {
        toast({
          variant: "destructive",
          title: "Xác thực thất bại",
          description: "Mã xác nhận không hợp lệ hoặc đã hết hạn",
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
        redirectUrl: "/sso-callback",
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
    <div className="flex h-screen w-full items-center justify-center bg-gradient-to-br from-zinc-900 to-zinc-800 px-4">
      <div className="absolute top-8 left-8">
        <img 
          src="/lovable-uploads/e2df3904-13a1-447b-8f10-5d6f6439dc6b.png" 
          alt="Trade Bot 365 Logo" 
          className="h-12 w-auto object-contain" 
        />
      </div>
      
      <motion.div
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="w-full max-w-md"
      >
        <Card className="border-zinc-800 bg-zinc-950/60 backdrop-blur-sm">
          <CardHeader>
            <CardTitle className="text-2xl text-white">
              {pendingVerification ? "Xác thực email" : "Đăng Ký"}
            </CardTitle>
            <CardDescription>
              {pendingVerification 
                ? "Vui lòng nhập mã xác nhận đã được gửi đến email của bạn" 
                : "Tạo tài khoản để sử dụng hệ thống quản lý bot giao dịch"}
            </CardDescription>
          </CardHeader>
          <CardContent>
            {!pendingVerification ? (
              <>
                <div className="mb-4">
                  <Button 
                    variant="outline" 
                    className="w-full font-medium border-zinc-700 hover:bg-zinc-800"
                    onClick={handleSignUpWithGoogle}
                    disabled={isGoogleLoading}
                  >
                    {isGoogleLoading ? (
                      <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    ) : (
                      <svg className="mr-2 h-4 w-4" viewBox="0 0 24 24">
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
                
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <span className="w-full border-t border-zinc-700" />
                  </div>
                  <div className="relative flex justify-center text-xs uppercase">
                    <span className="bg-zinc-950 px-2 text-zinc-500">
                      Hoặc đăng ký với
                    </span>
                  </div>
                </div>
                
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="space-y-2">
                    <div className="relative">
                      <MailIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                      <Input
                        type="email"
                        placeholder="Email"
                        value={emailAddress}
                        onChange={(e) => setEmailAddress(e.target.value)}
                        className="pl-10 border-zinc-700 bg-zinc-900 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <KeyIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                      <Input
                        type="password"
                        placeholder="Mật khẩu"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 border-zinc-700 bg-zinc-900 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <UserIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                      <Input
                        type="text"
                        placeholder="Tên tài khoản"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="pl-10 border-zinc-700 bg-zinc-900 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="relative">
                      <PhoneIcon className="absolute left-3 top-3 h-4 w-4 text-zinc-500" />
                      <Input
                        type="tel"
                        placeholder="Số điện thoại"
                        value={phoneNumber}
                        onChange={(e) => setPhoneNumber(e.target.value)}
                        className="pl-10 border-zinc-700 bg-zinc-900 text-white"
                        required
                      />
                    </div>
                  </div>
                  
                  <Button
                    type="submit"
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
            ) : (
              <form onSubmit={handleVerify} className="space-y-4">
                <div className="space-y-2">
                  <Input
                    type="text"
                    placeholder="Mã xác nhận"
                    value={code}
                    onChange={(e) => setCode(e.target.value)}
                    className="border-zinc-700 bg-zinc-900 text-white"
                    required
                  />
                </div>
                
                <Button
                  type="submit"
                  className="w-full"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  ) : (
                    <>
                      Xác nhận
                      <ArrowRight className="ml-2 h-4 w-4" />
                    </>
                  )}
                </Button>
              </form>
            )}
          </CardContent>
          <CardFooter className="flex flex-col space-y-4 border-t border-zinc-800 pt-4">
            <p className="text-center text-sm text-zinc-500">
              Đã có tài khoản?{" "}
              <Link to="/sign-in" className="text-primary hover:underline">
                Đăng nhập
              </Link>
            </p>
          </CardFooter>
        </Card>
      </motion.div>
    </div>
  );
};

export default SignUp;
