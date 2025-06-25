import { Button, Form, Input } from "@heroui/react";
import { FiCheck, FiEdit3 } from "icons-react/fi";
import type { FormEvent, SetStateAction } from "react";

type TimeWorkedEditableProps = {
  isVisible: boolean;
  comment: string;
  onSubmit: (e: FormEvent<HTMLFormElement>) => void;
  isEditable: boolean;
  setIsEditable: (value: SetStateAction<boolean>) => void;
  classname?: string;
  size?: "sm" | "md" | "lg";
};

const EditableComment = ({
  isVisible,
  comment,
  onSubmit,
  isEditable,
  setIsEditable,
  classname,
  size,
}: TimeWorkedEditableProps) => {
  return (
    <>
      {isVisible && !isEditable && (
        <div className={"flex space-x-14 justify-between " + classname}>
          <div className={"self-center"}>{comment}</div>
          <Button
            onPress={() => {
              setIsEditable(true);
            }}
            variant={"flat"}
            size={"sm"}
            isIconOnly
            endContent={<FiEdit3 />}
            className={"bg-teal-300"}
          ></Button>
        </div>
      )}

      {isVisible && isEditable && (
        <Form onSubmit={onSubmit}>
          <div className={"flex space-x-2 " + classname}>
            <Input
              defaultValue={comment}
              variant={"underlined"}
              name={"comment"}
              size={size ? size : "md"}
            />
            <Button
              type={"submit"}
              variant={"flat"}
              size={"sm"}
              isIconOnly
              endContent={<FiCheck />}
              className={"bg-teal-300"}
            ></Button>
          </div>
        </Form>
      )}

      {!isVisible && <div />}
    </>
  );
};

export default EditableComment;
