'use client';

import {
  useEffect,
  useState,
} from 'react';

import { userService } from '@/services/userService';

export default function UserDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [id, setId] =
    useState('');

  const [email, setEmail] =
    useState('');

  const [role, setRole] =
    useState('CLIENT');

  useEffect(() => {
    const loadUser = async () => {
      const { id } = await params;

      setId(id);

      const user =
        await userService.getById(id);

      setEmail(user.email);
      setRole(user.role);
    };

    loadUser();
  }, [params]);

  const handleUpdate = async (
  e: React.FormEvent,
) => {
  e.preventDefault();

  try {
    await userService.update(id, {
      email,
      role,
    });

    alert('Usuario actualizado');

    window.location.href =
      '/dashboard/users';

  } catch (error) {
    console.error(error);
    alert('Error actualizando usuario');
  }
};

  return (
    <div className="page-stack">
      <section className="detail-card">
        <p className="page-kicker">
          Usuario
        </p>

        <h1 className="page-title">
          Editar usuario
        </h1>

        <form
          onSubmit={handleUpdate}
          className="grid gap-4 mt-8"
        >
          <input
            className="form-input"
            value={email}
            onChange={(e) =>
              setEmail(e.target.value)
            }
          />

          <button
            className="primary-button"
            type="submit"
          >
            Guardar cambios
          </button>
        </form>
      </section>
    </div>
  );
}
