import {Outlet, createRootRoute} from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Divider, Listbox, ListboxItem, ListboxSection} from "@heroui/react";
import { FaPenSquare } from "icons-react/fa";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  return (
    <>
        <div className="flex min-h-screen">
            <div className="w-64 p-4 border-r border-divider">
                <Listbox>
                    <ListboxSection showDivider>
                        <ListboxItem
                            startContent={<FaPenSquare/>}
                            key={"app_name"}
                            href={'/'}
                            variant={'light'}
                        >
                            <div className="text-lg">Crafy</div>
                        </ListboxItem>
                    </ListboxSection>
                    <ListboxSection>
                        <ListboxItem key={"reports"} href={"/reports"}>
                            <div className="text-lg">Reports</div>
                        </ListboxItem>
                        <ListboxItem key={"companies"} href={"/companies"}>
                            <div className="text-lg">Companies</div>
                        </ListboxItem>
                    </ListboxSection>
                </Listbox>
            </div>
            
            <Divider orientation="vertical" className="h-auto" />
            
            <div className="flex-1 p-6">
                <Outlet />
            </div>
        </div>
        <TanStackRouterDevtools/>
        <ReactQueryDevtools/>
    </>
  )
}
