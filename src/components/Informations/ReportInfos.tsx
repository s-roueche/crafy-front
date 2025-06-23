import { formatDateMonthYear } from "../../usefulFunctions/dateHandling.tsx";
import { Divider } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { onSubmitReportComment } from "../../usefulFunctions/submitFunctions.tsx";
import type { SetStateAction } from "react";
import type { UseMutateFunction } from "@tanstack/react-query";
import EditableComment from "../Editables/EditableComment.tsx";

type ReportInfosProps = {
  reportMonth: Date;
  companyBusinessName: string;
  totalTimeWorked: number;
  reportComment: string;
  reportCommentIsEditable: boolean;
  setReportCommentIsEditable: (isEditable: SetStateAction<boolean>) => void;
  mutateReportComment: UseMutateFunction<
    void,
    Error,
    {
      comment: string;
    },
    unknown
  >;
};

const ReportInfos = ({
  reportMonth,
  companyBusinessName,
  totalTimeWorked,
  reportComment,
  reportCommentIsEditable,
  setReportCommentIsEditable,
  mutateReportComment,
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

      <div className={"flex justify-between"}>
        <div className={"text-lg p-5"}>{t("Comment")}:</div>
        <EditableComment
          isVisible={true}
          comment={reportComment}
          onSubmit={(e) =>
            onSubmitReportComment(
              e,
              setReportCommentIsEditable,
              mutateReportComment,
            )
          }
          isEditable={reportCommentIsEditable}
          setIsEditable={setReportCommentIsEditable}
          classname={"p-5"}
        />
      </div>
    </div>
  );
};

export default ReportInfos;
