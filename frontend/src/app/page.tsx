import styles from "./page.module.css";
import Header from '../components/header/Header';
import DataUsersPage from '../components/users';

export default function Home() {
  return (
    <div className={styles.container}>
      <header className={styles.verticalHeader}>
        <Header />
      </header>

      <div className={styles.mainFooterContainer}>
        <main className={styles.mainContent}>
          <DataUsersPage />
        </main>

        <footer className={styles.pageFooter}>
          <h1>Desenvolvido por <span className={styles.rd}>Ramon Dorneles</span></h1>       
        </footer>
      </div>
    </div>
  );
}
