import { createFileRoute } from '@tanstack/react-router'
import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button,
  useDisclosure
} from "@heroui/react";
import {useTranslation} from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {getReportById, getCompanyById, getTotalTimeByReport, getActivitiesByReport} from "../queries/getQueries.tsx";
import {Spinner} from "@heroui/react";
import {formatDateMonthYear, formatDateDayMonthYear} from "../dateFormatting.tsx";
import type {Activity} from "../queries/interfaces.tsx";
import {FiPlusCircle} from "icons-react/fi";
import ActivityForm from "../components/ActivityForm.tsx";

export const Route = createFileRoute('/report-detail/$userId/$reportId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const { reportId } = Route.useParams();
  
  const reportQuery = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReportById(reportId),
    retryDelay: 1000,
  })
  
  const companyQuery = useQuery({
    queryKey: ['company', reportId],
    queryFn: () => getCompanyById(reportQuery.data.clientId),
    retryDelay: 1000,
  })
  
  const totalTimeQuery = useQuery({
    queryKey: ['totalTime', reportId],
    queryFn: () => getTotalTimeByReport(reportQuery.data.id),
    retryDelay: 1000,
  })
  
  const activitiesQuery = useQuery({
    queryKey: ['activities', reportId],
    queryFn: () => getActivitiesByReport(reportQuery.data.id),
    retryDelay: 1000,
  })
  
  if (reportQuery.isLoading || companyQuery.isLoading || totalTimeQuery.isLoading || activitiesQuery.isLoading) {
    return (
        <div className="flex justify-center items-center">
          <Spinner/>
        </div>
    )
  }
  
  if (reportQuery.isError) {
    return <span>Error: {reportQuery.error.message}</span>
  }
  
  if (companyQuery.isError) {
    return <span>Error: {companyQuery.error.message}</span>
  }
  
  if (totalTimeQuery.isError) {
    return <span>Error: {totalTimeQuery.error.message}</span>
  }
  
  if (activitiesQuery.isError) {
    return <span>Error: {activitiesQuery.error.message}</span>
  }
  
  type Row = {
    key: string,
    date: Date,
    timeWorked: string,
    comment: string
  }
  
  const rows: Row[] = activitiesQuery.data.map((activity: Activity, index: number) => {
    const timeWorkedString: string = activity.timeWorked === 'FULL_DAY' ? t('FullDay') : t('HalfDay');
    
    return ({
      key: String(index),
      date: new Date(activity.date),
      timeWorked: timeWorkedString,
      comment: activity.comment,
    })
  });
  
  return (
      <div className={'flex gap-4'}>
        <div className={'w-2/5'}>
          <div className={'text-2xl font-bold p-5 text-center'}>
            {t('Report')} {t('of')} {formatDateMonthYear(new Date(reportQuery.data.monthReport), t)}
          </div>
          
          <Divider/>
          
          <div className={'text-lg p-5 pb-3'}>
            {t('Client')} : {companyQuery.data.businessName}
          </div>
          <div className={'text-lg p-5 pt-0'}>
            {t('TotalTime')} : {totalTimeQuery.data} {t('day')}{totalTimeQuery.data === 1?'':'s'}
          </div>
          
          <Divider/>
          
          <div className={'text-lg p-5'}>
            {t('Comment')} : {reportQuery.data.comment}
          </div>
        
        </div>
        
        <Divider orientation="vertical" className={'h-screen'} />
        
        <div>
          <div className={'text-2xl font-bold p-5 text-center'}>{t('Activities')}</div>
          
          <div>
            <Table hideHeader fullWidth sortDescriptor={{column: 'activity', direction: 'ascending'}}>
              <TableHeader>
                <TableColumn key={'activity'}> ACTIVITY </TableColumn>
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key}>
                      <TableCell>
                        <div>{formatDateDayMonthYear(item.date, t)} : {item.timeWorked}</div>
                        <div className={'pb-3 italic'}>{t('Comment')} : {item.comment}</div>
                        <Divider/>
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
            
            <Button onPress={() => onOpen()} className={'p-5 mt-10'} startContent={<FiPlusCircle/>}>
              {t('Add')}
            </Button>
            <ActivityForm isOpen={isOpen} onClose={onClose} onOpenChange={onOpenChange} reportId={reportId}/>
          </div>
          
        </div>
        
      </div>
  );
}
