'use client';

import { useRouter } from 'next/navigation';
import { ServiceForm } from '@/components/services/service-form';
import { serviceService } from '@/services/serviceService';

export default function NewServicePage() {
  const router = useRouter();

  const handleCreate = async (
    data: {
      name: string;
      description: string;
      price: number;
    },
  ) => {
    try {
      await serviceService.create({
        name: data.name,
        description: data.description,
        price: data.price,
      });

      alert('Servicio creado correctamente');

      router.push('/dashboard/services');
    } catch (error) {
      console.error(error);
      alert('Error al crear servicio');
    }
  };

  return (
    <section className="detail-card">
      <p className="page-kicker">
        Catalogo
      </p>

      <h1 className="page-title">
        Nuevo servicio
      </h1>

      <p className="page-copy">
        Crea un nuevo servicio para que
        pueda ser utilizado en las
        operaciones.
      </p>

      <ServiceForm
        onSubmit={handleCreate}
        submitText="Crear servicio"
      />
    </section>
  );
}