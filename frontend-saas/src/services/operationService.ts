import api from '@/lib/axios';

export const operationService = {
  async getAll() {
    const { data } = await api.get('/operations');
    return data;
  },

  async create(operation: {
    userId: string;
    serviceId: string;
    finalPrice: number;
  }) {
    const { data } = await api.post(
      '/operations',
      operation,
    );

    return data;
  },
  async delete(id: string) {
    const { data } = await api.delete(
      `/operations/${id}`,
    );

    return data;
  },
  async getMyOperations() {
    const { data } = await api.get(
      '/operations/my',
    );

    return data;
  }
};