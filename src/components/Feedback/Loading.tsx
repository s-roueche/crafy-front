import { Spinner } from "@heroui/react";
import PageTitle from "../Layout/PageTitle.tsx";

const Loading = ({ title }: { title?: string }) => {
  return (
    <>
      <PageTitle title={title ? title : ""} />
      <div className="flex justify-center items-center">
        <Spinner />
      </div>
    </>
  );
};

export default Loading;
