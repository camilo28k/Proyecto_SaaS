'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

type NavLink = {
  href: string;
  label: string;
};

export function Sidebar() {
  const [role, setRole] =
    useState('');

  useEffect(() => {
    const token =
      localStorage.getItem('token');

    if (!token) return;

    try {
      const payload = JSON.parse(
        atob(token.split('.')[1]),
      );

      setRole(payload.role);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const links: NavLink[] = [
    {
      href: '/dashboard',
      label: 'Resumen',
    },

    ...(role !== 'CLIENT'
      ? [
          {
            href: '/dashboard/users',
            label: 'Usuarios',
          },
        ]
      : []),

    {
      href: '/dashboard/services',
      label: 'Servicios',
    },

    {
      href: '/dashboard/operations',
      label: 'Operaciones',
    },
  ];

  const handleLogout = () => {
    localStorage.removeItem('token');
    window.location.href =
      '/auth/login';
  };

  return (
    <aside className="dash-sidebar">
      <Link
        href="/"
        className="dash-brand"
      >
        <span className="brand-mark">
          S
        </span>

        <div>
          <p className="brand-title">
            SaaS Manager
          </p>

          <p className="brand-subtitle">
            Control operativo
          </p>
        </div>
      </Link>

      <nav className="dash-nav">
        {links.map((link) => (
          <Link
            key={link.href}
            href={link.href}
          >
            {link.label}
          </Link>
        ))}
      </nav>

      <div className="session-card">
        <p className="session-title">
          Sesión activa
        </p>

        <p className="session-copy">
          {role === 'ADMIN' &&
            'Administrador conectado al panel.'}

          {role === 'OPERATOR' &&
            'Operador conectado al panel.'}

          {role === 'CLIENT' &&
            'Cliente conectado al panel.'}
        </p>

        <button
          onClick={handleLogout}
          className="session-button"
        >
          Cerrar sesión
        </button>
      </div>
    </aside>
  );
}