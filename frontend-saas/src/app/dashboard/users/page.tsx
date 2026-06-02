'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { userService } from '@/services/userService';

type User = {
  id: string;
  email: string;
  role: string;
};

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);
  const [role, setRole] = useState('');
  const [currentEmail, setCurrentEmail] =
    useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (!token) return;

    const payload = JSON.parse(
      atob(token.split('.')[1]),
    );

    setRole(payload.role);
    setCurrentEmail(payload.email);

    if (payload.role === 'CLIENT') {
      window.location.href =
        '/dashboard';
      return;
    }

    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const data = await userService.getAll();
      setUsers(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id: string,
  ) => {
    const confirmDelete = confirm(
      '¿Eliminar usuario?',
    );

    if (!confirmDelete) return;

    try {
      await userService.remove(id);
      loadUsers();
    } catch (error) {
      console.error(error);
      alert('Error eliminando usuario');
    }
  };

  const visibleUsers =
    role === 'CLIENT'
      ? users.filter(
        (user) =>
          user.email === currentEmail,
      )
      : users;

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="page-kicker">
            Administración
          </p>

          <h1 className="page-title">
            Usuarios
          </h1>

          <p className="page-copy">
            Gestiona usuarios del sistema.
          </p>
        </div>

        {(role === 'ADMIN' ||
          role === 'OPERATOR') && (
            <Link
              href="/dashboard/users/new"
              className="primary-button"
            >
              Nuevo usuario
            </Link>
          )}
      </section>

      <section className="table-panel">
        {visibleUsers.map((user) => (
          <div
            key={user.id}
            className="table-row"
          >
            <span>{user.email}</span>

            <span>{user.role}</span>

            {(role === 'ADMIN' ||
              role ===
              'OPERATOR') && (
                <div className="action-buttons">
                  <Link
                    href={`/dashboard/users/${user.id}`}
                    className="edit-button"
                  >
                    Editar
                  </Link>

                  <button
                    onClick={() =>
                      handleDelete(
                        user.id,
                      )
                    }
                    className="delete-button"
                  >
                    Eliminar
                  </button>
                </div>
              )}
          </div>
        ))}
      </section>
    </div>
  );
}