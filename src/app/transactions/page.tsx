'use client';

import { useState } from 'react';
import { ShoppingBag, Coffee, Car, ShieldCheck } from 'lucide-react';
import { mockUser, transactions, Transaction } from '@/data';
import styles from './transactions.module.css';

const getMerchantIcon = (merchant: string) => {
  if (merchant.toLowerCase().includes('uber')) return <Car size={20} />;
  if (merchant.toLowerCase().includes('starbucks')) return <Coffee size={20} />;
  return <ShoppingBag size={20} />;
};

export default function TransactionsSettings() {
  const [maxRoundUp, setMaxRoundUp] = useState(mockUser.maxRoundUp);

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header>
        <h1 className="title-lg">Round-up Settings</h1>
        <p className="text-body">Manage how your transactions generate change.</p>
      </header>

      <div className={styles.settingsCard}>
        <div className="flex-between">
          <div>
            <h3 className="title-md" style={{ fontSize: '18px' }}>Max Round-Up Limit</h3>
            <p className="text-body" style={{ fontSize: '13px' }}>Highest amount to round up per transaction</p>
          </div>
          <div className={styles.limitBadge}>
            EGP {maxRoundUp}
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
          <span>1 EGP</span>
          <span>20 EGP</span>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h2 className="title-md" style={{ marginBottom: '16px' }}>Recent Transactions</h2>
        
        <div className={styles.txList}>
          {transactions.map((tx: Transaction) => (
            <div key={tx.id} className={`card ${styles.txCard}`}>
              <div className={styles.txIcon}>
                {getMerchantIcon(tx.merchant)}
              </div>
              
              <div className={styles.txDetails}>
                <h4>{tx.merchant}</h4>
                <span className={styles.txDate}>{tx.date}</span>
              </div>
              
              <div className={styles.txAmounts}>
                <div className={styles.originalAmount}>EGP {tx.originalAmount.toFixed(2)}</div>
                <div className={styles.roundUpCut}>
                  +EGP {tx.roundUpCut.toFixed(2)}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className={styles.securityNote}>
        <ShieldCheck size={16} color="var(--color-primary-light)" />
        <span>Your connection is securely encrypted.</span>
      </div>
    </div>
  );
}
