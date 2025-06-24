import axios from "axios";
import type { TimeWorked } from "./type.ts";

export async function createCompany(
  businessName: string,
  userCreatorId: string,
): Promise<void> {
  await axios.post(`http://localhost:3000/company`, {
    businessName,
    userCreatorId,
  });
}

export async function createReport(
  clientId: string,
  userId: string,
  monthReport: Date,
  comment: string,
): Promise<void> {
  await axios.post(`http://localhost:3000/report`, {
    clientId,
    userId,
    monthReport,
    comment,
  });
}

export async function createActivity(
  date: Date,
  reportId: string,
  timeWorked: TimeWorked,
  comment: string,
): Promise<void> {
  await axios.post(`http://localhost:3000/activity`, {
    date,
    reportId,
    timeWorked,
    comment,
  });
}
