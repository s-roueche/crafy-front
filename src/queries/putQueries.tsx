import axios from "axios";
import type { TimeWorked } from "./type.ts";

export async function updateActivityTimeWorked(
  id: string,
  timeWorked: TimeWorked,
): Promise<void> {
  const response = await axios.put(
    `http://localhost:3000/activity/timeWorked/${id}`,
    { timeWorked },
  );
  return response.data;
}

export async function updateActivityComment(
  id: string,
  comment: string,
): Promise<void> {
  const response = await axios.put(
    `http://localhost:3000/activity/comment/${id}`,
    { comment },
  );
  return response.data;
}

export async function updateReportComment(
  id: string,
  comment: string,
): Promise<void> {
  const response = await axios.put(
    `http://localhost:3000/report/comment/${id}`,
    { comment },
  );
  return response.data;
}
