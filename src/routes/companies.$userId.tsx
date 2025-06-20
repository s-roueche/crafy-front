import { createFileRoute } from "@tanstack/react-router";
import {
  Table,
  TableHeader,
  TableBody,
  TableColumn,
  TableRow,
  TableCell,
  getKeyValue,
} from "@heroui/table";
import { useQuery } from "@tanstack/react-query";
import { getAllCompaniesByUser } from "../queries/getQueries.tsx";
import type { Company } from "../queries/interfaces.tsx";
import { useTranslation } from "react-i18next";
import { Button, useDisclosure } from "@heroui/react";
import { FiPlusCircle } from "icons-react/fi";
import CompanyForm from "../components/Form/CompanyForm.tsx";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";
import PageTitle from "../components/Layout/PageTitle.tsx";
import Loading from "../components/Feedback/Loading.tsx";

type Row = {
  key: string;
  name: string;
};

export const Route = createFileRoute("/companies/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const { isLoading, isError, isSuccess, data, error } = useQuery({
    queryKey: ["allCompanies", userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000,
  });

  const companyRows: Row[] = data
    ? data.map((company: Company, index: number) => ({
        key: String(index),
        name: company.businessName,
      }))
    : [];

  return (
    <>
      {isError && <ErrorMessage error={error.message} title={t("Companies")} />}
      {isLoading && <Loading title={t("Companies")} />}
      {isSuccess && (
        <>
          <PageTitle title={t("Companies")} />
          <Table
            aria-label="reports table"
            selectionMode={"single"}
            selectedKeys={[]}
          >
            <TableHeader
              columns={[
                {
                  key: "name",
                  label: t("NAME"),
                },
              ]}
            >
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={companyRows}>
              {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => (
                    <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                  )}
                </TableRow>
              )}
            </TableBody>
          </Table>
          <Button
            onPress={() => onOpen()}
            className={"p-5 mt-10"}
            startContent={<FiPlusCircle />}
          >
            {t("Add")}
          </Button>
          <CompanyForm
            isOpen={isOpen}
            onClose={onClose}
            onOpenChange={onOpenChange}
            userId={userId}
          />
        </>
      )}
    </>
  );
}
