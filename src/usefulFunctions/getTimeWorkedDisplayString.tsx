import type { NullabbleTimeWorked } from "../queries/interfaces.tsx";
import type { TFunction } from "i18next";

export function getTimeWorkedDisplayString(
  timeWorked: NullabbleTimeWorked,
  t: TFunction,
): string {
  switch (timeWorked) {
    case "NONE":
      return "+";
    case "HALF_DAY":
      return `1/2${t("d")}`;
    case "FULL_DAY":
      return `1${t("d")}`;
  }
}
