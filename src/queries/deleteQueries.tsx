import axios from "axios";

export async function deleteActivity(id: string): Promise<void> {
  const response = await axios.delete(`http://localhost:3000/activity/${id}`);
  return response.data;
}