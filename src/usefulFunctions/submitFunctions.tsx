import type { SetStateAction } from "react";
import type { UseMutateFunction } from "@tanstack/react-query";

export function onSubmitReportComment(
  e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  },
  setReportCommentIsEditable: (isEditable: SetStateAction<boolean>) => void,
  mutateReportComment: UseMutateFunction<
    void,
    Error,
    {
      comment: string;
    },
    unknown
  >,
) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));

  setReportCommentIsEditable(false);
  mutateReportComment({
    comment: data.comment as string,
  });
}

export function onSubmitActivityComment(
  activityId: string,
  e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  },
  setActivityCommentsAreEditable: (
    areEditable: SetStateAction<boolean>,
  ) => void,
  mutateActivityComment: UseMutateFunction<
    void,
    Error,
    {
      id: string;
      comment: string;
    },
    unknown
  >,
) {
  e.preventDefault();
  const data = Object.fromEntries(new FormData(e.currentTarget));

  setActivityCommentsAreEditable(false);
  mutateActivityComment({
    id: activityId,
    comment: data.comment as string,
  });
}

export async function onSubmitReportForm(
  e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  },
  onClose: () => void,
  mutateReport: UseMutateFunction<
    void,
    Error,
    {
      clientId: string;
      userId: string;
      month: Date;
      comment: string;
    },
    unknown
  >,
  clientId: string | undefined,
  userId: string,
) {
  if (!clientId) {
    throw new Error("No client entered");
  }
  onClose();
  e.preventDefault();

  const data = Object.fromEntries(new FormData(e.currentTarget));

  mutateReport({
    clientId: clientId,
    userId,
    month: new Date(data.month as string),
    comment: data.comment as string,
  });
}
