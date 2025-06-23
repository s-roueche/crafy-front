import { Button, useDisclosure } from "@heroui/react";
import { FiPlusCircle } from "icons-react/fi";
import ReportForm from "./ReportForm.tsx";
import { useTranslation } from "react-i18next";

type ButtonReportFormProps = {
  userId: string;
};

const ButtonReportForm = ({ userId }: ButtonReportFormProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();

  return (
    <>
      <Button
        onPress={() => onOpen()}
        className={"p-5 mt-10"}
        startContent={<FiPlusCircle />}
      >
        {t("Add")}
      </Button>
      <ReportForm
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        userId={userId}
      />
    </>
  );
};

export default ButtonReportForm;
