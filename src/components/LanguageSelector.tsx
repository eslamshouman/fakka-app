"use client";

import { useLanguage } from '../contexts/LanguageContext';
import { Globe } from 'lucide-react';

export default function LanguageSelector() {
  const { language, toggleLanguage } = useLanguage();

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: language === 'en' ? 'flex-end' : 'flex-end', // always to the visually outer edge based on RTL
      padding: '16px 16px 0 16px',
      marginBottom: '-8px', // pull up the content slightly so it flows nicer
      width: '100%',
      boxSizing: 'border-box'
    }}>
      <button 
        onClick={toggleLanguage}
        style={{
          background: 'rgba(255, 255, 255, 0.9)',
          border: '1px solid rgba(0,0,0,0.1)',
          padding: '6px 12px',
          borderRadius: '20px',
          display: 'flex',
          alignItems: 'center',
          gap: '6px',
          cursor: 'pointer',
          boxShadow: 'var(--shadow-sm)',
          fontWeight: 600,
          color: 'var(--color-primary-dark)',
          fontFamily: 'inherit',
          fontSize: '13px'
        }}
      >
        <Globe size={16} />
        <span>{language === 'en' ? 'عربي' : 'EN'}</span>
      </button>
    </div>
  );
}
