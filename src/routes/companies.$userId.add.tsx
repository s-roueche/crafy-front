import { createFileRoute } from '@tanstack/react-router'
import {Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader, useDisclosure} from "@heroui/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
// import {createCompany} from "../queries/postQueries.tsx";
import {FiPlusCircle} from "icons-react/fi";

export const Route = createFileRoute('/companies/$userId/add')({
  component: RouteComponent,
})

function RouteComponent() {
  const {isOpen, onOpen, onOpenChange, onClose} = useDisclosure();
  const {t} = useTranslation();
  const [, setSubmitted] = useState<{ [key: string]: FormDataEntryValue } | null>(null);
  
  const onSubmit = (
      e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }
  ) => {
    onClose()
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    setSubmitted(data);
    // createCompany(data.businessName, )
  };
  
  return (
      <>
        <Button onPress={onOpen} className={'p-5 mt-10'} startContent={<FiPlusCircle/>}>{t('Add')}</Button>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{t('AddCompany')}</ModalHeader>
                  <ModalBody>
                    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
                      <Input
                          isRequired
                          label={t('Name')}
                          labelPlacement="outside"
                          name="businessName"
                          placeholder={t('EnterNameCompany')}
                      />
                      <Button type="submit" variant="bordered" className={'my-5'}>
                        Submit
                      </Button>
                    </Form>
                  </ModalBody>
                </>
            )}
          </ModalContent>
        </Modal>
      </>
  )
}
