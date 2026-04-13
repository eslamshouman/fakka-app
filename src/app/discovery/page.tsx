"use client";

import { useState } from 'react';
import Link from 'next/link';
import { Search, ChevronRight, ChevronDown, Building2 } from 'lucide-react';
import { categories, organizations } from '@/data';
import styles from './discovery.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Discovery() {
  const { t } = useLanguage();
  const [expandedCategories, setExpandedCategories] = useState<Record<string, boolean>>({});

  // Only show categories that have organizations in our mock data
  const populatedCategories = categories.filter(category => 
    organizations.some(org => org.category === category)
  );

  const toggleCategory = (category: string) => {
    setExpandedCategories(prev => ({
      ...prev,
      [category]: !prev[category]
    }));
  };

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header>
        <h1 className="title-lg">{t('discovery.title')}</h1>
        <p className="text-body flex-between">
          {t('discovery.subtitle')}
        </p>
      </header>

      <div className={styles.searchBar}>
        <Search size={20} color="var(--color-text-muted)" />
        <input 
          type="text" 
          placeholder={t('discovery.search')} 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categoryList}>
        {populatedCategories.map(category => (
          <div key={category} className={styles.categorySection}>
            <button 
              className={styles.categoryHeader} 
              onClick={() => toggleCategory(category)}
            >
              <h2 className={styles.categoryTitle}>{t(category)}</h2>
              {expandedCategories[category] ? (
                <ChevronDown size={20} color="var(--color-text-muted)" />
              ) : (
                <ChevronRight size={20} color="var(--color-text-muted)" />
              )}
            </button>
            
            {expandedCategories[category] && (
              <div className={styles.orgList}>
                {organizations.filter(org => org.category === category).map(org => (
                  <Link href={`/org/${org.id}`} key={org.id} className={`card ${styles.orgCard}`}>
                    <div className={styles.orgAvatar}>
                      <Building2 size={22} color="var(--color-primary-dark)" />
                    </div>
                    <div className={styles.orgInfo}>
                      <h3>{t(org.name)}</h3>
                      <p className="text-body" style={{ fontSize: '13px', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                        {t(org.description)}
                      </p>
                    </div>
                    <ChevronRight size={20} color="var(--color-primary-light)" />
                  </Link>
                ))}
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
