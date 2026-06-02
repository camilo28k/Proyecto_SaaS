'use client';

import Link from 'next/link';
import api from '@/lib/axios';

export default function LoginPage() {
  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const email = formData.get('email') as string;
    const password = formData.get('password') as string;

    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('token', data.access_token);
      window.location.href = '/dashboard';
    } catch {
      alert('Error en las credenciales');
    }
  };

  return (
    <main className="auth-page">
      <section className="auth-shell">
        <aside className="auth-side">
          <div>
            <p className="auth-kicker">Acceso seguro</p>
            <h1 className="auth-side-title">Vuelve al centro de control.</h1>
            <p className="auth-side-text">
              Revisa usuarios, servicios y operaciones con una interfaz pensada para trabajar rapido.
            </p>
          </div>
          <div className="auth-side-list">
            <div className="auth-side-card">
              Operaciones listas para seguimiento en tiempo real.
            </div>
            <div className="auth-side-card">
              Roles y accesos preparados para equipos internos.
            </div>
          </div>
        </aside>

        <form onSubmit={handleLogin} className="auth-form">
          <div>
            <Link href="/" className="auth-back">
              Volver al inicio
            </Link>
            <h2 className="auth-title">Iniciar sesion</h2>
            <p className="auth-copy">
              Ingresa tus credenciales para continuar al dashboard.
            </p>
          </div>

          <label className="field">
            Email
            <input
              name="email"
              type="email"
              placeholder="correo@empresa.com"
              required
            />
          </label>

          <label className="field">
            Contrasena
            <input
              name="password"
              type="password"
              placeholder="Minimo 6 caracteres"
              required
            />
          </label>

          <button
            type="submit"
            className="auth-submit"
          >
            Entrar al panel
          </button>
        </form>
      </section>
    </main>
  );
}
