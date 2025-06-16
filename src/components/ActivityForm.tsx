import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
  Select,
  SelectItem,
} from "@heroui/react";
import {useTranslation} from "react-i18next";
import {useState} from "react";
import {createActivity} from "../queries/postQueries";
import type {TimeWorked} from "../queries/interfaces.tsx";


export default function ReportForm(props: {
  isOpen: boolean,
  onOpenChange: () => void,
  onClose: () => void,
  reportId: string
}) {
  const {t} = useTranslation();
  const {onOpenChange, onClose, isOpen, reportId} = props;
  const [timeWorked, setTimeWorked] = useState<string>();
  
  const onSubmit = async (
      e: { preventDefault: () => void; currentTarget: HTMLFormElement | undefined; }
  ) => {
    onClose()
    e.preventDefault();
    
    const data = Object.fromEntries(new FormData(e.currentTarget));
    
    await createActivity(new Date(data.date as string), reportId, timeWorked as TimeWorked, data.comment as string)
    
    console.log(data)
  };
  
  return (
      <>
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
                <>
                  <ModalHeader className="flex flex-col gap-1">{t('AddActivity')}</ModalHeader>
                  <ModalBody>
                    <Form className="w-full max-w-xs" onSubmit={onSubmit}>
                      <Input
                          type={'date'}
                          isRequired
                          label={t('Date')}
                          labelPlacement="outside"
                          name="date"
                      />
                      <Select
                          isRequired
                          onSelectionChange={(key) => setTimeWorked(key.currentKey)}
                          items={[
                            {key: 'FULL_DAY', label: t('FullDay')},
                            {key: 'HALF_DAY', label: t('HalfDay')},
                          ]}
                          label={t('TimeWorked')}
                          labelPlacement="outside"
                          placeholder={t('SelectTimeWorked')}
                      >
                        {(item) => <SelectItem>{item.label}</SelectItem>}
                      </Select>
                      <Input
                          label={t('Comment')}
                          labelPlacement="outside"
                          name="comment"
                          placeholder={t('EnterComment')}
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
