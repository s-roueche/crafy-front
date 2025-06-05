import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/reports')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div></div>
}
