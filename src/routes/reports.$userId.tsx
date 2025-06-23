import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import PageTitle from "../components/Layout/PageTitle.tsx";
import ReportsTable from "../components/Table/ReportsTable.tsx";
import FormButton from "../components/Button/FormButton.tsx";
import ReportForm from "../components/Form/ReportForm.tsx";

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
        <FormButton userId={userId} formComponent={ReportForm} />
      </>
    </>
  );
}
