import {
  Button,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/react";
import {
  formatDateDayOfTheWeek,
  getNumberOfDaysInMonth,
} from "../../usefulFunctions/dateHandling.tsx";
import { onSubmitActivityComment } from "../../usefulFunctions/submitFunctions.tsx";
import { useTranslation } from "react-i18next";
import type {
  Activity,
  NullabbleTimeWorked,
  TimeWorked,
} from "../../queries/interfaces.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import {
  updateActivityComment,
  updateActivityTimeWorked,
} from "../../queries/putQueries.tsx";
import { createActivity } from "../../queries/postQueries.tsx";
import { deleteActivity } from "../../queries/deleteQueries.tsx";
import { useState } from "react";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import EditableComment from "../Editables/EditableComment.tsx";

type ActivityTableProps = {
  reportId: string;
  reportMonth: Date;
  activities: Activity[];
};

type Item = {
  key: string;
  id: string;
  date: Date;
  timeWorked: NullabbleTimeWorked;
  timeWorkedDisplay: string;
  comment: string;
  isModifiable: boolean;
  setIsModifiable: (value: boolean) => void;
};

const ActivityTable = ({
  reportId,
  reportMonth,
  activities,
}: ActivityTableProps) => {
  const { t } = useTranslation();
  const queryClient = useQueryClient();
  const [activityCommentsAreEditable, setActivityCommentsAreEditable] =
    useState(false);
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
  const editActivityCommentMutation = useMutation({
    mutationKey: ["edit-activity-comment", reportId],
    mutationFn: async (data: { id: string; comment: string }) => {
      await updateActivityComment(data.id, data.comment);
    },
    onSuccess: () => {
      setMutationError("");
      queryClient.invalidateQueries({ queryKey: ["activities", reportId] });
    },
    onError: (error) => {
      setMutationError(error.message);
    },
  });

  function changeTimeWorked(item: Item) {
    switch (item.timeWorked) {
      case `NONE`:
        newActivityMutation.mutate({
          date: item.date,
          timeWorked: "FULL_DAY",
        });
        break;
      case "FULL_DAY":
        activityTimeWorkedMutation.mutate({
          id: item.id,
          timeWorked: "HALF_DAY",
        });
        break;
      case "HALF_DAY":
        deleteActivityMutation.mutate({ id: item.id });
        break;
    }
  }

  const rows: Item[] = [];

  for (let day = 1; day <= getNumberOfDaysInMonth(reportMonth); day++) {
    rows.push({
      key: String(day - 1),
      id: "",
      date: new Date(reportMonth.setUTCDate(day)),
      timeWorked: "NONE",
      timeWorkedDisplay: "+",
      comment: "",
      isModifiable: activityCommentsAreEditable,
      setIsModifiable: setActivityCommentsAreEditable,
    });
  }

  for (const activity of activities) {
    const item = rows[new Date(activity.date).getDate() - 1];
    let timeWorkedDisplay;

    if (activity.timeWorked === "FULL_DAY") {
      timeWorkedDisplay = `1${t("d")}`;
    } else {
      timeWorkedDisplay = `1/2${t("d")}`;
    }

    item.id = activity.id;
    item.timeWorkedDisplay = timeWorkedDisplay;
    item.timeWorked = activity.timeWorked;
    item.comment = activity.comment ? activity.comment : "";
  }

  return (
    <>
      {mutationError && <ErrorMessage error={mutationError} />}

      {!mutationError && (
        <>
          <div className={"text-2xl font-bold p-5 text-center"}>
            {t("Activities")}
          </div>

          <Table
            isStriped
            fullWidth
            sortDescriptor={{ column: "activity", direction: "ascending" }}
          >
            <TableHeader>
              <TableColumn key={"date"} className={"text-medium"}>
                {" "}
                {t("Date")}{" "}
              </TableColumn>
              <TableColumn key={"timeWorked"} className={"text-medium"}>
                {" "}
                {t("TimeWorked")}{" "}
              </TableColumn>
              <TableColumn key={"comment"} className={"text-medium"}>
                {" "}
                {t("Comment")}{" "}
              </TableColumn>
            </TableHeader>
            <TableBody items={rows}>
              {(item) => (
                <TableRow key={item.key}>
                  <TableCell>
                    <div className={"text-medium"}>
                      {formatDateDayOfTheWeek(item.date, t)}
                    </div>
                  </TableCell>
                  <TableCell className={"flex justify-center"}>
                    <Button
                      isIconOnly
                      onPress={() => {
                        changeTimeWorked(item);
                      }}
                    >
                      {item.timeWorkedDisplay}
                    </Button>
                  </TableCell>
                  <TableCell className={"justify-items-end"}>
                    <div className={"italic"}>
                      <EditableComment
                        isVisible={item.timeWorked != "NONE"}
                        comment={item.comment}
                        onSubmit={(e) =>
                          onSubmitActivityComment(
                            item.id,
                            e,
                            setActivityCommentsAreEditable,
                            editActivityCommentMutation.mutate,
                          )
                        }
                        isEditable={activityCommentsAreEditable}
                        setIsEditable={setActivityCommentsAreEditable}
                      />
                    </div>
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
        </>
      )}
    </>
  );
};

export default ActivityTable;
