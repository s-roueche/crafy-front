import api from "./axiosConfig.ts";
import type { TimeWorked } from "./type.ts";

export async function createCompany(
  businessName: string,
  userCreatorId: string,
): Promise<void> {
  await api.post(`company`, {
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
  await api.post(`report`, {
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
  await api.post(`activity`, {
    date,
    reportId,
    timeWorked,
    comment,
  });
}

export async function createUser(userId: string): Promise<void> {
  await api.post(`user`, { id: userId });
}
