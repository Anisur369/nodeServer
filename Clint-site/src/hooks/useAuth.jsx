import { use } from "react";
import { AuthContext } from "../context/AuthContext";

export function useAuth() {
  const authInfo = use(AuthContext);
  return authInfo;
}
