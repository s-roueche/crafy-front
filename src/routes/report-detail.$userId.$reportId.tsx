import { createFileRoute } from '@tanstack/react-router'
import {
  Divider,
  Table,
  TableHeader,
  TableColumn,
  TableBody,
  TableRow,
  TableCell,
  Button, Input, Form,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { getReportById, getCompanyById, getTotalTimeByReport, getActivitiesByReport} from "../queries/getQueries.tsx";
import { Spinner } from "@heroui/react";
import { formatDateMonthYear, formatDateDayOfTheWeek, getNumberOfDaysInMonth } from "../utils/dateHandling.tsx";
import type {TimeWorked, NullabbleTimeWorked} from "../queries/interfaces.tsx";
import { updateActivityTimeWorked, updateActivityComment } from "../queries/putQueries.tsx";
import { createActivity } from "../queries/postQueries.tsx";
import { deleteActivity } from "../queries/deleteQueries.tsx";
import {useState} from "react";
import {FiCheck, FiEdit3} from "icons-react/fi";


export const Route = createFileRoute('/report-detail/$userId/$reportId')({
  component: RouteComponent,
})


type Item = {
  key: string,
  id: string,
  date: Date,
  timeWorked: NullabbleTimeWorked,
  timeWorkedDisplay: string,
  comment: string
  isModifiable: boolean,
  setIsModifiable: (value: boolean) => void,
}


function RouteComponent() {
  const { t } = useTranslation();
  const { reportId } = Route.useParams();
  const queryClient = useQueryClient();
  const [isModifiable, setIsModifiable] = useState(false);
  
  const reportQuery = useQuery({
    queryKey: ['report', reportId],
    queryFn: () => getReportById(reportId),
    retryDelay: 1000,
  });
  
  const companyQuery = useQuery({
    queryKey: ['company', reportId],
    queryFn: () => getCompanyById(reportQuery.data.clientId),
    retryDelay: 1000,
  });
  
  const totalTimeQuery = useQuery({
    queryKey: ['totalTime', reportId],
    queryFn: () => getTotalTimeByReport(reportQuery.data.id),
    retryDelay: 1000,
  });
  
  const activitiesQuery = useQuery({
    queryKey: ['activities', reportId],
    queryFn: () => getActivitiesByReport(reportQuery.data.id),
    retryDelay: 1000,
  });
  
  const activityTimeWorkedMutation = useMutation({
    mutationKey: ['activityTimeWorked', reportId],
    mutationFn: async (data: {
      id: string;
      timeWorked: TimeWorked;
    }) => {await updateActivityTimeWorked(
        data.id,
        data.timeWorked,
    )},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', reportId] });
      queryClient.invalidateQueries({ queryKey: ['totalTime', reportId] });
    },
  })
  
  const newActivityMutation = useMutation({
    mutationKey: ['add-activity', reportId],
    mutationFn: async (data: {
      timeWorked: TimeWorked;
      date: Date,
    }) => {await createActivity(
        data.date,
        reportId,
        data.timeWorked,
        ''
    )},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', reportId] });
      queryClient.invalidateQueries({ queryKey: ['totalTime', reportId] });
    },
  })
  
  const deleteActivityMutation = useMutation({
    mutationKey: ['delete-activity', reportId],
    mutationFn: async (data: {
      id: string;
    }) => {await deleteActivity(data.id)},
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', reportId] });
      queryClient.invalidateQueries({ queryKey: ['totalTime', reportId] });
    },
  })
  
  const editActivityCommentMutation = useMutation({
    mutationKey: ['edit-activity-comment', reportId],
    mutationFn: async (data: {
      id: string;
      comment: string;
    }) => {
      await updateActivityComment(data.id, data.comment);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['activities', reportId] });
    },
  })
  
  function changeTimeWorked(item: Item) {
    switch (item.timeWorked) {
      case `NONE`:
        newActivityMutation.mutate({
          date: item.date,
          timeWorked: 'FULL_DAY'
        })
        break;
      case 'FULL_DAY':
        activityTimeWorkedMutation.mutate({
          id: item.id,
          timeWorked: 'HALF_DAY',
        });
        break;
      case 'HALF_DAY':
        deleteActivityMutation.mutate({ id: item.id })
        break;
      default:
        throw new Error(`Invalid time worked ${item.timeWorked}`);
    }
  }
  
  if (
      reportQuery.isLoading
      || companyQuery.isLoading
      || totalTimeQuery.isLoading
  ) {
    return (
        <div className="flex justify-center items-center">
          <Spinner/>
        </div>
    )
  }
  
  const reportInformationsComponent = <div className={'w-2/5'}>
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
    
    <div className={'flex justify-between'}>
      <div className={'text-lg p-5'}>{t('Comment')} : {reportQuery.data.comment}</div>
      <Button className={'m-4'} isIconOnly endContent={<FiEdit3/>}></Button>
    </div>
  
  </div>
  
  if (
      activitiesQuery.isLoading
      || activityTimeWorkedMutation.isPending
      || newActivityMutation.isPending
      || deleteActivityMutation.isPending
      || editActivityCommentMutation.isPending
  ) {
    return (
        <div className={'flex gap-4'}>
          {reportInformationsComponent}
          
          <Divider orientation="vertical" className={'h-screen'} />
      
          <div className="flex-1 flex justify-center w-full">
            <Spinner/>
          </div>
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
 
  if (activityTimeWorkedMutation.isError) {
    return <span>Error: {activityTimeWorkedMutation.error.message}</span>
  }
  
  if (newActivityMutation.isError) {
    return <span>Error: {newActivityMutation.error.message}</span>
  }
  
  if (deleteActivityMutation.isError) {
    return <span>Error: {deleteActivityMutation.error.message}</span>
  }
  
  if (editActivityCommentMutation.isError) {
    return <span>Error: {editActivityCommentMutation.error.message}</span>
  }
  
  function onSubmitComment(
      activityId: string,
      e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }) {
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    setIsModifiable(!isModifiable)
    editActivityCommentMutation.mutate({
      id: activityId,
      comment: data.comment as string
    });
  }
  
  function getCommentDisplay(
      timeWorked: NullabbleTimeWorked,
      comment: string,
      activityId: string
  ) {
    switch (timeWorked) {
      case `NONE`:
        return <div/>
      case 'FULL_DAY':
      case "HALF_DAY":
        if (!isModifiable) {
          return (
              <div className={'flex space-x-14'}>
                <div className={'self-center'}>{comment}</div>
                <Button
                    onPress={() => {
                      setIsModifiable(!isModifiable)
                    }}
                    variant={'flat'}
                    size={'sm'}
                    isIconOnly
                    endContent={<FiEdit3/>}
                ></Button>
              </div>
          )
        } else {
          return (
              <Form onSubmit={(e) => onSubmitComment(activityId, e)}>
                <div className={'flex space-x-2'}>
                  <Input
                    defaultValue={comment}
                    variant={'underlined'}
                    name={'comment'}
                />
                  <Button
                      type={"submit"}
                      variant={'flat'}
                      size={'sm'}
                      isIconOnly
                      endContent={<FiCheck/>}
                  ></Button>
                </div>
              </Form>
          )
        }
    }
    
  }
  
  const rows: Item[] = [];
  
  for (let day = 1 ; day <= getNumberOfDaysInMonth(new Date(reportQuery.data.monthReport)); day++) {
    
    
    rows.push({
      key: String(day - 1),
      id: '',
      date: new Date(new Date(reportQuery.data.monthReport).setUTCDate(day)),
      timeWorked: 'NONE',
      timeWorkedDisplay: '+',
      comment: '',
      isModifiable,
      setIsModifiable
    })
  }
  
  for (const activity  of activitiesQuery.data) {
    const item = rows[new Date(activity.date).getDate() - 1];
    let timeWorkedDisplay;
    
    if (activity.timeWorked === 'FULL_DAY') {
      timeWorkedDisplay = `1${t('d')}`;
    } else {
      timeWorkedDisplay = `1/2${t('d')}`;
    }
    
    item.id = activity.id;
    item.timeWorkedDisplay = timeWorkedDisplay;
    item.timeWorked = activity.timeWorked;
    item.comment = activity.comment;
  }
  
  return (
      <div className={'flex gap-4'}>
        {reportInformationsComponent}
        
        <Divider orientation="vertical" className={'h-screen'} />
        
        <div>
          <div className={'text-2xl font-bold p-5 text-center'}>{t('Activities')}</div>
          
          <div>
            <Table isVirtualized isStriped fullWidth sortDescriptor={{column: 'activity', direction: 'ascending'}}>
              <TableHeader>
                <TableColumn key={'date'} className={'text-medium'}> {t('Date')} </TableColumn>
                <TableColumn key={'timeWorked'} className={'text-medium'}> {t('TimeWorked')} </TableColumn>
                <TableColumn key={'comment'} className={'text-medium'}> {t('Comment')} </TableColumn>
              </TableHeader>
              <TableBody items={rows}>
                {(item) => (
                    <TableRow key={item.key}>
                        <TableCell>
                          <div className={'text-medium'}>{formatDateDayOfTheWeek(item.date, t)}</div>
                        </TableCell>
                      <TableCell className={'flex justify-center'}>
                        <Button
                            isIconOnly
                            onPress={() => { changeTimeWorked(item) }}
                        >{item.timeWorkedDisplay}</Button>
                      </TableCell>
                      <TableCell className={'justify-items-end'}>
                        <div className={'italic'}>{getCommentDisplay(
                            item.timeWorked,
                            item.comment,
                            item.id
                        )}</div>
                      </TableCell>
                    </TableRow>
                )}
              </TableBody>
            </Table>
          </div>
          
        </div>
        
      </div>
  );
}
