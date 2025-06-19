const ErrorMessage = ({ error, title }: { error: string; title: string }) => {
  return (
    <>
      <h1 className="text-2xl font-bold justify-self-center p-10">{title}</h1>
      <span>Error: {error}</span>
    </>
  );
};

export default ErrorMessage;
