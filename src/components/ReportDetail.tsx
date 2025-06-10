import {
  Modal,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
} from "@heroui/react";
import type {Report} from "../queries/interfaces.tsx";
import {useTranslation} from "react-i18next";

export default function ReportDetail(props : {
  isOpen: boolean,
  onOpenChange: () => void
  report?: Report
}) {
  
  const { t } = useTranslation();
  
  return (
      <Modal isOpen={props.isOpen} onOpenChange={props.onOpenChange}>
        <ModalContent>
          {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">{t('Report')}</ModalHeader>
                <ModalBody>
                  <p>
                    Description du Rapport
                  </p>
                </ModalBody>
                <ModalFooter>
                </ModalFooter>
              </>
          )}
        </ModalContent>
      </Modal>
  )
}