import { useAuth } from "react-oidc-context";
import { setToken } from "../tokenService.ts";
import { useEffect } from "react";

const AuthSync = () => {
  const auth = useAuth();

  useEffect(() => {
    if (auth.user?.access_token) {
      setToken(auth.user.access_token);
    } else {
      setToken(null);
    }
  }, [auth.user]);

  return null; // This component only syncs token
};

export default AuthSync;
