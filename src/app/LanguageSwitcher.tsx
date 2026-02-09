'use client';

import { useLocale } from 'next-intl';
import { locales, localeNames, localeFlags, type Locale } from '@/i18n';
import { useTransition } from 'react';

export function LanguageSwitcher() {
  const locale = useLocale() as Locale;
  const [isPending, startTransition] = useTransition();

  const handleLocaleChange = (newLocale: Locale) => {
    if (newLocale === locale) return;

    startTransition(() => {
      // Get current pathname (without hash or query)
      const currentPath = window.location.pathname;
      const currentHash = window.location.hash;
      
      // Remove current locale prefix if it exists
      let pathWithoutLocale = currentPath;
      
      // If current path starts with a locale, strip it
      if (currentPath === `/${locale}`) {
        pathWithoutLocale = '/';
      } else if (currentPath.startsWith(`/${locale}/`)) {
        pathWithoutLocale = currentPath.substring(`/${locale}`.length);
      }
      
      // Build new path with target locale (no prefix for English)
      const newPath = newLocale === 'en' 
        ? pathWithoutLocale 
        : `/${newLocale}${pathWithoutLocale}`;
      
      // Add hash back if it exists
      const fullPath = newPath + currentHash;
      
      // Force a complete page reload to bypass any middleware caching
      window.location.replace(fullPath);
    });
  };

  return (
    <div className="flex items-center gap-3">
      {locales.map((loc) => (
        <button
          key={loc}
          onClick={() => handleLocaleChange(loc)}
          disabled={isPending}
          className={`flex items-center gap-2 px-3 py-2 rounded-sm transition-all ${
            loc === locale
              ? 'bg-[#D4AF37] text-black font-semibold'
              : 'bg-[#D4AF37]/10 text-[#D4AF37] hover:bg-[#D4AF37]/20 border border-[#D4AF37]/30'
          }`}
          title={localeNames[loc]}
        >
          <span className="text-xl">{localeFlags[loc]}</span>
          <span className="text-sm">{localeNames[loc]}</span>
        </button>
      ))}
    </div>
  );
}
