import axios from "axios";
import type {Company, Report} from "./interfaces.tsx";

export async function getAllReportsByUser(userId: string) {
    const response = await axios.get('http://localhost:3000/report');
    return response.data.filter((report: Report) => report.userId === userId);
}

export async function getReportById(reportId: string) {
    const response = await axios.get('http://localhost:3000/report/' + reportId);
    return response.data;
}

export async function getAllCompaniesByUser(userId: string) {
    const response = await axios.get('http://localhost:3000/company');
    return response.data.filter((company: Company) => company.userCreatorId === userId);
}

export async function getCompanyById(companyId: string) {
    const response = await axios.get('http://localhost:3000/company/' + companyId);
    return response.data;
}

export async function getActivitiesByReport(reportId: string) {
    const response = await axios.get('http://localhost:3000/report/' + reportId + '/activities');
    return response.data;
}

export async function getTotalTimeByReport(reportId: string) {
    const response = await axios.get('http://localhost:3000/report/' + reportId + '/totalTime');
    return response.data;
}
