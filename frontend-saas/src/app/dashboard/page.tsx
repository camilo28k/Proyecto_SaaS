'use client';

export default function DashboardPage() {
  return (
    <div className="page-stack">
      <section className="page-hero compact">
        <p className="page-kicker">Resumen general</p>

        <h1 className="page-title">
          Bienvenido al panel de control
        </h1>

        <p className="page-copy">
          Gestiona usuarios, servicios y operaciones
          desde un único lugar.
        </p>
      </section>

      <section className="panel">
        <h2>¿Qué puedes hacer?</h2>

        <div className="activity-list">
          <div className="activity-item">
            <span>👥 Administrar usuarios</span>
          </div>

          <div className="activity-item">
            <span>🛠️ Gestionar servicios</span>
          </div>

          <div className="activity-item">
            <span>📋 Registrar operaciones</span>
          </div>

          <div className="activity-item">
            <span>📊 Consultar información del sistema</span>
          </div>
        </div>
      </section>
    </div>
  );
}