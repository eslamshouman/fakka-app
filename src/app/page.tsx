"use client";

import Link from 'next/link';
import { Plus, Heart, ChevronRight } from 'lucide-react';
import { mockUser, organizations } from '@/data';
import styles from './home.module.css';
import { useLanguage } from '../contexts/LanguageContext';

export default function Home() {
  const { t, language } = useLanguage();

  const favoriteOrgsInfo = mockUser.favorites.map(fav => {
    const orgInfo = organizations.find(o => o.id === fav.orgId);
    return { ...fav, ...orgInfo };
  });

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header className={styles.header}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
          <img src={language === 'ar' ? '/logo-ar.png' : '/logo.png'} alt="Fakka Logo" style={{ height: '90px', objectFit: 'contain' }} />
        </div>
        <div className={styles.avatar}>
          {t(mockUser.name).charAt(0)}
        </div>
      </header>

      <div className={styles.balanceCard}>
        <span className={styles.balanceLabel}>{t('home.balanceTitle')}</span>
        <h1 className={styles.balanceAmount}>
          <span className={styles.currency}>{t('home.currency')}</span> {mockUser.balance.toFixed(2)}
        </h1>
        <div className={styles.balanceBackground}></div>
      </div>

      <div className={styles.favoritesSection}>
        <div className="flex-between m-b-16" style={{ marginBottom: '16px' }}>
          <h2 className="title-md">{t('home.yourCharities')}</h2>
        </div>

        {favoriteOrgsInfo.length > 0 ? (
          <div className={styles.favoritesList}>
            {favoriteOrgsInfo.map((org, index) => (
              <div key={index} className="card flex-between" style={{ padding: '12px 16px', marginBottom: '12px' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div className={styles.orgIcon}>
                    <Heart size={20} color="var(--color-accent-light)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary-dark)' }}>
                      {t(org.name)}
                    </h3>
                    <p style={{ fontSize: '13px', color: 'var(--color-text-muted)' }}>
                      {org.percentage}% {t('home.allocation')} • {org.frequency}
                    </p>
                  </div>
                </div>
                <Link href={`/org/${org.id}`} style={{ color: 'var(--color-primary-light)' }}>
                  <ChevronRight size={20} />
                </Link>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-body" style={{ textAlign: 'center', padding: '20px 0' }}>
            {t('home.noFavorites')}
          </p>
        )}

        <Link href="/discovery" className={styles.addBtnWrapper} style={{ marginTop: '20px', display: 'block' }}>
          <button className="btn-primary" style={{ gap: '8px' }}>
            <Plus size={20} /> {t('home.addNonProfit')}
          </button>
        </Link>
      </div>
    </div>
  );
}
