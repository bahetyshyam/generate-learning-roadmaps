import React, { createContext, useState, useEffect, ReactNode } from "react";
import { useTranslation } from "react-i18next";

// Define types for LanguageContext values
type LanguageContextType = {
  language: string;
  setLanguage: (language: string) => void;
};

// Create LanguageContext with default values
export const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined
);

interface LanguageProviderProps {
  children: ReactNode; // Type for React children elements
}

export const LanguageProvider: React.FC<LanguageProviderProps> = ({
  children,
}) => {
  const defaultLanguage = "en";
  const localStorageKey = "preferredLanguage";

  const { i18n } = useTranslation();

  // State for selected language
  const [language, setLanguage] = useState<string>(() => {
    const storedLanguage = localStorage.getItem(localStorageKey);
    return storedLanguage ? storedLanguage : defaultLanguage;
  });

  // On mount, check if a language is stored in localStorage
  useEffect(() => {
    const storedLanguage = localStorage.getItem(localStorageKey);
    if (storedLanguage) {
      setLanguage(storedLanguage);
    }
  }, []);

  // Store the language in localStorage whenever it changes
  useEffect(() => {
    i18n.changeLanguage(language);
    localStorage.setItem(localStorageKey, language);
  }, [language]);

  return (
    <LanguageContext.Provider value={{ language, setLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};
