import * as React from 'react';
import language from './data';

type LanguageContext = typeof language.en;

const LanguageContext = React.createContext<LanguageContext>(language.en);

type Props = {
  lang: keyof typeof language;
};

export const LanguageProvider: React.FC<Props> = ({ children, lang }) => (
  <LanguageContext.Provider value={{ ...language[lang] }}>
    {children}
  </LanguageContext.Provider>
);

export const useTranslation = () => React.useContext(LanguageContext);
