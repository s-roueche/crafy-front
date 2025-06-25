type PageTitleProps = {
  title: string;
};

const PageTitle = ({ title }: PageTitleProps) => {
  return (
    <h1 className="text-2xl font-bold justify-self-center p-10 text-teal-900">
      {title}
    </h1>
  );
};

export default PageTitle;
