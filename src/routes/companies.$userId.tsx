import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import CompanyForm from "../components/Form/CompanyForm.tsx";
import PageTitle from "../components/Layout/PageTitle.tsx";
import CompaniesTable from "../components/Table/CompaniesTable.tsx";
import FormButton from "../components/Button/FormButton.tsx";
export const Route = createFileRoute("/companies/$userId")({
  component: RouteComponent,
});

function RouteComponent() {
  const { userId } = Route.useParams();
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t("Companies")} />
      <CompaniesTable userId={userId} />
      <FormButton userId={userId} formComponent={CompanyForm} />
    </>
  );
}
