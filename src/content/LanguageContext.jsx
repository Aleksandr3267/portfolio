import { createContext, useContext, useEffect, useMemo, useState } from "react";
import en from "./en.js";
import ru from "./ru.js";

const dictionaries = { en, ru };
const STORAGE_KEY = "lang";


function getInitialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "en" || saved === "ru") return saved;
  } catch {
    
  }
  return navigator.language?.toLowerCase().startsWith("ru") ? "ru" : "en";
}

const LanguageContext = createContext(null);

export function LanguageProvider({ children }) {

  const [lang, setLang] = useState(getInitialLang);


  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {
     
    }
    document.documentElement.lang = lang;
  }, [lang]);

  const value = useMemo(
    () => ({
      lang,
      toggleLang: () => setLang((current) => (current === "en" ? "ru" : "en")),
      t: dictionaries[lang],
    }),
    [lang]
  );

  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>;
}

export function useLanguage() {
  const ctx = useContext(LanguageContext);
  if (!ctx) {
    throw new Error("useLanguage must be used inside a LanguageProvider");
  }
  return ctx;
}
