import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { FaPenSquare } from "icons-react/fa";
import { useTranslation } from "react-i18next";

const SideBar = () => {
  const { t } = useTranslation();

  return (
    <div className="w-64 p-4 border-r border-divider bg-teal-300 h-full flex-initial">
      <Listbox className={"text-teal-900"} disableAnimation>
        <ListboxSection showDivider>
          <ListboxItem
            startContent={<FaPenSquare />}
            key={"app_name"}
            href={"/"}
            variant={"light"}
            className={"hover:!text-teal-600 transition-colors"}
          >
            <div className="text-lg">Crafy</div>
          </ListboxItem>
        </ListboxSection>
        <ListboxSection>
          <ListboxItem
            key={"reports"}
            href={"/reports"}
            className={"hover:!bg-teal-400 transition-colors"}
          >
            <div className="text-lg">{t("Reports")}</div>
          </ListboxItem>
          <ListboxItem
            key={"companies"}
            href={"/companies"}
            className={"hover:!bg-teal-400 transition-colors"}
          >
            <div className="text-lg">{t("Companies")}</div>
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default SideBar;
