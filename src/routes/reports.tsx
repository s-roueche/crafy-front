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
import { getAllReports } from "../queries/getQueries.tsx";
import type {Report} from "../queries/interfaces.tsx";


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

function RouteComponent() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allReports'],
    queryFn: getAllReports,
    retryDelay: 1000
  });
  
  if (isLoading) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            Reports
          </h1>
          <span>Loading...</span>
        </>
  );
  }
  
  if (isError && error instanceof Error) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            Reports
          </h1>
          <span>Error: {error.message}</span>
        </>
    );
  }
  
  type Row = {
      key: string,
      month: Date,
      client: string,
      comment: string,
  }
  
  const rows: Row[] = data.map((report: Report, index: number) => {
      
      return ({
          key: String(index),
          month: report.monthReport,
          clientId: report.clientId,
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
