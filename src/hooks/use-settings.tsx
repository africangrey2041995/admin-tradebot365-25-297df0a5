
import { useState } from "react";

interface Settings {
  debug: boolean;
  notifications: boolean;
  darkMode: boolean;
  language: string;
}

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>({
    debug: false,
    notifications: true,
    darkMode: false,
    language: "en",
  });

  const updateSettings = (newSettings: Partial<Settings>) => {
    setSettings((prev) => ({ ...prev, ...newSettings }));
  };

  return { settings, updateSettings };
};
