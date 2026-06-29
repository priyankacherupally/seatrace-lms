import { useState } from 'react';
import { Input } from 'antd';
import { SearchOutlined } from '@ant-design/icons';
import styles from './KnowledgeHubPage.module.scss';

const CATEGORIES = [
  { id: 'forms', label: 'Forms' },
  { id: 'master-forms', label: 'Master Forms' },
  { id: 'quality-control', label: 'Quality Control' },
];

export default function KnowledgeHubPage() {
  const [search, setSearch] = useState('');

  const filtered = CATEGORIES.filter((c) =>
    c.label.toLowerCase().includes(search.toLowerCase()),
  );

  return (
    <div className={styles.page}>
      <div className={styles.container}>
        <div className={styles.header}>
          <h2 className={styles.title}>Knowledge Bar</h2>
          <Input
            className={styles.search}
            prefix={<SearchOutlined className={styles.searchIcon} />}
            placeholder="Search..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        <div className={styles.cards}>
          {filtered.map((cat) => (
            <div key={cat.id} className={styles.card}>
              <span className={styles.cardLabel}>{cat.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
