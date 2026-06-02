'use client';

import { useState } from 'react';
import { Input } from '../ui/input';
import { Button } from '../ui/button';
import { operationService } from '@/services/operationService';

export function OperationForm() {
  const [userId, setUserId] = useState('');
  const [serviceId, setServiceId] = useState('');
  const [finalPrice, setFinalPrice] = useState('');

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      await operationService.create({
        userId,
        serviceId,
        finalPrice: Number(finalPrice),
      });

      alert('Operación creada correctamente');

      setUserId('');
      setServiceId('');
      setFinalPrice('');
    } catch (error) {
      console.error(error);
      alert('Error al crear operación');
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="grid gap-4"
    >
      <Input
        placeholder="UUID del usuario"
        value={userId}
        onChange={(e) =>
          setUserId(e.target.value)
        }
        required
      />

      <Input
        placeholder="UUID del servicio"
        value={serviceId}
        onChange={(e) =>
          setServiceId(e.target.value)
        }
        required
      />

      <Input
        type="number"
        placeholder="Precio final"
        value={finalPrice}
        onChange={(e) =>
          setFinalPrice(e.target.value)
        }
        required
      />

      <Button type="submit">
        Crear operación
      </Button>
    </form>
  );
}