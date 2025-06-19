import { Spinner } from "@heroui/react";

const Loading = ({ title }: { title: string }) => {
  return (
    <>
      <h1 className="text-2xl font-bold justify-self-center p-10">{title}</h1>
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </>
  );
};

export default Loading;
