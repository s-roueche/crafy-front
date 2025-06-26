import {
  getKeyValue,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@heroui/table";
import type { Company } from "../../queries/type.ts";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { getAllCompaniesByUser } from "../../queries/getQueries.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";
import Loading from "../Feedback/Loading.tsx";
import { useAuth } from "react-oidc-context";

type Row = {
  key: string;
  name: string;
};

const CompaniesTable = () => {
  const { t } = useTranslation();
  const auth = useAuth();
  const userId = auth.user ? auth.user.profile.sub : "";
  const companiesQuery = useQuery({
    queryKey: ["allCompanies", userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000,
  });

  const companyRows: Row[] = companiesQuery.data
    ? companiesQuery.data.map((company: Company, index: number) => ({
        key: String(index),
        name: company.businessName,
      }))
    : [];

  return (
    <>
      {companiesQuery.isError && (
        <ErrorMessage error={companiesQuery.error.message} />
      )}

      {companiesQuery.isLoading && <Loading />}

      {companiesQuery.isSuccess && (
        <Table
          aria-label="reports table"
          selectionMode={"single"}
          selectedKeys={[]}
          disableAnimation
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
              <TableColumn
                key={column.key}
                className={"bg-teal-100 text-teal-900"}
              >
                {column.label}
              </TableColumn>
            )}
          </TableHeader>
          <TableBody items={companyRows}>
            {(item) => (
              <TableRow
                key={item.key}
                className={"hover:!bg-teal-100 transition-colors"}
              >
                {(columnKey) => (
                  <TableCell>{getKeyValue(item, columnKey)}</TableCell>
                )}
              </TableRow>
            )}
          </TableBody>
        </Table>
      )}
    </>
  );
};

export default CompaniesTable;
