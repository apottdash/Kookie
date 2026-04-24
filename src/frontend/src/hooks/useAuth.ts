import { useInternetIdentity } from "@caffeineai/core-infrastructure";
import type { Principal } from "@icp-sdk/core/principal";

export interface UseAuthReturn {
  isLoggedIn: boolean;
  principal: Principal | undefined;
  login: () => void;
  logout: () => void;
  loginStatus: string;
  principalText: string | null;
}

export function useAuth(): UseAuthReturn {
  const { identity, login, clear, loginStatus } = useInternetIdentity();

  const principal = identity?.getPrincipal();
  const isLoggedIn = !!identity && !principal?.isAnonymous();
  const principalText =
    principal && !principal.isAnonymous() ? principal.toText() : null;

  return {
    isLoggedIn,
    principal,
    login,
    logout: clear,
    loginStatus,
    principalText,
  };
}
