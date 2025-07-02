import { api } from './axios.config';
import type { User } from '@/types';

export async function login(
  alias: string,
  password: string
): Promise<{ user: User; token: string }> {
  const response = await api.post('/auth/login', { alias, password });
  return response.data;
}
