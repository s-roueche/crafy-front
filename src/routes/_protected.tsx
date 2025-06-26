import { createFileRoute, Outlet } from "@tanstack/react-router";
import SideBar from "../components/Layout/SideBar.tsx";

export const Route = createFileRoute("/_protected")({
  component: RouteComponent,
});

function RouteComponent() {
  return (
    <div className={"flex min-h-screen bg-teal-50 text-teal-950"}>
      <div>
        <SideBar />
      </div>
      <div className={"flex-auto p-10"}>
        <Outlet />
      </div>
    </div>
  );
}
