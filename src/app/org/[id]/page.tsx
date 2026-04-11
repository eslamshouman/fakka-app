'use client';

import { useState, use } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ChevronLeft, Building2, Phone, Mail, CheckCircle2 } from 'lucide-react';
import { organizations } from '@/data';
import styles from './org.module.css';

export default function OrgProfile({ params }: { params: Promise<{ id: string }> }) {
  const router = useRouter();
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
        <span className={styles.categoryBadge}>{org.category}</span>
        <div style={{ width: 24 }}></div> {/* Spacer for centering */}
      </header>

      <div className={styles.profileHeader}>
        <div className={styles.avatarLarge}>
          <Building2 size={40} color="var(--color-primary-dark)" />
        </div>
        <h1 className="title-lg" style={{ textAlign: 'center', marginTop: '16px' }}>{org.name}</h1>
        
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
        <h2 className="title-md">About</h2>
        <p className="text-body">{org.description}</p>
      </div>

      <div className={styles.section}>
        <h2 className="title-md">Your Contribution Setup</h2>
        
        <div className={styles.cardBox}>
          <div className={styles.toggleGroup}>
            <button 
              className={`${styles.toggleBtn} ${frequency === 'One-time' ? styles.activeToggle : ''}`}
              onClick={() => setFrequency('One-time')}
            >
              One-time
            </button>
            <button 
              className={`${styles.toggleBtn} ${frequency === 'Monthly' ? styles.activeToggle : ''}`}
              onClick={() => setFrequency('Monthly')}
            >
              Monthly
            </button>
          </div>

          <div style={{ marginTop: '24px' }}>
            <div className="flex-between m-b-16" style={{ marginBottom: '8px' }}>
              <span className={styles.label}>Balance Allocation</span>
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
              We will allocate {allocation}% from your rounded-up balance to {org.name} {frequency.toLowerCase()}.
            </p>
          </div>
          
          <button className="btn-primary" style={{ marginTop: '20px' }} onClick={handleAction}>
            Set as Favorite & Allocate
          </button>
        </div>
      </div>

      <div className={styles.section}>
        <h2 className="title-md">Make a Direct Impact Now</h2>
        <div className={styles.cardBox}>
          <div className={styles.inputWrapper}>
            <span className={styles.currencyPrefix}>EGP</span>
            <input 
              type="number" 
              placeholder="0.00" 
              className={styles.amountInput}
              value={directAmount}
              onChange={(e) => setDirectAmount(e.target.value)}
            />
          </div>
          
          <button className="btn-secondary" style={{ marginTop: '16px' }} onClick={handleAction}>
            Donate Instantly
          </button>
        </div>
      </div>

      {showPopup && (
        <div className={styles.popupOverlay}>
          <div className={`card ${styles.popupCard}`}>
            <CheckCircle2 size={48} color="var(--color-primary-light)" />
            <h2 className="title-lg" style={{ marginTop: '16px' }}>Thank You!</h2>
            <p className="text-body" style={{ textAlign: 'center' }}>
              Your generosity makes a real difference. Your preferences have been successfully saved.
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
