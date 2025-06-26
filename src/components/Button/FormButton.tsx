import { Button, useDisclosure } from "@heroui/react";
import { FiPlusCircle } from "icons-react/fi";
import { useTranslation } from "react-i18next";
import type { ComponentType } from "react";
import { useAuth } from "react-oidc-context";

type FormButtonProps = {
  formComponent: ComponentType<{
    isOpen: boolean;
    onOpenChange: () => void;
    onClose: () => void;
    userId: string;
  }>;
};

const FormButton = ({ formComponent }: FormButtonProps) => {
  const { t } = useTranslation();
  const { isOpen, onOpen, onOpenChange, onClose } = useDisclosure();
  const auth = useAuth();
  const userId = auth.user ? auth.user.profile.sub : "";
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
