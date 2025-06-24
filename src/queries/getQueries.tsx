import api from "./axiosConfig.ts";
import type { Company, Report } from "./type.ts";

export async function getAllReportsByUser(userId: string) {
  const response = await api.get("report");
  return response.data.filter((report: Report) => report.userId === userId);
}

export async function getReportById(reportId: string) {
  const response = await api.get(`report/${reportId}`);
  return response.data;
}

export async function getAllCompaniesByUser(userId: string) {
  const response = await api.get("company");
  return response.data.filter(
    (company: Company) => company.userCreatorId === userId,
  );
}

export async function getCompanyById(companyId: string) {
  const response = await api.get(`company/${companyId}`);
  return response.data;
}

export async function getActivitiesByReport(reportId: string) {
  const response = await api.get(`report/${reportId}/activities`);
  return response.data;
}

export async function getTotalTimeByReport(reportId: string) {
  const response = await api.get(`report/${reportId}/totalTime`);
  return response.data;
}
