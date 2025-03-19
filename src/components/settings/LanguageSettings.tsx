
import React, { useState } from 'react';
import { CheckIcon, ChevronsUpDown } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/components/ui/command";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";
import { useLanguage, Language } from '@/contexts/LanguageContext';

const languages = [
  { label: "Tiếng Việt", value: "vi" },
  { label: "English", value: "en" },
  { label: "中文", value: "zh" },
  { label: "Español", value: "es", disabled: true },
  { label: "Français", value: "fr", disabled: true },
  { label: "日本語", value: "ja", disabled: true },
  { label: "한국어", value: "ko", disabled: true },
  { label: "Deutsch", value: "de", disabled: true },
  { label: "Italiano", value: "it", disabled: true },
  { label: "Português", value: "pt", disabled: true },
];

const timezones = [
  { label: "UTC+7:00 - Hà Nội, Bangkok", value: "Asia/Ho_Chi_Minh" },
  { label: "UTC+8:00 - Hong Kong, Singapore", value: "Asia/Singapore" },
  { label: "UTC+9:00 - Tokyo, Seoul", value: "Asia/Tokyo" },
  { label: "UTC+0:00 - London, Lisbon", value: "Europe/London" },
  { label: "UTC-5:00 - New York", value: "America/New_York" },
  { label: "UTC-8:00 - Los Angeles", value: "America/Los_Angeles" },
];

const dateFormats = [
  { label: "DD/MM/YYYY", value: "dd/MM/yyyy" },
  { label: "MM/DD/YYYY", value: "MM/dd/yyyy" },
  { label: "YYYY-MM-DD", value: "yyyy-MM-dd" },
];

const timeFormats = [
  { label: "12 giờ (AM/PM)", value: "12" },
  { label: "24 giờ", value: "24" },
];

const LanguageSettings = () => {
  const [open, setOpen] = useState(false);
  const { toast } = useToast();
  const { language, setLanguage, t } = useLanguage();
  
  const handleLanguageSelect = (currentValue: string) => {
    setLanguage(currentValue as Language);
    setOpen(false);
    
    const selectedLang = languages.find(lang => lang.value === currentValue);
    
    toast({
      title: t('Display Language') + ' ' + t('changed'),
      description: `${t('The application will be displayed in')} ${selectedLang?.label || currentValue}.`,
    });
  };

  const handleTimezoneChange = (value: string) => {
    const selectedTimezone = timezones.find(tz => tz.value === value);
    
    toast({
      title: t('Timezone') + ' ' + t('changed'),
      description: `${t('Timezone has been set to')} ${selectedTimezone?.label || value}.`,
    });
  };

  const handleFormatChange = (type: string, value: string) => {
    toast({
      title: `${type === 'date' ? t('Date Format') : t('Time Format')} ${t('changed')}`,
      description: `${type === 'date' ? t('Date Format') : t('Time Format')} ${t('has been set to')} ${value}.`,
    });
  };

  return (
    <div className="space-y-8">
      {/* Language Selection */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Display Language')}</h3>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button
              variant="outline"
              role="combobox"
              aria-expanded={open}
              className="w-full justify-between"
            >
              {language ? languages.find(lang => lang.value === language)?.label : t('Select language')}
              <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder={t('Search...')} />
              <CommandEmpty>{t('No language found.')}</CommandEmpty>
              <CommandGroup>
                {languages.map((lang) => (
                  <CommandItem
                    key={lang.value}
                    value={lang.value}
                    onSelect={handleLanguageSelect}
                    disabled={lang.disabled}
                    className={lang.disabled ? "opacity-50 cursor-not-allowed" : ""}
                  >
                    <CheckIcon
                      className={cn(
                        "mr-2 h-4 w-4",
                        language === lang.value ? "opacity-100" : "opacity-0"
                      )}
                    />
                    {lang.label}
                  </CommandItem>
                ))}
              </CommandGroup>
            </Command>
          </PopoverContent>
        </Popover>
      </div>

      {/* Timezone */}
      <div className="space-y-4">
        <h3 className="text-lg font-medium">{t('Timezone')}</h3>
        <Select defaultValue="Asia/Ho_Chi_Minh" onValueChange={handleTimezoneChange}>
          <SelectTrigger className="w-full">
            <SelectValue placeholder={t('Select timezone')} />
          </SelectTrigger>
          <SelectContent>
            {timezones.map((timezone) => (
              <SelectItem key={timezone.value} value={timezone.value}>
                {timezone.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Date & Time Format */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t('Date Format')}</h3>
          <Select defaultValue="dd/MM/yyyy" onValueChange={(value) => handleFormatChange('date', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('Select date format')} />
            </SelectTrigger>
            <SelectContent>
              {dateFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>

        <div className="space-y-4">
          <h3 className="text-lg font-medium">{t('Time Format')}</h3>
          <Select defaultValue="24" onValueChange={(value) => handleFormatChange('time', value)}>
            <SelectTrigger className="w-full">
              <SelectValue placeholder={t('Select time format')} />
            </SelectTrigger>
            <SelectContent>
              {timeFormats.map((format) => (
                <SelectItem key={format.value} value={format.value}>
                  {format.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>
    </div>
  );
};

export default LanguageSettings;
