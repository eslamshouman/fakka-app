"use client";

import Link from 'next/link';
import { Home, Compass, Settings2, User } from 'lucide-react';
import styles from './NavBar.module.css';
import { useLanguage } from '../contexts/LanguageContext';

export default function NavBar() {
  const { t } = useLanguage();

  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navItem}>
        <Home size={24} />
        <span>{t('nav.home')}</span>
      </Link>
      
      <Link href="/discovery" className={styles.navItem}>
        <Compass size={24} />
        <span>{t('nav.discover')}</span>
      </Link>

      <Link href="/transactions" className={styles.navItem}>
        <Settings2 size={24} />
        <span>{t('nav.settings')}</span>
      </Link>

      <Link href="/profile" className={styles.navItem}>
        <User size={24} />
        <span>{t('nav.profile')}</span>
      </Link>
    </nav>
  );
}
