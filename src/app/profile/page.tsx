'use client';

import { Settings, LogOut, TrendingUp, HandHeart, Sparkles } from 'lucide-react';
import { mockUser, organizations } from '@/data';
import styles from './profile.module.css';

export default function Profile() {
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
      return `${count}x ${primaryMetric.impact}`;
    }
    return "General operational support";
  };

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header className={styles.header}>
        <div className={styles.userInfo}>
          <div className={styles.avatarLarge}>
            {mockUser.name.charAt(0)}
          </div>
          <div>
            <h1 className="title-md" style={{ marginBottom: 0 }}>{mockUser.name}</h1>
            <p className="text-body" style={{ fontSize: '13px' }}>Member since {mockUser.memberSince}</p>
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
            <p className="text-body" style={{ fontSize: '13px' }}>Total Donated</p>
            <h2 className="title-md">EGP {mockUser.totalDonated}</h2>
          </div>
        </div>
        <div className={`card ${styles.statCard}`}>
          <TrendingUp size={24} color="var(--color-accent-dark)" className={styles.statIcon} />
          <div>
            <p className="text-body" style={{ fontSize: '13px' }}>Avg/Month</p>
            <h2 className="title-md">EGP {mockUser.avgSpendPerMonth}</h2>
          </div>
        </div>
      </div>

      <div style={{ marginTop: '12px' }}>
        <h2 className="title-md" style={{ marginBottom: '16px' }}>Your Local Impact</h2>
        
        <div className={styles.impactList}>
          {mockUser.favorites.map((fav, i) => {
            const org = organizations.find(o => o.id === fav.orgId);
            const allocatedAmount = (mockUser.totalDonated * fav.percentage) / 100;
            const impactString = getImpact(fav.orgId, allocatedAmount);

            return (
              <div key={i} className={`card ${styles.impactCard}`}>
                <div className="flex-between">
                  <h3 style={{ fontSize: '15px', fontWeight: '600', color: 'var(--color-primary-dark)' }}>
                    {org?.name}
                  </h3>
                  <span className={styles.allocatedAmount}>EGP {allocatedAmount}</span>
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
        <button className={styles.listItem}>
          <Settings size={20} />
          <span>Account Settings</span>
        </button>
        <button className={styles.listItem}>
          <HandHeart size={20} />
          <span>Tax Receipts</span>
        </button>
      </div>
    </div>
  );
}
