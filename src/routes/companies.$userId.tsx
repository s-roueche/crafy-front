import {createFileRoute} from '@tanstack/react-router'
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
import {Button, Spinner, useDisclosure} from "@heroui/react";
import {FiPlusCircle} from "icons-react/fi";
import CompanyForm from "../components/CompanyForm.tsx";

export const Route = createFileRoute('/companies/$userId')({
  component: RouteComponent,
})

function RouteComponent() {
  const {t} = useTranslation();
  const { userId } = Route.useParams();
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  
  const columns = [
    {
      key: "name",
      label: t('NAME'),
    },
  ];
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['allCompanies', userId],
    queryFn: () => getAllCompaniesByUser(userId),
    retryDelay: 1000
  });
  
  type Row = {
    key: string,
    name: string,
  }
  
  const rows: Row[] = data.map((company: Company, index: number) => ({
    key: String(index),
    name: company.businessName,
  }));
  
  if (isLoading) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('Companies')}
          </h1>
          <div className="flex justify-center items-center">
            <Spinner/>
          </div>
        </>
    );
  }
  
  if (isError && error instanceof Error) {
    return (
        <>
          <h1 className="text-2xl font-bold justify-self-center p-10">
            {t('Companies')}
          </h1>
          <span>Error: {error.message}</span>
        </>
    );
  }
  
  return (
      <>
        <h1 className="text-2xl font-bold justify-self-center p-10">
          {t('Companies')}
        </h1>
        <Table
            aria-label="reports table"
            selectionMode={'single'}
            selectedKeys={[]}
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
        <Button onPress={() => onOpen()} className={'p-5 mt-10'} startContent={<FiPlusCircle/>}>
          {t('Add')}
        </Button>
        <CompanyForm isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} userId={userId} />
      </>
  );
}
