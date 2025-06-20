import { createFileRoute } from "@tanstack/react-router";
import "../i18n.tsx";
import { useTranslation } from "react-i18next";

export const Route = createFileRoute("/")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <h1 className="text-4xl font-bold justify-self-center">
      {t("WelcomeToCrafy")}
    </h1>
  );
}
