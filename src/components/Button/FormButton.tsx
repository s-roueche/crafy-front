import { Button, useDisclosure } from "@heroui/react";
import { FiPlusCircle } from "icons-react/fi";
import { useTranslation } from "react-i18next";
import type { ComponentType } from "react";

type FormButtonProps = {
  userId: string;
  formComponent: ComponentType<{
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    userId: string;
  }>;
};

const FormButton = ({ userId, formComponent }: FormButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const FormComponent = formComponent;

  return (
    <>
      <Button
        onPress={() => onOpen()}
        className={"p-5 mt-10 bg-teal-300"}
        startContent={<FiPlusCircle />}
      >
        {t("Add")}
      </Button>
      <FormComponent
        isOpen={isOpen}
        onClose={onClose}
        onOpenChange={onOpenChange}
        userId={userId}
      />
    </>
  );
};

export default FormButton;
