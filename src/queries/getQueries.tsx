import axios from "axios";
import type {Company, Report, Activity} from "./interfaces.tsx";

export async function getAllReportsByUser(userId: string) {
    const response = await axios.get('http://localhost:3000/report');
    return response.data.filter((report: Report) => report.userId === userId);
}

export async function getAllCompaniesByUser(userId: string) {
    const response = await axios.get('http://localhost:3000/company');
    return response.data.filter((company: Company) => company.userCreatorId === userId);
}

export async function getActivitiesByReport(reportId: string) {
    const response = await axios.get('http://localhost:3000/activity');
    return response.data.filter((activity: Activity) => activity.reportId === reportId);
}
