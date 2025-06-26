import { createFileRoute } from "@tanstack/react-router";
import { useTranslation } from "react-i18next";
import CompanyForm from "../../components/Form/CompanyForm.tsx";
import PageTitle from "../../components/Layout/PageTitle.tsx";
import CompaniesTable from "../../components/Table/CompaniesTable.tsx";
import FormButton from "../../components/Button/FormButton.tsx";

export const Route = createFileRoute("/_protected/companies")({
  component: RouteComponent,
});

function RouteComponent() {
  const { t } = useTranslation();

  return (
    <>
      <PageTitle title={t("Companies")} />
      <CompaniesTable />
      <FormButton formComponent={CompanyForm} />
    </>
  );
}
