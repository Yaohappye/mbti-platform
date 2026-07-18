'use client';

import React, { createContext, useContext, useState, useCallback, useEffect } from 'react';
import zhMessages from '../../messages/zh.json';
import enMessages from '../../messages/en.json';
import esMessages from '../../messages/es.json';
import frMessages from '../../messages/fr.json';
import deMessages from '../../messages/de.json';
import ruMessages from '../../messages/ru.json';
import jaMessages from '../../messages/ja.json';
import koMessages from '../../messages/ko.json';
import ptMessages from '../../messages/pt.json';
import arMessages from '../../messages/ar.json';

type Locale = 'zh' | 'en' | 'es' | 'fr' | 'de' | 'ru' | 'ja' | 'ko' | 'pt' | 'ar';

interface I18nContextType {
  locale: Locale;
  setLocale: (locale: Locale) => void;
  t: (key: string, vars?: Record<string, string | number>) => string;
}

const messagesMap: Record<Locale, Record<string, unknown>> = {
  zh: zhMessages,
  en: enMessages,
  es: esMessages,
  fr: frMessages,
  de: deMessages,
  ru: ruMessages,
  ja: jaMessages,
  ko: koMessages,
  pt: ptMessages,
  ar: arMessages,
};

const I18nContext = createContext<I18nContextType | null>(null);

export function useI18n() {
  const context = useContext(I18nContext);
  if (!context) {
    throw new Error('useI18n must be used within I18nProvider');
  }
  return context;
}

interface I18nProviderProps {
  children: React.ReactNode;
}

export function I18nProvider({ children }: I18nProviderProps) {
  // 从localStorage读取保存的语言设置，默认为中文
  const [locale, setLocaleState] = useState<Locale>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('mbti-locale') as Locale;
      if (saved && messagesMap[saved]) {
        return saved;
      }
    }
    return 'zh';
  });

  // 初始化时设置document的lang和dir
  useEffect(() => {
    if (typeof window !== 'undefined') {
      document.documentElement.lang = locale;
      if (locale === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, [locale]);

  const setLocale = useCallback((newLocale: Locale) => {
    setLocaleState(newLocale);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mbti-locale', newLocale);
      document.documentElement.lang = newLocale;
      if (newLocale === 'ar') {
        document.documentElement.dir = 'rtl';
      } else {
        document.documentElement.dir = 'ltr';
      }
    }
  }, []);

  const t = useCallback(
    (key: string, vars?: Record<string, string | number>): string => {
      const keys = key.split('.');
      let value: unknown = messagesMap[locale];

      for (const k of keys) {
        if (value && typeof value === 'object' && k in value) {
          value = (value as Record<string, unknown>)[k];
        } else {
          return key;
        }
      }

      if (typeof value === 'string') {
        // Replace variables like {count} with actual values
        if (vars) {
          return Object.entries(vars).reduce(
            (str, [varKey, varValue]) => str.replace(new RegExp(`{${varKey}}`, 'g'), String(varValue)),
            value
          );
        }
        return value;
      }
      return key;
    },
    [locale]
  );

  return (
    <I18nContext.Provider value={{ locale, setLocale, t }}>
      {children}
    </I18nContext.Provider>
  );
}
