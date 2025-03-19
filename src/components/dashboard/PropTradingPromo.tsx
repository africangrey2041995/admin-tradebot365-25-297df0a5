
import React from 'react';
import { motion } from 'framer-motion';
import { LineChart, DollarSign, Star, ArrowUpRight, Users, TrendingUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Card } from '@/components/ui/card';

const PropTradingPromo = () => {
  const navigate = useNavigate();

  return (
    <motion.div
      className="mb-8"
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { opacity: 1, y: 0 }
      }}
      initial="hidden"
      animate="visible"
      transition={{ duration: 0.5 }}
    >
      <Card className="overflow-hidden border-0 shadow-lg bg-gradient-to-r from-violet-600 to-indigo-700">
        <div className="relative p-6">
          {/* Decorative elements */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-white rounded-full opacity-5"></div>
          <div className="absolute bottom-0 left-20 w-32 h-32 bg-white rounded-full opacity-5"></div>
          
          {/* Pattern overlay */}
          <div className="absolute inset-0 opacity-10"
            style={{
              backgroundImage: "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23ffffff' fill-opacity='0.4' fill-rule='evenodd'%3E%3Cpath d='M36 34v-4h-2v4h-4v2h4v4h2v-4h4v-2h-4zm0-30V0h-2v4h-4v2h4v4h2V6h4V4h-4zM6 34v-4H4v4H0v2h4v4h2v-4h4v-2H6zM6 4V0H4v4H0v2h4v4h2V6h4V4H6z'/%3E%3C/g%3E%3C/svg%3E\")",
              backgroundSize: '30px 30px'
            }}
          ></div>

          <div className="grid md:grid-cols-5 gap-6 relative z-10">
            <div className="md:col-span-3 space-y-4">
              <div className="inline-flex px-3 py-1 rounded-full bg-white/20 text-white text-sm font-medium">
                <Star className="h-4 w-4 mr-2 text-yellow-300" />
                Dịch vụ mới
              </div>
              
              <h2 className="text-2xl font-bold text-white">Prop Trading Bot</h2>
              
              <p className="text-white/80 text-sm">
                Vượt qua các vòng thử thách Prop Trading với bộ Bot tối ưu hiệu suất & giảm thiểu rủi ro.
                Bắt đầu sự nghiệp Prop Trader với các công cụ chuyên nghiệp ngay hôm nay.
              </p>
              
              <div className="grid grid-cols-2 gap-3 py-2">
                <div className="flex items-center text-white/90 text-sm">
                  <div className="flex-shrink-0 mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                    <TrendingUp className="h-3.5 w-3.5 text-teal-300" />
                  </div>
                  Tỷ lệ thành công 80%+
                </div>
                <div className="flex items-center text-white/90 text-sm">
                  <div className="flex-shrink-0 mr-2 w-6 h-6 flex items-center justify-center rounded-full bg-white/10">
                    <Users className="h-3.5 w-3.5 text-teal-300" />
                  </div>
                  130+ trader sử dụng
                </div>
              </div>
              
              <div className="space-x-3 pt-2">
                <Button 
                  variant="tradebot" 
                  size="sm"
                  className="group"
                  onClick={() => navigate('/premium-bots')}
                >
                  Khám phá
                  <ArrowUpRight className="h-4 w-4 ml-1 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
                </Button>
                <Button 
                  size="sm"
                  variant="ghost" 
                  className="bg-white/10 text-white hover:bg-white/20 border border-white/20"
                  onClick={() => navigate('/accounts')}
                >
                  Kết nối tài khoản
                </Button>
              </div>
            </div>
            
            <div className="md:col-span-2 flex items-center justify-center">
              <div className="bg-white/10 backdrop-blur-sm rounded-lg border border-white/20 p-4 w-full">
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-emerald-500/20 flex items-center justify-center mr-3">
                        <LineChart className="h-4 w-4 text-emerald-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">Hiệu suất</div>
                        <div className="text-emerald-400 text-lg font-bold">+11.2%</div>
                      </div>
                    </div>
                    <Badge className="bg-emerald-500/20 text-emerald-300 border-0">
                      +0.8% hôm nay
                    </Badge>
                  </div>
                  
                  <div className="w-full bg-white/5 h-1.5 rounded-full overflow-hidden">
                    <div className="h-full bg-gradient-to-r from-emerald-400 to-teal-500 rounded-full" style={{width: "78%"}}></div>
                  </div>
                  
                  <div className="flex justify-between items-center">
                    <div className="flex items-center">
                      <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center mr-3">
                        <DollarSign className="h-4 w-4 text-blue-400" />
                      </div>
                      <div>
                        <div className="text-white font-medium text-sm">Drawdown</div>
                        <div className="text-white text-lg font-bold">4.2%</div>
                      </div>
                    </div>
                    <Badge className="bg-blue-500/20 text-blue-300 border-0">
                      Mục tiêu &lt;10%
                    </Badge>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    </motion.div>
  );
};

export default PropTradingPromo;
