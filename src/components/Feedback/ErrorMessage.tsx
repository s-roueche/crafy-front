import PageTitle from "../Layout/PageTitle.tsx";

const ErrorMessage = ({ error, title }: { error: string; title?: string }) => {
  return (
    <>
      <PageTitle title={title ? title : ""} />
      <div>Error: {error}</div>
    </>
  );
};

export default ErrorMessage;
