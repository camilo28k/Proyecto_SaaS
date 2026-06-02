'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { operationService } from '@/services/operationService';

type Operation = {
  id: string;

  user?: {
    email: string;
  };

  service?: {
    name: string;
  };

  finalPrice: number;
};

export default function OperationsPage() {
  const [ops, setOps] = useState<Operation[]>([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(
        atob(token.split('.')[1]),
      );

      setRole(payload.role);
    }
  }, []);

  useEffect(() => {
    if (role) {
      loadOperations();
    }
  }, [role]);

  const loadOperations = async () => {
    try {
      const data =
        role === 'CLIENT'
          ? await operationService.getMyOperations()
          : await operationService.getAll();

      setOps(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id: string,
  ) => {
    const confirmDelete = confirm(
      '¿Deseas eliminar esta operación?',
    );

    if (!confirmDelete) return;

    try {
      await operationService.delete(id);

      alert('Operación eliminada');

      loadOperations();
    } catch (error) {
      console.error(error);
      alert('Error al eliminar');
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="page-kicker">
            Flujo comercial
          </p>

          <h1 className="page-title">
            Operaciones
          </h1>

          <p className="page-copy">
            Seguimiento de ventas,
            servicios y montos finales.
          </p>
        </div>

        {role !== 'CLIENT' && (
          <Link
            href="/dashboard/operations/new"
            className="primary-button"
          >
            Nueva operación
          </Link>
        )}
      </section>

      <section className="table-panel">
        <div className="table-head">
          <span>ID</span>
          <span>Usuario</span>
          <span>Servicio</span>
          <span>Total</span>

          {role !== 'CLIENT' && (
            <span>Acciones</span>
          )}
        </div>

        {ops.map((op) => (
          <div
            key={op.id}
            className="table-row"
          >
            <strong>{op.id}</strong>

            <span>
              {op.user?.email ||
                'Sin usuario'}
            </span>

            <span>
              {op.service?.name ||
                'Sin servicio'}
            </span>

            <strong>
              ${op.finalPrice}
            </strong>

            {role !== 'CLIENT' && (
              <div className="action-buttons">
                <Link
                  href={`/dashboard/operations/${op.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>

                <button
                  onClick={() =>
                    handleDelete(op.id)
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