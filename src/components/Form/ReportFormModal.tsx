import { Modal, ModalBody, ModalContent, ModalHeader } from "@heroui/react";
import { useTranslation } from "react-i18next";
import ReportForm from "./ReportForm.tsx";

type ReportFormModalProps = {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: string;
};

const ReportFormModal = ({
  isOpen,
  onOpenChange,
  onClose,
  userId,
}: ReportFormModalProps) => {
  const { t } = useTranslation();

  return (
    <>
      <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
        <ModalContent>
          {() => (
            <>
              <ModalHeader className="flex flex-col gap-1">
                {t("AddReport")}
              </ModalHeader>
              <ModalBody>
                <ReportForm onClose={onClose} userId={userId} />
              </ModalBody>
            </>
          )}
        </ModalContent>
      </Modal>
    </>
  );
};

export default ReportFormModal;
