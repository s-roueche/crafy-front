import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import PageTitle from "../../components/Layout/PageTitle.tsx";
import ReportsTable from "../../components/Table/ReportsTable.tsx";
import FormButton from "../../components/Button/FormButton.tsx";
import ReportFormModal from "../../components/Form/ReportFormModal.tsx";

export const Route = createFileRoute("/_protected/reports")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t("Reports")} />
      <ReportsTable />
      <FormButton formComponent={ReportFormModal} />
    </>
  );
}
