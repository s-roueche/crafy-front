import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/Layout/PageTitle.tsx";
import ReportsTable from "../components/Informations/ReportsTable.tsx";
import ButtonReportForm from "../components/Form/ButtonReportForm.tsx";

export const Route = createFileRoute("/reports/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { t } = useTranslation();

  return (
    <>
      <>
        <PageTitle title={t("Reports")} />
        <ReportsTable userId={userId} />
        <ButtonReportForm userId={userId} />
      </>
    </>
  );
}
