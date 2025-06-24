import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  formatDateDayOfTheWeek,
  getNumberOfDaysInMonth,
} from "../../usefulFunctions/dateHandling.tsx";
import { useTranslation } from "react-i18next";
import type {
  Activity,
  NullabbleTimeWorked,
} from "../../queries/interfaces.tsx";
import TimeWorkedButton from "../Button/TimeWorkedButton.tsx";
import EditableActivityComment from "../Editables/EditableActivityComment.tsx";

type ActivityTableProps = {
  reportId: string;
  reportMonth: Date;
  activities: Activity[];
};

type Item = {
  key: string;
  id: string;
  date: Date;
  timeWorked: NullabbleTimeWorked;
  comment: string;
};

const ActivityTable = ({
  reportId,
  reportMonth,
  activities,
}: ActivityTableProps) => {
  const { t } = useTranslation();

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

  for (const activity of activities) {
    const item = rows[new Date(activity.date).getDate() - 1];
    item.id = activity.id;
    item.timeWorked = activity.timeWorked;
    item.comment = activity.comment ? activity.comment : "";
  }

  return (
    <>
      <div className={"text-2xl font-bold p-5 text-center"}>
        {t("Activities")}
      </div>

      <Table
        isStriped
        fullWidth
        sortDescriptor={{ column: "activity", direction: "ascending" }}
      >
        <TableHeader>
          <TableColumn key={"date"} className={"text-medium"}>
            {" "}
            {t("Date")}{" "}
          </TableColumn>
          <TableColumn key={"timeWorked"} className={"text-medium"}>
            {" "}
            {t("TimeWorked")}{" "}
          </TableColumn>
          <TableColumn key={"comment"} className={"text-medium"}>
            {" "}
            {t("Comment")}{" "}
          </TableColumn>
        </TableHeader>
        <TableBody items={rows}>
          {(item) => (
            <TableRow key={item.key}>
              <TableCell>
                <div className={"text-medium"}>
                  {formatDateDayOfTheWeek(item.date, t)}
                </div>
              </TableCell>
              <TableCell className={"flex justify-center"}>
                <TimeWorkedButton
                  reportId={reportId}
                  activityTimeWorked={item.timeWorked}
                  activityDate={item.date}
                  activityId={item.id}
                />
              </TableCell>
              <TableCell className={"justify-items-end"}>
                <div className={"italic"}>
                  <EditableActivityComment
                    isVisible={item.timeWorked != "NONE"}
                    comment={item.comment}
                    activityId={item.id}
                    reportId={reportId}
                  />
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </>
  );
};

export default ActivityTable;
