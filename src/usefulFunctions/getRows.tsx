import {
  formatDateMonthYear,
  getNumberOfDaysInMonth,
} from "./dateHandling.tsx";
import type {
  Activity,
  Company,
  NullabbleTimeWorked,
  Report,
} from "../queries/interfaces.tsx";
import type { TFunction } from "i18next";

type ActivityRow = {
  key: string;
  id: string;
  date: Date;
  timeWorked: NullabbleTimeWorked;
  comment: string;
};

type ReportRow = {
  key: string;
  month: string;
  client: string;
  comment: string | null | undefined;
};

export function getActivityRows(
  reportMonth: Date,
  activityQueryResult: Activity[],
): ActivityRow[] {
  const rows: ActivityRow[] = [];

  for (let day = 1; day <= getNumberOfDaysInMonth(reportMonth); day++) {
    rows.push({
      key: String(day - 1),
      id: "",
      date: new Date(reportMonth.setUTCDate(day)),
      timeWorked: "NONE",
      comment: "",
    });
  }

  for (const activity of activityQueryResult) {
    const row = rows[new Date(activity.date).getDate() - 1];
    row.id = activity.id;
    row.timeWorked = activity.timeWorked;
    row.comment = activity.comment ? activity.comment : "";
  }

  return rows;
}

export function getReportRows(
  reportsQueryResult: Report[],
  companiesQueryResult: Company[],
  t: TFunction,
): ReportRow[] {
  return reportsQueryResult.map((report: Report) => {
    const client = companiesQueryResult.find(
      (company: Company) => company.id === report.clientId,
    );
    if (!client) {
      throw new Error(`no client found for report ${report.id}`);
    }
    const formattedDate = formatDateMonthYear(new Date(report.monthReport), t);

    return {
      key: report.id,
      month: formattedDate,
      client: client.businessName,
      comment: report.comment,
    };
  });
}
