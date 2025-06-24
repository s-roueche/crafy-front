import { onSubmitActivityComment } from "../../usefulFunctions/submitFunctions.tsx";
import EditableComment from "./EditableComment.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { updateActivityComment } from "../../queries/putQueries.tsx";
import { useState } from "react";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

type EditableActivityCommentProps = {
  isVisible: boolean;
  comment: string;
  activityId: string;
  reportId: string;
};

const EditableActivityComment = ({
  isVisible,
  comment,
  activityId,
  reportId,
}: EditableActivityCommentProps) => {
  const queryClient = useQueryClient();
  const [activityCommentsAreEditable, setActivityCommentsAreEditable] =
    useState(false);

  const editActivityCommentMutation = useMutation({
    mutationKey: ["edit-activity-comment", reportId],
    mutationFn: async (data: { id: string; comment: string }) => {
      await updateActivityComment(data.id, data.comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["activities", reportId] });
    },
  });

  return (
    <>
      {editActivityCommentMutation.isError && (
        <ErrorMessage error={editActivityCommentMutation.error.message} />
      )}

      {!editActivityCommentMutation.isError && (
        <EditableComment
          isVisible={isVisible}
          comment={comment}
          onSubmit={(e) =>
            onSubmitActivityComment(
              activityId,
              e,
              setActivityCommentsAreEditable,
              editActivityCommentMutation.mutate,
            )
          }
          isEditable={activityCommentsAreEditable}
          setIsEditable={setActivityCommentsAreEditable}
        />
      )}
    </>
  );
};

export default EditableActivityComment;
