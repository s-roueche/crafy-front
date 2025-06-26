import { Button } from "@heroui/react";
import { useAuth } from "react-oidc-context";

const LogoutButton = () => {
  const auth = useAuth();

  return (
    <Button className={"bg-teal-500"} onPress={() => auth.signoutRedirect()}>
      Sign out
    </Button>
  );
};

export default LogoutButton;
