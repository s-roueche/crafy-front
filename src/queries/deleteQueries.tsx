import api from "./axiosConfig.ts";

export async function deleteActivity(id: string): Promise<void> {
  const response = await api.delete(`activity/${id}`);
  return response.data;
}
