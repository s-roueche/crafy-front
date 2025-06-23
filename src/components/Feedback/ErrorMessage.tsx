const ErrorMessage = ({ error, title }: { error: string; title?: string }) => {
  return (
    <>
      <h1 className="text-2xl font-bold justify-self-center p-10">
        {title ? title : ""}
      </h1>
      <div>Error: {error}</div>
    </>
  );
};

export default ErrorMessage;
