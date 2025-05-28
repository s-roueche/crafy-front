import {createFileRoute, Link} from '@tanstack/react-router'
import {Button} from "@heroui/react";
import { GoSmiley } from "icons-react/go";
import {useQuery} from "@tanstack/react-query";
import {getHello} from "../queries/getQueries.tsx";

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  const { isLoading, isError, data, error } = useQuery({
    queryKey: ['helloWorld'],
    queryFn: getHello,
    retryDelay: 1000
  });
  
  
  if (isLoading) {
    return <span>Loading...</span>;
  }
  
  if (isError && error instanceof Error) {
    return <span>Error: {error.message}</span>;
  }
  
  return (
      <>
        <h1 className="text-3xl font-bold">
            {data}
        </h1>
        <Link to={"/page2"}>
        <Button color={"primary"} endContent={<GoSmiley/>}>
          See More
        </Button>
        </Link>
      </>
  )
}
