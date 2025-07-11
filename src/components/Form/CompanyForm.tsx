import {
  Button,
  Form,
  Input,
  Modal,
  ModalBody,
  ModalContent,
  ModalHeader,
} from "@heroui/react";
import { useTranslation } from "react-i18next";
import { createCompany } from "../../queries/postQueries.tsx";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import Loading from "../Feedback/Loading.tsx";
import ErrorMessage from "../Feedback/ErrorMessage.tsx";

export default function CompanyForm(props: {
  isOpen: boolean;
  onOpenChange: () => void;
  onClose: () => void;
  userId: string;
}) {
  const { t } = useTranslation();
  const { onOpenChange, onClose, isOpen, userId } = props;
  const queryClient = useQueryClient();

  const companyMutation = useMutation({
    mutationFn: async (data: { businessName: string; userId: string }) => {
      await createCompany(data.businessName, data.userId);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["allCompanies", userId] });
    },
  });

  const onSubmit = async (e: {
    preventDefault: () => void;
    currentTarget: HTMLFormElement | undefined;
  }) => {
    onClose();
    e.preventDefault();
    const data = Object.fromEntries(new FormData(e.currentTarget));
    companyMutation.mutate({
      businessName: data.businessName as string,
      userId,
    });
  };

  return (
    <>
      {companyMutation.isError && (
        <ErrorMessage error={companyMutation.error.message} />
      )}

      {companyMutation.isPending && <Loading />}

      {!companyMutation.isError && (
        <Modal isOpen={isOpen} onOpenChange={onOpenChange}>
          <ModalContent>
            {() => (
              <>
                <ModalHeader className="flex flex-col gap-1">
                  {t("AddCompany")}
                </ModalHeader>
                <ModalBody>
                  <Form className="w-full max-w-xs" onSubmit={onSubmit}>
                    <Input
                      isRequired
                      label={t("Name")}
                      labelPlacement="outside"
                      name="businessName"
                      placeholder={t("EnterNameCompany")}
                    />
                    <Button type="submit" variant="bordered" className={"my-5"}>
                      Submit
                    </Button>
                  </Form>
                </ModalBody>
              </>
            )}
          </ModalContent>
        </Modal>
      )}
    </>
  );
}
