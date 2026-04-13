'use client';

import { useState } from 'react';
import { ShoppingBag, Coffee, Car, ShieldCheck } from 'lucide-react';
import { mockUser, transactions, Transaction } from '@/data';
import styles from './transactions.module.css';
import { useLanguage } from '../../contexts/LanguageContext';

const getMerchantIcon = (merchant: string) => {
  if (merchant.toLowerCase().includes('uber')) return <Car size={20} />;
  if (merchant.toLowerCase().includes('starbucks')) return <Coffee size={20} />;
  return <ShoppingBag size={20} />;
};

export default function TransactionsSettings() {
  const { t } = useLanguage();
  const [maxRoundUp, setMaxRoundUp] = useState(mockUser.maxRoundUp);

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header>
        <h1 className="title-lg">{t('settings.title')}</h1>
        <p className="text-body">{t('settings.subtitle')}</p>
      </header>

      <div className={styles.settingsCard}>
        <div className="flex-between">
          <div>
            <h3 className="title-md" style={{ fontSize: '18px' }}>{t('settings.maxLimit')}</h3>
            <p className="text-body" style={{ fontSize: '13px' }}>{t('settings.highestAmount')}</p>
          </div>
          <div className={styles.limitBadge}>
            {t('home.currency')} {maxRoundUp}
          </div>
        </div>
        
        <input 
          type="range" 
          className={styles.slider} 
          min="1" 
          max="20" 
          step="1"
          value={maxRoundUp} 
          onChange={(e) => setMaxRoundUp(Number(e.target.value))}
          style={{ marginTop: '24px' }}
        />
        <div className="flex-between" style={{ marginTop: '8px', fontSize: '12px', color: 'var(--color-text-muted)', fontWeight: 500 }}>
          <span>1 {t('home.currency')}</span>
          <span>20 {t('home.currency')}</span>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h2 className="title-md" style={{ marginBottom: '16px' }}>{t('settings.recentTx')}</h2>
        
        <div className={styles.txList}>
          {transactions.map((tx: Transaction) => (
            <div key={tx.id} className={`card ${styles.txCard}`}>
              <div className={styles.txIcon}>
                {getMerchantIcon(tx.merchant)}
              </div>
              
              <div className={styles.txDetails}>
                <h4>{t(tx.merchant)}</h4>
                <span className={styles.txDate}>{tx.date}</span>
              </div>
              
              <div className={styles.txAmounts}>
                <div className={styles.originalAmount}>{t('home.currency')} {tx.originalAmount.toFixed(2)}</div>
                <div className={styles.roundUpCut}>
                  +{t('home.currency')} {tx.roundUpCut.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.securityNote}>
        <ShieldCheck size={16} color="var(--color-primary-light)" />
        <span>{t('settings.secure')}</span>
      </div>
    </div>
  );
}
