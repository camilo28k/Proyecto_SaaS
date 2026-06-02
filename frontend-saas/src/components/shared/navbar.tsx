import Link from 'next/link';

const mobileLinks = [
  { href: '/dashboard', label: 'Resumen' },
  { href: '/dashboard/users', label: 'Usuarios' },
  { href: '/dashboard/services', label: 'Servicios' },
  { href: '/dashboard/operations', label: 'Operaciones' },
];

export function Navbar() {
  return (
    <header className="dash-header">
      <div className="dash-header-row">
        <div>
          <p className="dash-eyebrow">Dashboard</p>
          <h3>Panel de Control</h3>
        </div>

        <div className="header-actions">
          <Link
            href="/dashboard/operations"
            className="primary-link"
          >
            Nueva operacion
          </Link>
          <div className="avatar">A</div>
        </div>
      </div>

      <nav className="mobile-nav">
        {mobileLinks.map((link) => (
          <Link key={link.href} href={link.href}>
            {link.label}
          </Link>
        ))}
      </nav>
    </header>
  );
}
