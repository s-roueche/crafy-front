import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import { Divider } from "@heroui/react";
import SideBar from "../components/Layout/SideBar.tsx";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className="flex min-h-screen">
        <SideBar />
        <Divider orientation="vertical" className="h-auto" />
        <div className="flex-1 p-6">
          <Outlet />
        </div>
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
