import {Outlet, createRootRoute, useRouter} from '@tanstack/react-router'
import {TanStackRouterDevtools} from "@tanstack/react-router-devtools";
import {ReactQueryDevtools} from "@tanstack/react-query-devtools";
import {Divider, Listbox, ListboxItem, ListboxSection} from "@heroui/react";
import { FaPenSquare } from "icons-react/fa";
import {useTranslation} from "react-i18next";

export const Route = createRootRoute({
  component: RootComponent,
})

function RootComponent() {
  const {t} = useTranslation();
  const router = useRouter();
  
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
                        <ListboxItem
                            key={"reports"}
                            href={
                              router.buildLocation({
                                to: '/$userId/reports',
                                params: { userId: 'b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5' },
                              }).href
                            }
                        >
                          <div className="text-lg">{t('Reports')}</div>
                        </ListboxItem>
                        <ListboxItem
                            key={"companies"}
                            href={
                              router.buildLocation({
                                to: '/$userId/companies',
                                params: { userId: 'b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5' },
                              }).href
                            }
                        >
                            <div className="text-lg">{t('Companies')}</div>
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
