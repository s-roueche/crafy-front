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
import { getAllCompaniesByUser } from "../queries/getQueries.tsx";
import type {Company} from "../queries/interfaces.tsx";


export const Route = createFileRoute('/companies')({
  component: RouteComponent,
})

const columns = [
  {
    key: "name",
    label: "NAME",
  },
];

function RouteComponent() {
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allReports'],
    queryFn: () => getAllCompaniesByUser('b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5'),
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
    name: string,
  }
  
  const rows: Row[] = data.map((company: Company, index: number) => {
    
    return ({
      key: String(index),
      name: company.businessName,
    })
  });
  
  return (
      <>
        <h1 className="text-2xl font-bold justify-self-center p-10">
          Companies
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
