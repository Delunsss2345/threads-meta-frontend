import { useEffect } from "react";

export const useDebounceSearch = ({
  query,
  delay = 800,
}: {
  query: string | null;
  delay?: number;
}) => {
  useEffect(() => {
    const timeoutId = setTimeout(() => {
      if (query) {
        console.log(query);
      }
    }, delay);

    return () => clearTimeout(timeoutId);
  }, [query]);
};
