import { Outlet } from 'react-router-dom';
import Navbar from './Navbar/Navbar.js';
import Sidebar from './Sidebar/Sidebar.js';
import styles from './MainLayout.module.scss';

export default function MainLayout() {
  return (
    <div className={styles.layout}>
      <Navbar />
      <div className={styles.body}>
        <Sidebar />
        <main className={styles.content}>
          <Outlet />
        </main>
      </div>
    </div>
  );
}
