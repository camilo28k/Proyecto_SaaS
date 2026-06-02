'use client';

import {
  useEffect,
  useState,
} from 'react';

import {
  useRouter,
} from 'next/navigation';

import { ServiceForm } from '@/components/services/service-form';

import { serviceService } from '@/services/serviceService';

export default function ServiceDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();

  const [serviceId, setServiceId] =
    useState('');

  const [service, setService] =
    useState<any>(null);

  useEffect(() => {
    const load = async () => {
      const { id } = await params;

      setServiceId(id);

      const data =
        await serviceService.getById(id);

      setService(data);
    };

    load();
  }, [params]);

  const handleUpdate = async (
    data: {
      name: string;
      description: string;
      price: number;
    },
  ) => {
    try {
      await serviceService.update(
        serviceId,
        data,
      );

      alert(
        'Servicio actualizado',
      );

      router.push(
        '/dashboard/services',
      );
    } catch (error) {
      console.error(error);
      alert(
        'Error actualizando servicio',
      );
    }
  };

  if (!service)
    return <p>Cargando...</p>;

  return (
    <section className="detail-card">
      <p className="page-kicker">
        Servicio
      </p>

      <h1 className="page-title">
        Editar servicio
      </h1>

      <ServiceForm
        initialValues={{
          name: service.name,
          description:
            service.description,
          price: Number(
            service.price,
          ),
        }}
        onSubmit={handleUpdate}
        submitText="Guardar cambios"
      />
    </section>
  );
}