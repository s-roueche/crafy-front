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
import type { NullabbleTimeWorked } from "../../queries/interfaces.tsx";
import TimeWorkedButton from "../Button/TimeWorkedButton.tsx";
import EditableActivityComment from "../Editables/EditableActivityComment.tsx";
import { useQuery } from "@tanstack/react-query";
import { getActivitiesByReport } from "../../queries/getQueries.tsx";
import PageTitle from "../Layout/PageTitle.tsx";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

type ActivityTableProps = {
  reportId: string;
  reportMonth: Date;
};

type Item = {
  key: string;
  id: string;
  date: Date;
  timeWorked: NullabbleTimeWorked;
  comment: string;
};

const ActivityTable = ({ reportId, reportMonth }: ActivityTableProps) => {
  const { t } = useTranslation();
  const activitiesQuery = useQuery({
    queryKey: ["activities", reportId],
    queryFn: () => getActivitiesByReport(reportId),
    retryDelay: 1000,
  });

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

  if (activitiesQuery.isSuccess) {
    for (const activity of activitiesQuery.data) {
      const item = rows[new Date(activity.date).getDate() - 1];
      item.id = activity.id;
      item.timeWorked = activity.timeWorked;
      item.comment = activity.comment ? activity.comment : "";
    }
  }

  return (
    <>
      <PageTitle title={t("Activities")} />

      {activitiesQuery.isError && (
        <ErrorMessage error={activitiesQuery.error.message} />
      )}

      {activitiesQuery.isLoading && <Loading />}

      {activitiesQuery.isSuccess && (
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
      )}
    </>
  );
};

export default ActivityTable;
