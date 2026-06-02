import Link from 'next/link';

const links = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/users', label: 'Usuarios' },
  { href: '/dashboard/services', label: 'Servicios' },
  { href: '/dashboard/operations', label: 'Operaciones' },
];

export function Sidebar() {
  return (
    <aside className="dash-sidebar">
      <Link href="/" className="dash-brand">
        <span className="brand-mark">S</span>
        <div>
          <p className="brand-title">SaaS Manager</p>
          <p className="brand-subtitle">Control operativo</p>
        </div>
      </Link>

      <nav className="dash-nav">
        {links.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="session-card">
        <p className="session-title">Sesion activa</p>
        <p className="session-copy">Administrador conectado al panel.</p>
        <Link
          href="/auth/login"
          className="session-button"
        >
          Cerrar sesion
        </Link>
      </div>
    </aside>
  );
}
