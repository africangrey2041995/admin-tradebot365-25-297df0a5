
import { useState } from "react";
import { ToastProps } from "./toast";

// Ensure Toast type includes id as required field
interface Toast extends ToastProps {
  id: string;
}

export const useToast = () => {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const toast = (props: ToastProps) => {
    const id = props.id || Math.random().toString(36).substring(2, 9);
    const newToast: Toast = { ...props, id };
    setToasts((prev) => [...prev, newToast]);

    if (props.duration !== Infinity) {
      setTimeout(() => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
      }, props.duration || 3000);
    }

    return {
      id,
      dismiss: () => setToasts((prev) => prev.filter((t) => t.id !== id)),
      update: (props: ToastProps) => {
        setToasts((prev) =>
          prev.map((t) => (t.id === id ? { ...t, ...props, id } : t))
        );
      },
    };
  };

  return {
    toast,
    toasts,
    dismiss: (id: string) => setToasts((prev) => prev.filter((t) => t.id !== id)),
    dismissAll: () => setToasts([]),
  };
};
