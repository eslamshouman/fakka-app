'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Building2, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { organizations } from '@/data';
import styles from './org.module.css';
import { useLanguage } from '../../../contexts/LanguageContext';

export default function OrgProfile({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
  const { t } = useLanguage();
  const { id } = use(params);
  const org = organizations.find(o => o.id === id);

  const [frequency, setFrequency] = useState<'One-time' | 'Monthly'>('Monthly');
  const [allocation, setAllocation] = useState(10);
  const [directAmount, setDirectAmount] = useState('');

  const [showPopup, setShowPopup] = useState(false);

  if (!org) return <div style={{ padding: '20px' }}>Organization not found.</div>;

  const handleAction = () => {
    setShowPopup(true);
    setTimeout(() => {
      setShowPopup(false);
      router.push('/');
    }, 2500);
  };

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header className={styles.header}>
        <button onClick={() => router.back()} className={styles.backBtn}>
          <ChevronLeft size={24} color="var(--color-primary-dark)" />
        </button>
        <span className={styles.categoryBadge}>{t(org.category)}</span>
        <div style={{ width: 24 }}></div> {/* Spacer for centering */}
      </header>

      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>
          <Building2 size={40} color="var(--color-primary-dark)" />
        </div>
        <h1 className="title-lg" style={{ textAlign: 'center', marginTop: '16px' }}>{t(org.name)}</h1>

        <div className={styles.contactRow}>
          <div className={styles.contactItem}>
            <Phone size={16} /> <span>{org.contact}</span>
          </div>
          <div className={styles.contactItem}>
            <Mail size={16} /> <span>{org.email}</span>
          </div>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className="title-md">{t('org.about')}</h2>
        <p className="text-body">{t(org.description)}</p>
      </div>

      <div className={styles.section}>
        <h2 className="title-md">{t('org.contributionSetup')}</h2>

        <div className={styles.cardBox}>
          <div className={styles.toggleGroup}>
            <button
              className={`${styles.toggleBtn} ${frequency === 'One-time' ? styles.activeToggle : ''}`}
              onClick={() => setFrequency('One-time')}
            >
              {t('org.onetime')}
            </button>
            <button
              className={`${styles.toggleBtn} ${frequency === 'Monthly' ? styles.activeToggle : ''}`}
              onClick={() => setFrequency('Monthly')}
            >
              {t('org.monthly')}
            </button>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div className="flex-between m-b-16" style={{ marginBottom: '8px' }}>
              <span className={styles.label}>{t('org.balanceAllocation')}</span>
              <span className={styles.valueHighlight}>{allocation}%</span>
            </div>
            <input
              type="range"
              className={styles.slider}
              min="1"
              max="100"
              value={allocation}
              onChange={(e) => setAllocation(Number(e.target.value))}
            />
            <p style={{ fontSize: '12px', color: 'var(--color-text-muted)', marginTop: '8px' }}>
              {t('org.allocatePrefix')} {allocation}% {t('org.allocateMid')} {t(org.name)} {t(frequency === 'Monthly' ? 'org.monthly' : 'org.onetime')}.
            </p>
          </div>

          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={handleAction}>
            {t('org.setFavorite')}
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className="title-md">{t('org.directImpact')}</h2>
        <div className={styles.cardBox}>
          <div className={styles.inputWrapper}>
            <span className={styles.currencyPrefix}>{t('home.currency')}</span>
            <input
              type="number"
              placeholder="0.00"
              className={styles.amountInput}
              value={directAmount}
              onChange={(e) => setDirectAmount(e.target.value)}
            />
          </div>

          <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={handleAction}>
            {t('org.donateInstantly')}
          </button>
        </div>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={`card ${styles.popupCard}`}>
            <CheckCircle2 size={48} color="var(--color-primary-light)" />
            <h2 className="title-lg" style={{ marginTop: '16px' }}>{t('org.thankYou')}</h2>
            <p className="text-body" style={{ textAlign: 'center' }}>
              {t('org.thankYouMsg')}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
