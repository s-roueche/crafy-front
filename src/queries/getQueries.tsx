import axios from "axios";

export async function getAllReports() {
    const response = await axios.get('http://localhost:3000/report');
    return response.data;
}

export async function getCompanyById(id: string) {
    const response = await axios.get('http://localhost:3000/company/' + id);
    return response.data;
}

export async function getAllCompanies() {
    const response = await axios.get('http://localhost:3000/company');
    return response.data;
}
