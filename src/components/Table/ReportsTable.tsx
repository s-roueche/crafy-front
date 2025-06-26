import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import type { Selection } from "@heroui/react";
import { useNavigate } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {
  getAllCompaniesByUser,
  getAllReportsByUser,
} from "../../queries/getQueries.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import Loading from "../Feedback/Loading.tsx";
import { getReportRows } from "../../usefulFunctions/getRows.tsx";
import { useAuth } from "react-oidc-context";

type Row = {
  key: string;
  month: string;
  client: string;
  comment: string | null | undefined;
};

const ReportsTable = () => {
  const navigate = useNavigate();
  const { t } = useTranslation();
  const auth = useAuth();
  const userId = auth.user ? auth.user.profile.sub : "";
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
    reportsQuery.isSuccess && companiesQuery.isSuccess
      ? getReportRows(reportsQuery.data, companiesQuery.data, t)
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
      {reportsQuery.isError && (
        <ErrorMessage error={reportsQuery.error.message} />
      )}
      {companiesQuery.isError && (
        <ErrorMessage error={companiesQuery.error.message} />
      )}
      {(companiesQuery.isLoading || reportsQuery.isLoading) && <Loading />}
      {reportsQuery.isSuccess && companiesQuery.isSuccess && (
        <Table
          aria-label="reports table"
          selectionMode={"single"}
          selectedKeys={[]}
          onSelectionChange={goToDetail}
          disableAnimation
        >
          <TableHeader columns={columns}>
            {(column) => (
              <TableColumn
                key={column.key}
                className={"bg-teal-100 text-teal-900"}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={rows}>
            {(row) => (
              <TableRow
                key={row.key}
                className={"hover:!bg-teal-100 transition-colors"}
              >
                {(columnKey) => (
                  <TableCell>{getKeyValue(row, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default ReportsTable;
