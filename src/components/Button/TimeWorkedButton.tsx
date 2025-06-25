import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type { NullabbleTimeWorked, TimeWorked } from "../../queries/type.ts";
import { updateActivityTimeWorked } from "../../queries/putQueries.tsx";
import { createActivity } from "../../queries/postQueries.tsx";
import { deleteActivity } from "../../queries/deleteQueries.tsx";
import { useState } from "react";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import { getTimeWorkedDisplayString } from "../../usefulFunctions/getTimeWorkedDisplayString.tsx";
import { useTranslation } from "react-i18next";

type TimeWorkedButtonProps = {
  reportId: string;
  activityTimeWorked: NullabbleTimeWorked;
  activityDate: Date;
  activityId: string;
};

const TimeWorkedButton = ({
  reportId,
  activityTimeWorked,
  activityId,
  activityDate,
}: TimeWorkedButtonProps) => {
  const queryClient = useQueryClient();
  const { t } = useTranslation();
  const [mutationError, setMutationError] = useState("");

  const activityTimeWorkedMutation = useMutation({
    mutationKey: ["activityTimeWorked", reportId],
    mutationFn: async (data: { id: string; timeWorked: TimeWorked }) => {
      await updateActivityTimeWorked(data.id, data.timeWorked);
    },
    onSuccess: () => {
      setMutationError("");
      queryClient.invalidateQueries({ queryKey: ["activities", reportId] });
      queryClient.invalidateQueries({ queryKey: ["totalTime", reportId] });
    },
    onError: (error) => {
      setMutationError(error.message);
    },
  });

  const newActivityMutation = useMutation({
    mutationKey: ["add-activity", reportId],
    mutationFn: async (data: { timeWorked: TimeWorked; date: Date }) => {
      await createActivity(data.date, reportId, data.timeWorked, "");
    },
    onSuccess: () => {
      setMutationError("");
      queryClient.invalidateQueries({ queryKey: ["activities", reportId] });
      queryClient.invalidateQueries({ queryKey: ["totalTime", reportId] });
    },
    onError: (error) => {
      setMutationError(error.message);
    },
  });

  const deleteActivityMutation = useMutation({
    mutationKey: ["delete-activity", reportId],
    mutationFn: async (data: { id: string }) => {
      await deleteActivity(data.id);
    },
    onSuccess: () => {
      setMutationError("");
      queryClient.invalidateQueries({ queryKey: ["activities", reportId] });
      queryClient.invalidateQueries({ queryKey: ["totalTime", reportId] });
    },
    onError: (error) => {
      setMutationError(error.message);
    },
  });

  function changeTimeWorked(
    timeWorked: NullabbleTimeWorked,
    date: Date,
    id: string,
  ) {
    switch (timeWorked) {
      case `NONE`:
        newActivityMutation.mutate({
          date,
          timeWorked: "FULL_DAY",
        });
        break;
      case "FULL_DAY":
        activityTimeWorkedMutation.mutate({
          id,
          timeWorked: "HALF_DAY",
        });
        break;
      case "HALF_DAY":
        deleteActivityMutation.mutate({ id });
        break;
    }
  }

  return (
    <>
      {mutationError && <ErrorMessage error={mutationError} />}

      {!mutationError && (
        <Button
          isIconOnly
          onPress={() => {
            changeTimeWorked(activityTimeWorked, activityDate, activityId);
          }}
          className={"bg-teal-300"}
        >
          {getTimeWorkedDisplayString(activityTimeWorked, t)}
        </Button>
      )}
    </>
  );
};

export default TimeWorkedButton;
