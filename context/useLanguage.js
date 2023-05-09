import { createContext, useContext } from 'react';

const languageContext = createContext(null);

export const LanguageProvider = languageContext.Provider;

export const useLanguage = () => useContext(languageContext);
