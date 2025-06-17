import axios from "axios";
import type {TimeWorked} from "./interfaces.tsx";

export async function updateActivityTimeWorked(id: string, timeWorked: TimeWorked): Promise<void> {
  const response = await axios.put(`/activity/timeWorked/${id}`, {timeWorked});
  return response.data;
}

export async function updateActivityComment(id: string, comment: string): Promise<void> {
  const response = await axios.put(`/activity/comment/${id}`, {comment});
  return response.data;
}