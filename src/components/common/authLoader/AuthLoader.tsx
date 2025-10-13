import { useEffect } from "react";
import { useAuthStore } from "../../../store/useAuthStore";
import { useMeLazyQuery } from "../../../__generated__/graphql";

export function AuthLoader() {
  const [runMe] = useMeLazyQuery({ fetchPolicy: "network-only" });
  const setUser = useAuthStore((s) => s.setUser);
  const hasSession = localStorage.getItem("priceMatchSession") === "1";

  useEffect(() => {
    if (hasSession) {
      const reLogin = async () => {
        const res = await runMe();
        if (res.error) return;
        setUser(res.data?.me ?? null);
      };
      reLogin();
    }
  }, [hasSession]);

  return null; // 只是运行副作用，不渲染内容
}
