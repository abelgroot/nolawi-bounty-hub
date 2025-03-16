import { useEffect, useState } from "react";

export const useLocalStorage = (key: string) => {
  const [token, setToken] = useState<string | null>(null);
  const [isTokenLoaded, setIsTokenLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const token = localStorage.getItem(key);
      if (token) {
        setToken(token);
      }
      setIsTokenLoaded(true);
    }
  }, [key]);

  return { token, isTokenLoaded };
};
