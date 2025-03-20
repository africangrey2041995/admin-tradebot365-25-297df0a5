
import { useLocation, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";

const NotFound = () => {
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  const goBack = () => {
    navigate(-1);
  };

  const goHome = () => {
    navigate("/");
  };

  // Check if the user is in the admin section
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <div className={`min-h-screen flex items-center justify-center ${isAdminRoute ? 'bg-zinc-950 text-white' : 'bg-gray-100'}`}>
      <div className="text-center max-w-md px-4">
        <h1 className={`text-6xl font-bold mb-4 ${isAdminRoute ? 'text-amber-500' : 'text-blue-500'}`}>404</h1>
        <h2 className={`text-2xl font-semibold mb-2 ${isAdminRoute ? 'text-white' : 'text-gray-800'}`}>
          Trang không tồn tại
        </h2>
        <p className={`text-lg mb-6 ${isAdminRoute ? 'text-zinc-400' : 'text-gray-600'}`}>
          Trang bạn đang tìm kiếm không tồn tại hoặc đã được di chuyển.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button 
            onClick={goBack}
            className={isAdminRoute ? "bg-zinc-800 hover:bg-zinc-700 text-white" : ""}
          >
            <ArrowLeft className="mr-2 h-4 w-4" />
            Quay lại
          </Button>
          <Button 
            onClick={goHome}
            className={isAdminRoute ? "bg-amber-500 hover:bg-amber-600 text-white" : ""}
          >
            Về trang chủ
          </Button>
        </div>
      </div>
    </div>
  );
};

export default NotFound;
