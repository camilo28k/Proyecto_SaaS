'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';
import { serviceService } from '@/services/serviceService';

type Service = {
  id: string;
  name: string;
  description?: string;
  price: number;
};

export default function ServicesPage() {
  const [services, setServices] = useState<Service[]>([]);
  const [role, setRole] = useState('');

  useEffect(() => {
    const token = localStorage.getItem('token');

    if (token) {
      const payload = JSON.parse(
        atob(token.split('.')[1]),
      );

      setRole(payload.role);
    }

    loadServices();
  }, []);

  const loadServices = async () => {
    try {
      const data =
        await serviceService.getAll();

      setServices(data);
    } catch (error) {
      console.error(error);
    }
  };

  const handleDelete = async (
    id: string,
  ) => {
    const confirmed = confirm(
      '¿Eliminar servicio?',
    );

    if (!confirmed) return;

    try {
      await serviceService.remove(id);

      setServices((prev) =>
        prev.filter(
          (service) =>
            service.id !== id,
        ),
      );
    } catch (error) {
      console.error(error);
      alert(
        'Error eliminando servicio',
      );
    }
  };

  return (
    <div className="page-stack">
      <section className="page-hero">
        <div>
          <p className="page-kicker">
            Catálogo
          </p>

          <h1 className="page-title">
            Servicios
          </h1>

          <p className="page-copy">
            Organiza tus servicios.
          </p>
        </div>

        {role !== 'CLIENT' && (
          <Link
            href="/dashboard/services/new"
            className="primary-button"
          >
            Nuevo servicio
          </Link>
        )}
      </section>

      <section className="service-grid">
        {services.map((service) => (
          <article
            key={service.id}
            className="service-card"
          >
            <div className="service-top">
              <h2>{service.name}</h2>

              <span className="price-pill">
                ${service.price}
              </span>
            </div>

            <p className="page-copy">
              {service.description}
            </p>

            {role !== 'CLIENT' && (
              <div className="action-buttons">
                <Link
                  href={`/dashboard/services/${service.id}`}
                  className="edit-button"
                >
                  Editar
                </Link>

                <button
                  onClick={() =>
                    handleDelete(
                      service.id,
                    )
                  }
                  className="delete-button"
                >
                  Eliminar
                </button>
              </div>
            )}
          </article>
        ))}
      </section>
    </div>
  );
}