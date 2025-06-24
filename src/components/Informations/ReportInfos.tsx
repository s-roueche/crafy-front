import { formatDateMonthYear } from "../../usefulFunctions/dateHandling.tsx";
import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";
import EditableReportComment from "../Editables/EditableReportComment.tsx";
import { useQuery } from "@tanstack/react-query";
import {
  getCompanyById,
  getTotalTimeByReport,
} from "../../queries/getQueries.tsx";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

type ReportInfosProps = {
  reportMonth: Date;
  reportComment: string;
  reportId: string;
  clientId: string;
};

const ReportInfos = ({
  reportMonth,
  reportComment,
  reportId,
  clientId,
}: ReportInfosProps) => {
  const { t } = useTranslation();

  const companyQuery = useQuery({
    queryKey: ["company", reportId],
    queryFn: () => getCompanyById(clientId),
    retryDelay: 1000,
  });
  const totalTimeQuery = useQuery({
    queryKey: ["totalTime", reportId],
    queryFn: () => getTotalTimeByReport(reportId),
    retryDelay: 1000,
  });

  return (
    <>
      {(companyQuery.isLoading || totalTimeQuery.isLoading) && <Loading />}

      {companyQuery.isError && (
        <ErrorMessage error={companyQuery.error.message} />
      )}

      {totalTimeQuery.isError && (
        <ErrorMessage error={totalTimeQuery.error.message} />
      )}

      {companyQuery.isSuccess && totalTimeQuery.isSuccess && (
        <>
          <div className={"text-2xl font-bold p-5 text-center"}>
            {t("Report")} {t("of")} {formatDateMonthYear(reportMonth, t)}
          </div>

          <Divider />

          <div className={"text-lg p-5 pb-3"}>
            {t("Client")} : {companyQuery.data.businessName}
          </div>
          <div className={"text-lg p-5 pt-0"}>
            {t("TotalTime")} : {totalTimeQuery.data} {t("day")}
            {totalTimeQuery.data === 1 ? "" : "s"}
          </div>

          <Divider />

          <div>
            <div className={"text-lg p-5"}>{t("Comment")}:</div>
            <EditableReportComment
              comment={reportComment}
              reportId={reportId}
            />
          </div>
        </>
      )}
    </>
  );
};

export default ReportInfos;
