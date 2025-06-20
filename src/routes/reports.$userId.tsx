import { createFileRoute, useNavigate } from "@tanstack/react-router";
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
import {
  getAllCompaniesByUser,
  getAllReportsByUser,
} from "../queries/getQueries.tsx";
import type { Company, Report } from "../queries/interfaces.tsx";
import { useTranslation } from "react-i18next";
import { formatDateMonthYear } from "../usefulFunctions/dateHandling.tsx";
import { Button, type Selection, useDisclosure } from "@heroui/react";
import ReportForm from "../components/Form/ReportForm.tsx";
import { FiPlusCircle } from "icons-react/fi";
import PageTitle from "../components/Layout/PageTitle.tsx";
import Loading from "../components/Feedback/Loading.tsx";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";

type Row = {
  key: string;
  month: string;
  client: string;
  comment: string;
};

export const Route = createFileRoute("/reports/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { t } = useTranslation();
  const navigate = useNavigate();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const reportsQuery = useQuery({
    queryKey: ["allReports", userId],
    queryFn: () => getAllReportsByUser(userId),
    retryDelay: 1000,
  });
  const companiesQuery = useQuery({
    queryKey: ["allCompanies", userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000,
  });

  const columns = [
    {
      key: "month",
      label: t("MONTH"),
    },
    {
      key: "client",
      label: t("CLIENT"),
    },
    {
      key: "comment",
      label: t("COMMENT"),
    },
  ];

  const rows: Row[] =
    reportsQuery.data && companiesQuery.data
      ? reportsQuery.data.map((report: Report) => {
          const client = companiesQuery.data.find(
            (company: Company) => company.id === report.clientId,
          );
          const formattedDate = formatDateMonthYear(
            new Date(report.monthReport),
            t,
          );

          return {
            key: report.id,
            month: formattedDate,
            client: client.businessName,
            comment: report.comment,
          };
        })
      : [];

  async function goToDetail(selection: Selection) {
    const reportId = Array.from(selection)[0];
    await navigate({
      to: "/report-detail/$userId/$reportId",
      params: {
        userId,
        reportId: reportId,
      },
    });
  }

  return (
    <>
      {companiesQuery.isError && (
        <>
          <PageTitle title={t("Reports")} />
          <ErrorMessage
            error={companiesQuery.error.message}
            title={t("Reports")}
          />
        </>
      )}
      {reportsQuery.isError && (
        <>
          <PageTitle title={t("Reports")} />
          <ErrorMessage
            error={reportsQuery.error.message}
            title={t("Reports")}
          />
        </>
      )}
      {(reportsQuery.isLoading || companiesQuery.isLoading) && (
        <>
          <PageTitle title={t("Reports")} />
          <Loading title={t("Reports")} />
        </>
      )}
      {reportsQuery.isSuccess && companiesQuery.isSuccess && (
        <>
          <PageTitle title={t("Reports")} />
          <Table
            aria-label="reports table"
            selectionMode={"single"}
            selectedKeys={[]}
            onSelectionChange={goToDetail}
          >
            <TableHeader columns={columns}>
              {(column) => (
                <TableColumn key={column.key}>{column.label}</TableColumn>
              )}
            </TableHeader>
            <TableBody items={rows}>
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
          <ReportForm
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
