import { onSubmitReportComment } from "../../usefulFunctions/submitFunctions.tsx";
import EditableComment from "./EditableComment.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateReportComment } from "../../queries/putQueries.tsx";
import { useState } from "react";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

type EditableReportCommentProps = {
  comment: string;
  reportId: string;
};

const EditableReportComment = ({
  comment,
  reportId,
}: EditableReportCommentProps) => {
  const queryClient = useQueryClient();
  const [IsEditable, setIsEditable] = useState(false);

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
      {editReportCommentMutation.isError && (
        <ErrorMessage error={editReportCommentMutation.error.message} />
      )}

      {!editReportCommentMutation.isError && (
        <EditableComment
          isVisible={true}
          comment={comment}
          onSubmit={(e) =>
            onSubmitReportComment(
              e,
              setIsEditable,
              editReportCommentMutation.mutate,
            )
          }
          isEditable={IsEditable}
          setIsEditable={setIsEditable}
          classname={"w-100 p-5"}
          size={"lg"}
        />
      )}
    </>
  );
};

export default EditableReportComment;
