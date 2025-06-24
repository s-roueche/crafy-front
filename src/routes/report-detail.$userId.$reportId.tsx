import { createFileRoute } from "@tanstack/react-router";
import { Divider } from "@heroui/react";
import { useQuery } from "@tanstack/react-query";
import {
  getReportById,
  getCompanyById,
  getTotalTimeByReport,
  getActivitiesByReport,
} from "../queries/getQueries.tsx";
import Loading from "../components/Feedback/Loading.tsx";
import ReportInfos from "../components/Informations/ReportInfos.tsx";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";
import ActivityTable from "../components/Table/ActivityTable.tsx";

export const Route = createFileRoute("/report-detail/$userId/$reportId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { reportId } = Route.useParams();
  const reportQuery = useQuery({
    queryKey: ["report", reportId],
    queryFn: () => getReportById(reportId),
    retryDelay: 1000,
  });
  const companyQuery = useQuery({
    queryKey: ["company", reportId],
    queryFn: () => getCompanyById(reportQuery.data.clientId),
    retryDelay: 1000,
  });
  const totalTimeQuery = useQuery({
    queryKey: ["totalTime", reportId],
    queryFn: () => getTotalTimeByReport(reportQuery.data.id),
    retryDelay: 1000,
  });
  const activitiesQuery = useQuery({
    queryKey: ["activities", reportId],
    queryFn: () => getActivitiesByReport(reportQuery.data.id),
    retryDelay: 1000,
  });

  const reportInfosComponent =
    reportQuery.isSuccess && totalTimeQuery.isSuccess ? (
      <ReportInfos
        reportMonth={new Date(reportQuery.data.monthReport)}
        companyBusinessName={reportQuery.data.businessName}
        totalTimeWorked={totalTimeQuery.data}
        reportComment={reportQuery.data.comment}
        reportId={reportId}
      />
    ) : (
      ""
    );

  return (
    <>
      {(reportQuery.isLoading ||
        companyQuery.isLoading ||
        totalTimeQuery.isLoading) && <Loading />}

      {reportQuery.isError && (
        <ErrorMessage error={reportQuery.error.message} />
      )}

      {companyQuery.isError && (
        <ErrorMessage error={companyQuery.error.message} />
      )}

      {totalTimeQuery.isError && (
        <ErrorMessage error={totalTimeQuery.error.message} />
      )}

      {activitiesQuery.isError && (
        <ErrorMessage error={activitiesQuery.error.message} />
      )}

      {reportQuery.isSuccess &&
        companyQuery.isSuccess &&
        totalTimeQuery.isSuccess &&
        activitiesQuery.isLoading && (
          <div className={"grid grid-cols-[400px_1fr] gap-6"}>
            {reportInfosComponent}

            <Divider orientation="vertical" className={"h-screen"} />

            <Loading />
          </div>
        )}

      {reportQuery.isSuccess &&
        companyQuery.isSuccess &&
        totalTimeQuery.isSuccess &&
        activitiesQuery.isSuccess && (
          <>
            <div className={"grid grid-cols-[400px_1fr] gap-6"}>
              <div>{reportInfosComponent}</div>
              <div>
                <ActivityTable
                  reportId={reportId}
                  reportMonth={new Date(reportQuery.data.monthReport)}
                  activities={activitiesQuery.data}
                />
              </div>
            </div>
          </>
        )}
    </>
  );
}
