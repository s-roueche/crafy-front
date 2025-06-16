import {Button, Form, Input, Modal, ModalBody, ModalContent, ModalHeader} from "@heroui/react";
import {useTranslation} from "react-i18next";
import {createCompany} from "../queries/postQueries";


export default function CompanyForm(props: {
  isOpen: boolean,
  onOpenChange: () => void,
  onClose: () => void,
  userId: string,
}) {
  const {t} = useTranslation();
  const {onOpenChange, onClose, isOpen, userId} = props;
  
  const onSubmit = async (
      e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }
  ) => {
    onClose()
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    await createCompany(data.businessName as string, userId)
  };
  
  return (
      <>
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
