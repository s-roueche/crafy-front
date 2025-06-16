export type Report = {
    id: string;
    userId: string;
    user: User;
    clientId: string;
    client: Company;
    monthReport: Date;
    activities: Activity[];
    comment?: string | null;
}

export type User = {
    id: string,
    reports: Report[],
    companies: Company[],
}

export type Company = {
    id: string;
    businessName: string;
    reports: Report[];
    userCreatorId: string;
    userCreator: User;
}

export type Activity = {
    id: string;
    date: Date;
    timeWorked: TimeWorked;
    reportId: string;
    report: Report;
    comment?: string | null;
}

export type TimeWorked = 'FULL_DAY' | 'HALF_DAY';
