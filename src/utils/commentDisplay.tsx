import type {FormEvent, SetStateAction} from "react";
import {Button, Form, Input} from "@heroui/react";
import {FiCheck, FiEdit3} from "icons-react/fi";

export default function getCommentDisplay(
    isVisible: boolean,
    comment: string,
    onSubmit: (e: FormEvent<HTMLFormElement>) => void,
    isEditable: boolean,
    setIsEditable: (value: SetStateAction<boolean>) => void,
    classname?: string
) {
  if (isVisible) {
    if (!isEditable) {
      return (
          <div className={'flex space-x-14 justify-between ' + classname}>
            <div className={'self-center'}>{comment}</div>
            <Button
                onPress={() => {
                  setIsEditable(true)
                }}
                variant={'flat'}
                size={'sm'}
                isIconOnly
                endContent={<FiEdit3/>}
            ></Button>
          </div>
      )
    } else {
      return (
          <Form onSubmit={onSubmit}>
            <div className={'flex space-x-2 ' + classname}>
              <Input
                  defaultValue={comment}
                  variant={'underlined'}
                  name={'comment'}
              />
              <Button
                  type={"submit"}
                  variant={'flat'}
                  size={'sm'}
                  isIconOnly
                  endContent={<FiCheck/>}
              ></Button>
            </div>
          </Form>
      )
    }
  } else {
    return <div/>
  }
  
}