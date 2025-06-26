import { Outlet, createRootRoute } from "@tanstack/react-router";
import { TanStackRouterDevtools } from "@tanstack/react-router-devtools";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

export const Route = createRootRoute({
  component: RootComponent,
});

function RootComponent() {
  return (
    <>
      <div className={"bg-teal-50 text-teal-950"}>
        <Outlet />
      </div>
      <TanStackRouterDevtools />
      <ReactQueryDevtools />
    </>
  );
}
