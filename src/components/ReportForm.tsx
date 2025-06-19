import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
  Spinner,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getAllCompaniesByUser } from "../queries/getQueries";
import type { Company } from "../queries/interfaces.tsx";
import { createReport } from "../queries/postQueries";

export default function ReportForm(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: string;
}) {
  const { t } = useTranslation();
  const [client, setClient] = useState<string>();
  const { onOpenChange, onClose, isOpen, userId } = props;
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

  if (companiesQuery.isLoading || reportMutation.isPending) {
    return (
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    );
  }

  if (companiesQuery.isError) {
    return <span>Error: {companiesQuery.error.message}</span>;
  }

  if (reportMutation.isError) {
    return <span>Error: {reportMutation.error.message}</span>;
  }

  type Item = {
    key: string;
    label: string;
  };

  const clients: Item[] = companiesQuery.data.map((client: Company) => {
    return {
      key: client.id,
      label: client.businessName,
    };
  });

  const onSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    if (!client) {
      throw new Error("No client entered");
    }
    onClose();
    e.preventDefault();

    const data = Object.fromEntries(new FormData(e.currentTarget));

    reportMutation.mutate({
      clientId: client,
      userId,
      month: new Date(data.month as string),
      comment: data.comment as string,
    });

    console.log(data);
    console.log(client);
  };

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("AddReport")}
              </ModalHeader>
              <ModalBody>
                <Form className="w-full max-w-xs" onSubmit={onSubmit}>
                  <Input
                    type={"month"}
                    isRequired
                    label={t("Month")}
                    labelPlacement="outside"
                    name="month"
                    placeholder={t("EnterMonthReport")}
                  />
                  <Select
                    onSelectionChange={(key) => setClient(key.currentKey)}
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
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
}
