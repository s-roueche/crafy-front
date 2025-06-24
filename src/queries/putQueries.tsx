import api from "./axiosConfig.ts";
import type { TimeWorked } from "./type.ts";

export async function updateActivityTimeWorked(
  id: string,
  timeWorked: TimeWorked,
): Promise<void> {
  const response = await api.put(`activity/timeWorked/${id}`, { timeWorked });
  return response.data;
}

export async function updateActivityComment(
  id: string,
  comment: string,
): Promise<void> {
  const response = await api.put(`activity/comment/${id}`, { comment });
  return response.data;
}

export async function updateReportComment(
  id: string,
  comment: string,
): Promise<void> {
  const response = await api.put(`report/comment/${id}`, { comment });
  return response.data;
}
