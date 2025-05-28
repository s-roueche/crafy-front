import {createFileRoute, Link} from '@tanstack/react-router'
import {Gi3DMeeple } from 'icons-react/gi';
import {Button} from "@heroui/react";

export const Route = createFileRoute('/page2')({
  component: RouteComponent,
})

function RouteComponent() {
    return (
        <>
            <h1 className="text-3xl font-bold">
                The one other page
            </h1>
            <Link to={"/"}>
                <Button color={"primary"} endContent={<Gi3DMeeple/>}>Button</Button>
            </Link>
        </>
    )
}
