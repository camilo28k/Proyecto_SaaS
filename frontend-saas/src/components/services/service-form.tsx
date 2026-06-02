'use client';

import { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';

type ServiceFormProps = {
  initialValues?: {
    name?: string;
    description?: string;
    price?: number;
  };
  onSubmit: (data: {
    name: string;
    description: string;
    price: number;
  }) => Promise<void>;
  submitText?: string;
};

export function ServiceForm({
  initialValues,
  onSubmit,
  submitText = 'Guardar servicio',
}: ServiceFormProps) {
  const [name, setName] = useState(
    initialValues?.name || '',
  );

  const [description, setDescription] = useState(
    initialValues?.description || '',
  );

  const [price, setPrice] = useState(
    initialValues?.price?.toString() || '',
  );

  const [loading, setLoading] = useState(false);

  const handleSubmit = async (
    e: React.FormEvent<HTMLFormElement>,
  ) => {
    e.preventDefault();

    try {
      setLoading(true);

      await onSubmit({
        name,
        description,
        price: Number(price),
      });
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="form-card">
    <form
      onSubmit={handleSubmit}
      className="form-grid"
    >
      <label className="form-label">
        Nombre del servicio
        <Input
          className="form-input"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
      </label>

      <label className="form-label">
        Descripción
        <textarea
          className="form-textarea"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
      </label>

      <label className="form-label">
        Precio
        <Input
          className="form-input"
          type="number"
          step="0.01"
          value={price}
          onChange={(e) => setPrice(e.target.value)}
        />
      </label>

      <div className="form-actions">
  <button
    type="submit"
    className="primary-button"
    disabled={loading}
  >
    {loading
      ? 'Guardando...'
      : submitText}
  </button>
</div>
    </form>
  </div>
);
}