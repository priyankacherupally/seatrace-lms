import { HomeOutlined, BookOutlined } from '@ant-design/icons';
import { useNavigate, useLocation } from 'react-router-dom';
import styles from './Navbar.module.scss';

const SeatraceLogo = () => (
  <svg width="34" height="34" viewBox="0 0 34 34" fill="none" xmlns="http://www.w3.org/2000/svg">
    <circle cx="17" cy="17" r="15.5" stroke="#111111" strokeWidth="1.3"/>
    <path
      d="M10 22 C12 16 14.5 11 17 17 C19.5 23 22 18 24 12"
      stroke="#111111" strokeWidth="1.4" strokeLinecap="round" fill="none"
    />
    <circle cx="17" cy="17" r="1.6" fill="#111111"/>
  </svg>
);

const ExitIcon = () => (
  <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7 3H3a1 1 0 0 0-1 1v10a1 1 0 0 0 1 1h4" stroke="#5E5E60" strokeWidth="1.4" strokeLinecap="round"/>
    <path d="M12 6l3 3-3 3" stroke="#5E5E60" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round"/>
    <path d="M15 9H7" stroke="#5E5E60" strokeWidth="1.4" strokeLinecap="round"/>
  </svg>
);

export default function Navbar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();
  const isKnowledgeHub = pathname === '/knowledge-hub';

  return (
    <header className={styles.navbar}>
      <div className={styles.brand} onClick={() => navigate('/dashboard')}>
        <SeatraceLogo />
        <span className={styles.brandText}>
          <span className={styles.sea}>SEA</span>TRACE
        </span>
      </div>

      <div className={styles.navIcons}>
        <button
          type="button"
          className={`${styles.iconBtn} ${isKnowledgeHub ? styles.iconBtnActive : ''}`}
          onClick={() => navigate(isKnowledgeHub ? '/dashboard' : '/knowledge-hub')}
          title="Knowledge Hub"
        >
          <BookOutlined />
        </button>
        <button type="button" className={styles.iconBtn}>
          <ExitIcon />
        </button>
        <button type="button" className={styles.iconBtn} onClick={() => navigate('/dashboard')}>
          <HomeOutlined />
        </button>
      </div>
    </header>
  );
}
