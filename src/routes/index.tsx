import { createFileRoute, Navigate, Outlet } from "@tanstack/react-router";
import "../i18n.tsx";
import { useAuth } from "react-oidc-context";
import Loading from "../components/Feedback/Loading.tsx";
import ErrorMessage from "../components/Feedback/ErrorMessage.tsx";
import { Button } from "@heroui/react";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const auth = useAuth();

  console.log({ auth });
  if (auth.isLoading) {
    return <Loading />;
  }

  if (auth.error) {
    return (
      <ErrorMessage
        error={`(Authentification) ${auth.error.message}`}
      ></ErrorMessage>
    );
  }

  if (auth.isAuthenticated) {
    return (
      <>
        <Navigate to={"/welcome"} />
      </>
    );
  }

  return (
    <div>
      <Button
        onPress={() => {
          auth.signinRedirect();
        }}
      >
        Sign in
      </Button>
      <Outlet />
    </div>
  );
}
