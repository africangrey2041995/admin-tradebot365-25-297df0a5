
import { useState, useEffect } from 'react';

interface Settings {
  debug: boolean;
  theme: 'light' | 'dark' | 'system';
  language: string;
  notifications: boolean;
}

const defaultSettings: Settings = {
  debug: false,
  theme: 'system',
  language: 'vi',
  notifications: true,
};

export const useSettings = () => {
  const [settings, setSettings] = useState<Settings>(defaultSettings);

  useEffect(() => {
    // Load settings from localStorage
    const savedSettings = localStorage.getItem('app-settings');
    if (savedSettings) {
      try {
        setSettings(JSON.parse(savedSettings));
      } catch (error) {
        console.error('Failed to parse settings:', error);
      }
    }
  }, []);

  const updateSettings = (newSettings: Partial<Settings>) => {
    const updatedSettings = { ...settings, ...newSettings };
    setSettings(updatedSettings);
    localStorage.setItem('app-settings', JSON.stringify(updatedSettings));
  };

  return { settings, updateSettings };
};
