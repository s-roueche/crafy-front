import {
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import { formatDateDayOfTheWeek } from "../../usefulFunctions/dateHandling.tsx";
import { useTranslation } from "react-i18next";
import TimeWorkedButton from "../Button/TimeWorkedButton.tsx";
import EditableActivityComment from "../Editables/EditableActivityComment.tsx";
import { useQuery } from "@tanstack/react-query";
import { getActivitiesByReport } from "../../queries/getQueries.tsx";
import PageTitle from "../Layout/PageTitle.tsx";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import { getActivityRows } from "../../usefulFunctions/getRows.tsx";

type ActivityTableProps = {
  reportId: string;
  reportMonth: Date;
};

const ActivityTable = ({ reportId, reportMonth }: ActivityTableProps) => {
  const { t } = useTranslation();
  const activitiesQuery = useQuery({
    queryKey: ["activities", reportId],
    queryFn: () => getActivitiesByReport(reportId),
    retryDelay: 1000,
  });

  const rows = activitiesQuery.isSuccess
    ? getActivityRows(reportMonth, activitiesQuery.data)
    : [];

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
            <TableColumn
              key={"date"}
              className={"text-medium bg-teal-100 text-teal-900"}
            >
              {" "}
              {t("Date")}{" "}
            </TableColumn>
            <TableColumn
              key={"timeWorked"}
              className={"text-medium bg-teal-100 text-teal-900"}
            >
              {" "}
              {t("TimeWorked")}{" "}
            </TableColumn>
            <TableColumn
              key={"comment"}
              className={"text-medium bg-teal-100 text-teal-900"}
            >
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
