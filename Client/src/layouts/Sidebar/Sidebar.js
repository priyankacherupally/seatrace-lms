import { useNavigate, useLocation } from 'react-router-dom';
import {
  HomeOutlined,
  UnorderedListOutlined,
  FormOutlined,
  UserOutlined,
  BarChartOutlined,
  FileTextOutlined,
  MoreOutlined,
  DatabaseOutlined,
} from '@ant-design/icons';
import styles from './Sidebar.module.scss';

const NAV_ITEMS = [
  { icon: <HomeOutlined />,           path: '/dashboard' },
  { icon: <UnorderedListOutlined />,  path: '/parameter-masters/details' },
  { icon: <FormOutlined />,           path: '/parameter-masters/form' },
  { icon: <UserOutlined />,           path: '/users' },
  { icon: <BarChartOutlined />,       path: '/reports' },
  { icon: <FileTextOutlined />,       path: '/documents' },
];

export default function Sidebar() {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  const isActive = (path) => pathname.startsWith(path) && path !== '/dashboard'
    ? true
    : pathname === path;

  return (
    <aside className={styles.sidebar}>
      <nav className={styles.nav}>
        {NAV_ITEMS.map((item, idx) => (
          <button
            key={idx}
            type="button"
            className={`${styles.navItem} ${isActive(item.path) ? styles.active : ''}`}
            onClick={() => navigate(item.path)}
          >
            {item.icon}
          </button>
        ))}
      </nav>
      <div className={styles.bottom}>
        <button type="button" className={styles.navItem}>
          <DatabaseOutlined />
        </button>
      </div>
    </aside>
  );
}
