import { formatDateMonthYear } from "../../usefulFunctions/dateHandling.tsx";
import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";
import EditableReportComment from "../Editables/EditableReportComment.tsx";

type ReportInfosProps = {
  reportMonth: Date;
  companyBusinessName: string;
  totalTimeWorked: number;
  reportComment: string;
  reportId: string;
};

const ReportInfos = ({
  reportMonth,
  companyBusinessName,
  totalTimeWorked,
  reportComment,
  reportId,
}: ReportInfosProps) => {
  const { t } = useTranslation();

  return (
    <div>
      <div className={"text-2xl font-bold p-5 text-center"}>
        {t("Report")} {t("of")} {formatDateMonthYear(reportMonth, t)}
      </div>

      <Divider />

      <div className={"text-lg p-5 pb-3"}>
        {t("Client")} : {companyBusinessName}
      </div>
      <div className={"text-lg p-5 pt-0"}>
        {t("TotalTime")} : {totalTimeWorked} {t("day")}
        {totalTimeWorked === 1 ? "" : "s"}
      </div>

      <Divider />

      <div>
        <div className={"text-lg p-5"}>{t("Comment")}:</div>
        <EditableReportComment comment={reportComment} reportId={reportId} />
      </div>
    </div>
  );
};

export default ReportInfos;
