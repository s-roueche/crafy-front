import { Button } from "@heroui/react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import type {
  NullabbleTimeWorked,
  TimeWorked,
} from "../../queries/interfaces.tsx";
import { updateActivityTimeWorked } from "../../queries/putQueries.tsx";
import { createActivity } from "../../queries/postQueries.tsx";
import { deleteActivity } from "../../queries/deleteQueries.tsx";
import { useState } from "react";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

type TimeWorkedButtonProps = {
  reportId: string;
  activityTimeWorked: NullabbleTimeWorked;
  activityDate: Date;
  activityId: string;
  timeWorkedDisplay: string;
};

const TimeWorkedButton = ({
  reportId,
  activityTimeWorked,
  activityId,
  activityDate,
  timeWorkedDisplay,
}: TimeWorkedButtonProps) => {
  const queryClient = useQueryClient();
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
        >
          {timeWorkedDisplay}
        </Button>
      )}
    </>
  );
};

export default TimeWorkedButton;
