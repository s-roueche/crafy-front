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
import {useTranslation} from "react-i18next";
import {useState} from "react";


export const Route = createFileRoute('/$userId/companies')({
  component: RouteComponent,
})

function RouteComponent() {
  const {t} = useTranslation();
  const { userId } = Route.useParams();
  
  const columns = [
    {
      key: "name",
      label: t('NAME'),
    },
  ];
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allReports'],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000
  });
  
  const [selectedKeys, setSelectedKeys] = useState([]);
  
  if (isLoading) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('companies')}
          </h1>
          <span>Loading...</span>
        </>
    );
  }
  
  if (isError && error instanceof Error) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('companies')}
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
          {t('companies')}
        </h1>
        <Table
            aria-label="reports table"
            selectionMode={'single'}
            selectedKeys={selectedKeys}
            onSelectionChange={() => {
              setSelectedKeys([]);
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
      </>
  );
}
