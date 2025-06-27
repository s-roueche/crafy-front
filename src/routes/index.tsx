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

  if (auth.isAuthenticated) {
    return (
      <>
        <Navigate to={"/welcome"} />
      </>
    );
  }

  return (
    <>
      {auth.isLoading && <Loading />}
      {auth.error && (
        <ErrorMessage
          error={`(Authentification) ${auth.error.message}`}
        ></ErrorMessage>
      )}
      <>
        <Button
          onPress={() => {
            auth.signinRedirect();
          }}
        >
          Sign in
        </Button>
        <Outlet />
      </>
    </>
  );
}
