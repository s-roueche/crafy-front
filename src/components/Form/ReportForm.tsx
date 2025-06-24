import { Button, Form, Input, Select, SelectItem } from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCompaniesByUser } from "../../queries/getQueries.tsx";
import type { Company } from "../../queries/type.ts";
import { createReport } from "../../queries/postQueries.tsx";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import { onSubmitReportForm } from "../../usefulFunctions/submitFunctions.tsx";

type ReportFormProps = {
  onClose: () => void;
  userId: string;
};

type Item = {
  key: string;
  label: string;
};

export default function ReportForm({ onClose, userId }: ReportFormProps) {
  const { t } = useTranslation();
  const [clientId, setClientId] = useState<string>();
  const queryClient = useQueryClient();

  const companiesQuery = useQuery({
    queryKey: ["clients", userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000,
  });

  const reportMutation = useMutation({
    mutationKey: ["add-report", userId],
    mutationFn: async (data: {
      clientId: string;
      userId: string;
      month: Date;
      comment: string;
    }) => {
      await createReport(data.clientId, data.userId, data.month, data.comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allReports", userId] });
    },
  });

  const clients: Item[] = companiesQuery.isSuccess
    ? companiesQuery.data.map((client: Company) => {
        return {
          key: client.id,
          label: client.businessName,
        };
      })
    : [];

  return (
    <>
      {companiesQuery.isError && (
        <ErrorMessage error={companiesQuery.error.message} />
      )}

      {reportMutation.isError && (
        <ErrorMessage error={reportMutation.error.message} />
      )}

      {(companiesQuery.isLoading || reportMutation.isPending) && <Loading />}

      {companiesQuery.isSuccess && !reportMutation.isError && (
        <Form
          className="w-full max-w-xs"
          onSubmit={(e) => {
            onSubmitReportForm(
              e,
              onClose,
              reportMutation.mutate,
              clientId,
              userId,
            );
          }}
        >
          <Input
            type={"month"}
            isRequired
            label={t("Month")}
            labelPlacement="outside"
            name="month"
            placeholder={t("EnterMonthReport")}
          />
          <Select
            onSelectionChange={(key) => setClientId(key.currentKey)}
            items={clients}
            label={t("Client")}
            labelPlacement="outside"
            placeholder={t("SelectClient")}
          >
            {(item) => <SelectItem>{item.label}</SelectItem>}
          </Select>
          <Input
            label={t("Comment")}
            labelPlacement="outside"
            name="comment"
            placeholder={t("EnterComment")}
          />
          <Button type="submit" variant="bordered" className={"my-5"}>
            Submit
          </Button>
        </Form>
      )}
    </>
  );
}
