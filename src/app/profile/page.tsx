'use client';

import { Settings, LogOut, TrendingUp, HandHeart, Sparkles, Globe } from 'lucide-react';
import { mockUser, organizations } from '@/data';
import styles from './profile.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

export default function Profile() {
  const { t, language, toggleLanguage } = useLanguage();

  const getImpact = (orgId: string, amount: number) => {
    const org = organizations.find(o => o.id === orgId);
    if (!org) return "Support provided";
    
    // Find highest matching impact metric
    const eligibleMetrics = org.impactMetrics.filter(m => amount >= m.amount);
    if (eligibleMetrics.length > 0) {
      // Sort descending by amount
      eligibleMetrics.sort((a, b) => b.amount - a.amount);
      const primaryMetric = eligibleMetrics[0];
      const count = Math.floor(amount / primaryMetric.amount);
      return `${count}x ${t(primaryMetric.impact)}`;
    }
    return t('profile.generalSupport');
  };

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarLarge}>
            {t(mockUser.name).charAt(0)}
          </div>
          <div>
            <h1 className="title-md" style={{ marginBottom: 0 }}>{t(mockUser.name)}</h1>
            <p className="text-body" style={{ fontSize: '13px' }}>{t('profile.memberSince')} {mockUser.memberSince}</p>
          </div>
        </div>
        <button className={styles.iconBtn}>
          <LogOut size={20} color="var(--color-primary-dark)" />
        </button>
      </header>

      <div className={styles.dashboardStats}>
        <div className={`card ${styles.statCard}`}>
          <HandHeart size={24} color="var(--color-primary-light)" className={styles.statIcon} />
          <div>
            <p className="text-body" style={{ fontSize: '13px' }}>{t('profile.totalDonated')}</p>
            <h2 className="title-md">{t('home.currency')} {mockUser.totalDonated}</h2>
          </div>
        </div>
        <div className={`card ${styles.statCard}`}>
          <TrendingUp size={24} color="var(--color-accent-dark)" className={styles.statIcon} />
          <div>
            <p className="text-body" style={{ fontSize: '13px' }}>{t('profile.avgMonth')}</p>
            <h2 className="title-md">{t('home.currency')} {mockUser.avgSpendPerMonth}</h2>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h2 className="title-md" style={{ marginBottom: '16px' }}>{t('profile.localImpact')}</h2>
        
        <div className={styles.impactList}>
          {mockUser.favorites.map((fav, i) => {
            const org = organizations.find(o => o.id === fav.orgId);
            const allocatedAmount = (mockUser.totalDonated * fav.percentage) / 100;
            const impactString = getImpact(fav.orgId, allocatedAmount);

            return (
              <div key={i} className={`card ${styles.impactCard}`}>
                <div className="flex-between">
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary-dark)' }}>
                    {org?.name ? t(org.name) : ""}
                  </h3>
                  <span className={styles.allocatedAmount}>{t('home.currency')} {allocatedAmount}</span>
                </div>
                
                <div className={styles.impactHighlight}>
                  <Sparkles size={16} color="var(--color-accent-dark)" />
                  <span style={{ fontSize: '14px', fontWeight: '500', color: 'var(--color-text-main)' }}>
                    {impactString}
                  </span>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      <div className={styles.actionLinks}>
        <button className={styles.listItem} onClick={toggleLanguage} style={{ display: 'flex', justifyContent: 'space-between', width: '100%', border: 'none', background: 'none' }}>
          <div style={{ display: 'flex', gap: '12px', alignItems: 'center' }}>
            <Globe size={20} color="var(--color-primary-dark)" />
            <span>{t('settings.language')}</span>
          </div>
          <span style={{ fontSize: '13px', color: 'var(--color-primary-light)', fontWeight: 600 }}>
             {language === 'en' ? 'عربي' : 'EN'}
          </span>
        </button>
        <button className={styles.listItem}>
          <Settings size={20} />
          <span>{t('profile.accountSettings')}</span>
        </button>
        <button className={styles.listItem}>
          <HandHeart size={20} />
          <span>{t('profile.taxReceipts')}</span>
        </button>
      </div>
    </div>
  );
}
