// src/LanguageSwitcher.jsx
import React from 'react';
import { useLang } from './LanguageContext';
import './LanguageSwitcher.css';

export default function LanguageSwitcher() {
  const { lang, toggleLang } = useLang();
  return (
    <button
      className="lang-switcher"
      onClick={toggleLang}
      title={lang === 'en' ? '切换为简体中文' : 'Switch to English'}
      aria-label="Toggle language"
    >
      <span className={`lang-option ${lang === 'en' ? 'lang-active' : ''}`}>EN</span>
      <span className="lang-divider">|</span>
      <span className={`lang-option ${lang === 'zh' ? 'lang-active' : ''}`}>中文</span>
    </button>
  );
}