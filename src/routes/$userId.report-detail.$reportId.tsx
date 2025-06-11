import { createFileRoute } from '@tanstack/react-router'
import { Card, CardHeader, CardBody, CardFooter, Divider } from "@heroui/react";

export const Route = createFileRoute('/$userId/report-detail/$reportId')({
  component: RouteComponent,
})

function RouteComponent() {
  return (
      <>
        <Card className="max-w-[400px]">
          <CardHeader className="flex gap-3">
            <div className="flex flex-col">
              <p className="text-md">HeroUI</p>
              <p className="text-small text-default-500">heroui.com</p>
            </div>
          </CardHeader>
          <Divider />
          <CardBody>
            <p>Make beautiful websites regardless of your design experience.</p>
          </CardBody>
          <Divider />
          <CardFooter>
          </CardFooter>
        </Card>
      </>
  );
}
