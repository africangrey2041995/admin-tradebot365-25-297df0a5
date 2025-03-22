
import React, { Component, ErrorInfo, ReactNode } from 'react';
import { AlertTriangle, Home, RotateCcw } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { toast } from 'sonner';
import { USER_ROUTES } from '@/constants/routes';
import { Link } from 'react-router-dom';

interface ErrorBoundaryProps {
  children: ReactNode;
  fallback?: ReactNode;
  onReset?: () => void;
}

interface ErrorBoundaryState {
  hasError: boolean;
  error: Error | null;
}

class ErrorBoundary extends Component<ErrorBoundaryProps, ErrorBoundaryState> {
  constructor(props: ErrorBoundaryProps) {
    super(props);
    this.state = {
      hasError: false,
      error: null
    };
  }

  static getDerivedStateFromError(error: Error): ErrorBoundaryState {
    // Cập nhật state để hiển thị UI fallback
    return {
      hasError: true,
      error
    };
  }

  componentDidCatch(error: Error, errorInfo: ErrorInfo): void {
    // Log error to console
    console.error('ErrorBoundary caught an error:', error, errorInfo);
    
    // Hiển thị thông báo lỗi thông qua toast
    toast.error('Đã xảy ra lỗi trong ứng dụng', {
      description: 'Chúng tôi đã ghi nhận lỗi này và sẽ khắc phục sớm nhất có thể.'
    });
  }

  handleReset = (): void => {
    // Reset state
    this.setState({
      hasError: false,
      error: null
    });

    // Call onReset prop if provided
    if (this.props.onReset) {
      this.props.onReset();
    }
  };

  render(): ReactNode {
    if (this.state.hasError) {
      // Fallback UI khi có lỗi
      if (this.props.fallback) {
        return this.props.fallback;
      }

      return (
        <div className="min-h-[400px] flex items-center justify-center p-6">
          <div className="max-w-md w-full bg-background border rounded-lg p-6 shadow-sm text-center">
            <AlertTriangle className="h-12 w-12 text-destructive mx-auto mb-4" />
            <h2 className="text-2xl font-semibold mb-2">Đã xảy ra lỗi</h2>
            <p className="text-muted-foreground mb-6">
              Rất tiếc, có lỗi đã xảy ra khi tải thành phần này.
              {this.state.error && (
                <span className="block mt-2 text-sm text-destructive/80 font-mono bg-muted p-2 rounded">
                  {this.state.error.toString()}
                </span>
              )}
            </p>
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <Button
                variant="outline"
                onClick={this.handleReset}
                className="flex items-center gap-2"
              >
                <RotateCcw className="h-4 w-4" />
                Thử lại
              </Button>
              <Link to={USER_ROUTES.HOME}>
                <Button className="w-full sm:w-auto flex items-center gap-2">
                  <Home className="h-4 w-4" />
                  Về trang chủ
                </Button>
              </Link>
            </div>
          </div>
        </div>
      );
    }

    return this.props.children;
  }
}

export default ErrorBoundary;
