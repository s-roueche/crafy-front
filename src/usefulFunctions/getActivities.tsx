import { getNumberOfDaysInMonth } from "./dateHandling.tsx";
import type { Activity, NullabbleTimeWorked } from "../queries/interfaces.tsx";

type Item = {
  key: string;
  id: string;
  date: Date;
  timeWorked: NullabbleTimeWorked;
  comment: string;
};

export default function getActivities(
  reportMonth: Date,
  activityQueryResult: Activity[],
): Item[] {
  const rows: Item[] = [];

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
    const item = rows[new Date(activity.date).getDate() - 1];
    item.id = activity.id;
    item.timeWorked = activity.timeWorked;
    item.comment = activity.comment ? activity.comment : "";
  }

  return rows;
}
