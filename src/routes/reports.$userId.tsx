import {createFileRoute, Outlet, useNavigate} from '@tanstack/react-router'
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
import {getAllCompaniesByUser, getAllReportsByUser} from "../queries/getQueries.tsx";
import type {Company, Report} from "../queries/interfaces.tsx";
import {useTranslation} from "react-i18next";
import {formatDateMonthYear} from "../dateFormatting.tsx"
import {Spinner} from "@heroui/react";


export const Route = createFileRoute('/reports/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {t} = useTranslation();
  const { userId } = Route.useParams();
  const navigate = useNavigate();
  
  const columns = [
    {
      key: "month",
      label: t("MONTH"),
    },
    {
      key: "client",
      label: t('CLIENT'),
    },
    {
      key: "comment",
      label: t('COMMENT'),
    },
  ];
  
  type Row = {
    key: string,
    month: string,
    client: string,
    comment: string,
  }
  
  const reportsQuery = useQuery({
    queryKey: ['allReports', userId],
    queryFn: () => getAllReportsByUser(userId),
    retryDelay: 1000
  });
  
  const companiesQuery = useQuery({
    queryKey: ['allCompanies', userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000
  });
  
  if (reportsQuery.isLoading) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('Reports')}
          </h1>
          <div className="flex justify-center items-center">
            <Spinner/>
          </div>
        </>
  );
  }
  
  if (reportsQuery.isError) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('Reports')}
          </h1>
          <span>Error: {reportsQuery.error.message}</span>
        </>
    );
  }
  
  if (companiesQuery.isError) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('Reports')}
          </h1>
          <span>Error: {companiesQuery.error.message}</span>
        </>
    );
  }
  
  const rows: Row[] = reportsQuery.data.map((report: Report, index: number) => {
    const client = companiesQuery.data.find((company: Company) => company.id === report.clientId);
    const formattedDate = formatDateMonthYear(new Date(report.monthReport), t);
    
    return ({
        key: String(index),
        month: formattedDate,
        client: client.businessName,
        comment: report.comment,
    })
  });
  
  return (
      <>
        <h1 className="text-2xl font-bold justify-self-center p-10">
          {t('Reports')}
        </h1>
        <Table
            aria-label="reports table"
            selectionMode={'single'}
            selectedKeys={[]}
            onSelectionChange={() => {
              navigate({
                to: '/report-detail/$userId/$reportId',
                params: {
                  userId,
                  reportId: 'b5cc17ab-4211-11f0-a9d1-aa8a5f2ad6c5',
                },
              });
            }}
        >
          <TableHeader columns={columns}>
            {(column) => <TableColumn key={column.key}>{column.label}</TableColumn>}
          </TableHeader>
          <TableBody items={rows}>
            {(item) => (
                <TableRow key={item.key}>
                  {(columnKey) => <TableCell>{getKeyValue(item, columnKey)}</TableCell>}
                </TableRow>
            )}
          </TableBody>
        </Table>
        <Outlet/>
      </>
  );
}
