import { createFileRoute } from "@tanstack/react-router";
import { Divider } from "@heroui/react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getReportById,
  getCompanyById,
  getTotalTimeByReport,
  getActivitiesByReport,
} from "../queries/getQueries.tsx";
import { updateReportComment } from "../queries/putQueries.tsx";
import { useState } from "react";
import Loading from "../components/Feedback/Loading.tsx";
import ReportInfos from "../components/Informations/ReportInfos.tsx";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";
import ActivityTable from "../components/Informations/ActivityTable.tsx";

export const Route = createFileRoute("/report-detail/$userId/$reportId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { reportId } = Route.useParams();
  const queryClient = useQueryClient();
  const [reportCommentIsEditable, setReportCommentIsEditable] = useState(false);
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
  const editReportCommentMutation = useMutation({
    mutationKey: ["edit-report-comment-mutation", reportId],
    mutationFn: async (data: { comment: string }) => {
      await updateReportComment(reportId, data.comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["report", reportId] });
    },
  });

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

      {editReportCommentMutation.isError && (
        <ErrorMessage error={editReportCommentMutation.error.message} />
      )}

      {reportQuery.isSuccess &&
        companyQuery.isSuccess &&
        totalTimeQuery.isSuccess &&
        (activitiesQuery.isLoading || editReportCommentMutation.isPending) && (
          <div className={"grid grid-cols-[400px_1fr] gap-6"}>
            <ReportInfos
              reportMonth={new Date(reportQuery.data.monthReport)}
              companyBusinessName={reportQuery.data.businessName}
              totalTimeWorked={totalTimeQuery.data}
              reportComment={reportQuery.data.comment}
              reportCommentIsEditable={reportCommentIsEditable}
              setReportCommentIsEditable={setReportCommentIsEditable}
              mutateReportComment={editReportCommentMutation.mutate}
            />

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
              <div>
                <ReportInfos
                  reportMonth={new Date(reportQuery.data.monthReport)}
                  companyBusinessName={reportQuery.data.businessName}
                  totalTimeWorked={totalTimeQuery.data}
                  reportComment={reportQuery.data.comment}
                  reportCommentIsEditable={reportCommentIsEditable}
                  setReportCommentIsEditable={setReportCommentIsEditable}
                  mutateReportComment={editReportCommentMutation.mutate}
                />
              </div>
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
