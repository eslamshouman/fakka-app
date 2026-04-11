import Link from 'next/link';
import { Home, Compass, Settings2, User } from 'lucide-react';
import styles from './NavBar.module.css';

export default function NavBar() {
  return (
    <nav className={styles.navbar}>
      <Link href="/" className={styles.navItem}>
        <Home size={24} />
        <span>Home</span>
      </Link>
      
      <Link href="/discovery" className={styles.navItem}>
        <Compass size={24} />
        <span>Discover</span>
      </Link>

      <Link href="/transactions" className={styles.navItem}>
        <Settings2 size={24} />
        <span>Settings</span>
      </Link>

      <Link href="/profile" className={styles.navItem}>
        <User size={24} />
        <span>Profile</span>
      </Link>
    </nav>
  );
}
