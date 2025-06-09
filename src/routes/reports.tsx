import { createFileRoute } from '@tanstack/react-router'
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


export const Route = createFileRoute('/reports')({
  component: RouteComponent,
})

const columns = [
  {
    key: "month",
    label: "MONTH",
  },
  {
    key: "client",
    label: "CLIENT",
  },
  {
    key: "comment",
    label: "COMMENT",
  },
];

type Row = {
  key: string,
  month: string,
  client: string,
  comment: string,
}

function RouteComponent() {
  const reportsQuery = useQuery({
    queryKey: ['allReports'],
    queryFn: () => getAllReportsByUser('b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5'),
    retryDelay: 1000
  });
  
  const companiesQuery = useQuery({
    queryKey: ['allCompanies'],
    queryFn: () => getAllCompaniesByUser('b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5'),
    retryDelay: 1000
  });
  
  if (reportsQuery.isLoading) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            Reports
          </h1>
          <span>Loading...</span>
        </>
  );
  }
  
  if (reportsQuery.isError) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            Reports
          </h1>
          <span>Error: {reportsQuery.error.message}</span>
        </>
    );
  }
  
  if (companiesQuery.isError) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            Reports
          </h1>
          <span>Error: {companiesQuery.error.message}</span>
        </>
    );
  }
  
  const rows: Row[] = reportsQuery.data.map((report: Report, index: number) => {
    const options: Intl.DateTimeFormatOptions = {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    };
    const client = companiesQuery.data.find((company: Company) => company.id === report.clientId)
    
    return ({
        key: String(index),
        month: new Date(report.monthReport).toLocaleDateString(undefined, options),
        client: client.businessName,
        comment: report.comment,
    })
  });
  
  return (
      <>
        <h1 className="text-2xl font-bold justify-self-center p-10">
          Reports
        </h1>
        <Table aria-label="reports table">
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
      </>
  );
}
