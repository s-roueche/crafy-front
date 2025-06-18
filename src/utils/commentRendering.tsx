import type {NullabbleTimeWorked} from "../queries/interfaces.tsx";
import {Button} from "@heroui/react";
import { FiEdit3 } from "icons-react/fi";

export default function commentRendering(timeWorked: NullabbleTimeWorked, comment: string) {
  switch (timeWorked) {
    case `NONE`:
      return <div/>
    case 'FULL_DAY':
    case "HALF_DAY":
      return (
          <>
            <span className={'pr-3'}>{comment}</span>
            <Button variant={'flat'} size={'sm'} isIconOnly endContent={<FiEdit3/>}></Button>
          </>
      )
  }
}