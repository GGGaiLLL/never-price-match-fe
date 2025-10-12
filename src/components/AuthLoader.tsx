import { useEffect } from "react";
import { useAuthStore } from "../store/useAuthStore";
import { useMeQuery } from "../__generated__/graphql";

export function AuthLoader() {
  const { data } = useMeQuery({ fetchPolicy: "network-only" });
  const setUser = useAuthStore((s) => s.setUser);

  useEffect(() => {
    setUser(data?.me ?? null);
  }, [data]);

  return null; // 只是运行副作用，不渲染内容
}
