import api from '@/lib/axios';

export const serviceService = {
  async getAll() {
    const { data } = await api.get('/services');
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/services/${id}`);
    return data;
  },

  async create(service: {
    name: string;
    description?: string;
    price: number;
  }) {
    const { data } = await api.post(
      '/services',
      service,
    );

    return data;
  },

  async update(
    id: string,
    service: {
      name: string;
      description?: string;
      price: number;
    },
  ) {
    const { data } = await api.patch(
      `/services/${id}`,
      service,
    );

    return data;
  },

  async remove(id: string) {
    const { data } = await api.delete(
      `/services/${id}`,
    );

    return data;
  },
};