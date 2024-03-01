import React from "react";
import en from "./en-us.json";
import zh from "./zh-cn.json";

type Language = "en-us" | "zh-cn";

export const LocaleContext = React.createContext<{
  language: Language;
  setLanguage?: React.Dispatch<React.SetStateAction<Language>>;
}>({ language: "zh-cn" });

export const LocaleContextProvider = ({
  children,
}: {
  children: React.ReactNode;
}) => {
  const [language, setLanguage] = React.useState<Language>("zh-cn");
  return (
    <LocaleContext.Provider value={{ language, setLanguage }}>
      {children}
    </LocaleContext.Provider>
  );
};

export function useLocaleContext() {
  return React.useContext(LocaleContext);
}

export const Format = ({ id }: { id: string }) => {
  const { language } = React.useContext(LocaleContext);
  const value = language === "en-us" ? (en as any)[id] : (zh as any)[id];
  return value ?? id;
};

export function useFormat(id: string | number) {
  const { language } = React.useContext(LocaleContext);
  const value = language === "en-us" ? (en as any)[id] : (zh as any)[id];
  return value;
}
