import { createFileRoute } from "@tanstack/react-router";
import { useQuery } from "@tanstack/react-query";
import { getReportById } from "../queries/getQueries.tsx";
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

  const reportInfosComponent = reportQuery.isSuccess ? (
    <ReportInfos
      reportMonth={new Date(reportQuery.data.monthReport)}
      reportComment={reportQuery.data.comment}
      reportId={reportId}
      clientId={reportQuery.data.clientId}
    />
  ) : (
    ""
  );

  return (
    <>
      {reportQuery.isLoading && <Loading />}
      {reportQuery.isError && (
        <ErrorMessage error={reportQuery.error.message} />
      )}
      {reportQuery.isSuccess && (
        <div className={"grid grid-cols-[400px_1fr] gap-6"}>
          <div>{reportInfosComponent}</div>
          <div>
            <ActivityTable
              reportId={reportId}
              reportMonth={new Date(reportQuery.data.monthReport)}
            />
          </div>
        </div>
      )}
    </>
  );
}
