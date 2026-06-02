'use client';

import { useState } from 'react';
import { userService } from '@/services/userService';

export default function NewUserPage() {
  const [email, setEmail] =
    useState('');

  const [password, setPassword] =
    useState('');

  const [role, setRole] =
    useState('CLIENT');

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      await userService.create({
        email,
        password,
        role,
      });

      alert(
        'Usuario creado correctamente',
      );

      window.location.href =
        '/dashboard/users';
    } catch (error: any) {
      console.error(error);

      alert(
        error?.response?.data?.message ||
          'Error creando usuario',
      );
    }
  };

  return (
    <div className="page-stack">
      <section className="detail-card">
        <p className="page-kicker">
          Usuarios
        </p>

        <h1 className="page-title">
          Nuevo usuario
        </h1>

        <form
          onSubmit={handleSubmit}
          className="grid gap-4 mt-8"
        >
          <input
            className="form-input"
            placeholder="Email"
            type="email"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
            required
          />

          <input
            className="form-input"
            type="password"
            placeholder="Contraseña"
            value={password}
            onChange={(e) =>
              setPassword(e.target.value)
            }
            required
          />

          <select
            className="form-input"
            value={role}
            onChange={(e) =>
              setRole(e.target.value)
            }
          >
            <option value="CLIENT">
              Cliente
            </option>

            <option value="OPERATOR">
              Operador
            </option>

            <option value="ADMIN">
              Administrador
            </option>
          </select>

          <button
            type="submit"
            className="primary-button"
          >
            Crear usuario
          </button>
        </form>
      </section>
    </div>
  );
}