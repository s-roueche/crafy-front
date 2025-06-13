import { createFileRoute } from '@tanstack/react-router'
import { Divider } from "@heroui/react";
import {useTranslation} from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import {getReportById, getCompanyById, getTotalTimeByReport, getActivitiesByReport} from "../queries/getQueries.tsx";
import {Spinner} from "@heroui/react";
import formatDate from "../dateFormatting.tsx";

export const Route = createFileRoute('/$userId/report-detail/$reportId')({
  component: RouteComponent,
})

function RouteComponent() {
  const { t } = useTranslation();
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
  
  return (
      <div className={'flex gap-4'}>
        <div className={'w-2/5'}>
          <div className={'text-2xl font-bold p-4'}>
            {t('Report')} {t('of')} {formatDate(new Date(reportQuery.data.monthReport), t)}
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
        
        <div>  </div>
        
      </div>
  );
}
