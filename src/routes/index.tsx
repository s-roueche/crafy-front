import {createFileRoute} from '@tanstack/react-router'

export const Route = createFileRoute('/')({
  component: RouteComponent,
})

function RouteComponent() {
  
  return (
      <>
        <h1 className="text-3xl font-bold justify-self-center">
            Welcome to Crafy !
        </h1>
      </>
  )
}
