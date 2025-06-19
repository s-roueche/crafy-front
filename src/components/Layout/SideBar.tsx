import { Listbox, ListboxItem, ListboxSection } from "@heroui/react";
import { FaPenSquare } from "icons-react/fa";
import { useTranslation } from "react-i18next";
import { useRouter } from "@tanstack/react-router";

const SideBar = () => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <div className="w-64 p-4 border-r border-divider">
      <Listbox>
        <ListboxSection showDivider>
          <ListboxItem
            startContent={<FaPenSquare />}
            key={"app_name"}
            href={
              router.buildLocation({
                to: "/$userId",
                params: { userId: "b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5" },
              }).href
            }
            variant={"light"}
          >
            <div className="text-lg">Crafy</div>
          </ListboxItem>
        </ListboxSection>
        <ListboxSection>
          <ListboxItem
            key={"reports"}
            href={
              router.buildLocation({
                to: "/reports/$userId",
                params: { userId: "b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5" },
              }).href
            }
          >
            <div className="text-lg">{t("Reports")}</div>
          </ListboxItem>
          <ListboxItem
            key={"companies"}
            href={
              router.buildLocation({
                to: "/companies/$userId",
                params: { userId: "b5baa5fc-4211-11f0-a9d1-aa8a5f2ad6c5" },
              }).href
            }
          >
            <div className="text-lg">{t("Companies")}</div>
          </ListboxItem>
        </ListboxSection>
      </Listbox>
    </div>
  );
};

export default SideBar;
