import api from '@/lib/axios';

export const userService = {
  async getAll() {
    const { data } = await api.get('/users');
    return data;
  },

  async getById(id: string) {
    const { data } = await api.get(`/users/${id}`);
    return data;
  },

  async create(user: {
    email: string;
    password: string;
    role: string;
  }) {
    const { data } = await api.post('/users', user);
    return data;
  },

  async update(
    id: string,
    user: {
      email?: string;
      password?: string;
      role?: string;
    },
  ) {
    const { data } = await api.patch(
      `/users/${id}`,
      user,
    );

    return data;
  },

  async remove(id: string) {
    const { data } = await api.delete(
      `/users/${id}`,
    );

    return data;
  },
};