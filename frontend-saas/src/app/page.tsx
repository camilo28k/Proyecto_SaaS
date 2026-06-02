import Link from 'next/link';
import styles from './page.module.css';

export default function HomePage() {
  return (
    <main className={styles.container}>
      <div className={styles.card}>
        <section className={styles.heroCopy}>
          <span className={styles.eyebrow}>Panel operativo para equipos modernos</span>
          <h1 className={styles.title}>Gestiona tu SaaS con claridad.</h1>
          <p className={styles.subtitle}>
            Centraliza usuarios, servicios y operaciones en una experiencia limpia, rapida y lista para crecer.
          </p>

          <div className={styles.buttonGroup}>
            <Link href="/auth/login" className={styles.btnLogin}>
              Iniciar sesion
            </Link>

            <Link href="/auth/register" className={styles.btnRegister}>
              Crear cuenta
            </Link>
          </div>
        </section>

        <section className={styles.preview} aria-label="Resumen del panel">
          <div className={styles.previewHeader}>
            <span className={styles.previewTitle}>Resumen semanal</span>
            <span className={styles.previewStatus}>Activo</span>
          </div>
          <div className={styles.previewBody}>
            <div className={styles.metricGrid}>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Operaciones</div>
                <div className={styles.metricValue}>128</div>
              </div>
              <div className={styles.metric}>
                <div className={styles.metricLabel}>Ingresos</div>
                <div className={styles.metricValue}>$8.4k</div>
              </div>
            </div>
            <div className={styles.activity}>
              <div className={styles.activityRow}>
                <span>Servicios activos</span>
                <span>24</span>
              </div>
              <div className={styles.activityRow}>
                <span>Usuarios nuevos</span>
                <span>16</span>
              </div>
              <div className={styles.activityRow}>
                <span>Rendimiento</span>
                <span className={styles.bar} />
              </div>
            </div>
          </div>
        </section>
      </div>
    </main>
  );
}
