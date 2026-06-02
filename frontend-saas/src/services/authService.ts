import api from '@/lib/axios';

export const authService = {
  async login(email: string, password: string) {
    const { data } = await api.post('/auth/login', { email, password });

    if (data.access_token) {
      localStorage.setItem('token', data.access_token);
    }

    return data;
  },

  async register(
  email: string,
  password: string,
) {
  const { data } = await api.post('/auth/register', {
    email,
    password,
  });

  if (data.access_token) {
    localStorage.setItem('token', data.access_token);
  }

  return data;
},

  logout() {
    localStorage.removeItem('token');
    window.location.href = '/auth/login';
  },

  async getProfile() {
    const { data } = await api.get('/auth/profile');
    return data;
  },
};