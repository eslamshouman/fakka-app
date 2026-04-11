import Link from 'next/link';
import { Search, ChevronRight, Building2 } from 'lucide-react';
import { categories, organizations } from '@/data';
import styles from './discovery.module.css';

export default function Discovery() {
  // Only show categories that have organizations in our mock data
  const populatedCategories = categories.filter(category => 
    organizations.some(org => org.category === category)
  );

  return (
    <div className={`animate-slide-up ${styles.container}`}>
      <header>
        <h1 className="title-lg">Discover</h1>
        <p className="text-body flex-between">
          Find and support organizations that matter to you.
        </p>
      </header>

      <div className={styles.searchBar}>
        <Search size={20} color="var(--color-text-muted)" />
        <input 
          type="text" 
          placeholder="Search Non-profits..." 
          className={styles.searchInput}
        />
      </div>

      <div className={styles.categoryList}>
        {populatedCategories.map(category => (
          <div key={category} className={styles.categorySection}>
            <h2 className={styles.categoryTitle}>{category}</h2>
            
            <div className={styles.orgList}>
              {organizations.filter(org => org.category === category).map(org => (
                <Link href={`/org/${org.id}`} key={org.id} className={`card ${styles.orgCard}`}>
                  <div className={styles.orgAvatar}>
                    <Building2 size={22} color="var(--color-primary-dark)" />
                  </div>
                  <div className={styles.orgInfo}>
                    <h3>{org.name}</h3>
                    <p className="text-body" style={{ fontSize: '13px', marginTop: '4px', display: '-webkit-box', WebkitLineClamp: 2, WebkitBoxOrient: 'vertical', overflow: 'hidden' }}>
                      {org.description}
                    </p>
                  </div>
                  <ChevronRight size={20} color="var(--color-primary-light)" />
                </Link>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
