'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

import { operationService } from '@/services/operationService';
import { userService } from '@/services/userService';
import { serviceService } from '@/services/serviceService';

type User = {
  id: string;
  email: string;
};

type Service = {
  id: string;
  name: string;
  price: number;
};

export default function NewOperationPage() {
  const router = useRouter();

  const [users, setUsers] = useState<User[]>([]);
  const [services, setServices] = useState<Service[]>([]);

  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  useEffect(() => {
    loadData();
  }, []);

  const loadData = async () => {
    try {
      const usersData = await userService.getAll();
      const servicesData = await serviceService.getAll();

      setUsers(usersData);
      setServices(servicesData);
    } catch (error) {
      console.error(error);
    }
  };

  const handleServiceChange = (
    serviceId: string,
  ) => {
    setServiceId(serviceId);

    const service = services.find(
      (s) => s.id === serviceId,
    );

    if (service) {
      setFinalPrice(
        service.price.toString(),
      );
    }
  };

  const handleSubmit = async (
    e: React.FormEvent,
  ) => {
    e.preventDefault();

    try {
      await operationService.create({
        userId,
        serviceId,
        finalPrice: Number(finalPrice),
      });

      alert(
        'Operación creada correctamente',
      );

      router.push(
        '/dashboard/operations',
      );
    } catch (error) {
      console.error(error);
      alert(
        'Error al crear operación',
      );
    }
  };

  return (
    <div className="page-stack">
      <section className="detail-card">
        <p className="page-kicker">
          Operaciones
        </p>

        <h1 className="page-title">
          Nueva operación
        </h1>

        <form
          onSubmit={handleSubmit}
          className="form-grid"
        >
          <label className="form-label">
            Cliente

            <select
              className="form-input"
              value={userId}
              onChange={(e) =>
                setUserId(e.target.value)
              }
            >
              <option value="">
                Seleccione un cliente
              </option>

              {users.map((user) => (
                <option
                  key={user.id}
                  value={user.id}
                >
                  {user.email}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Servicio

            <select
              className="form-input"
              value={serviceId}
              onChange={(e) =>
                handleServiceChange(
                  e.target.value,
                )
              }
            >
              <option value="">
                Seleccione un servicio
              </option>

              {services.map((service) => (
                <option
                  key={service.id}
                  value={service.id}
                >
                  {service.name}
                </option>
              ))}
            </select>
          </label>

          <label className="form-label">
            Precio final

            <input
              className="form-input"
              type="number"
              value={finalPrice}
              onChange={(e) =>
                setFinalPrice(
                  e.target.value,
                )
              }
            />
          </label>

          <div className="form-actions">
            <button
              type="submit"
              className="primary-button"
            >
              Crear operación
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}