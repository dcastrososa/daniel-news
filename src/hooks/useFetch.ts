import { useCallback, useEffect, useState } from "react";
import axios from "axios";
import { API_KEY, API_URL } from "../config";

export interface UseFetchProps {
  params?: string;
  path: string;
}

export const useFetch = <T>({ params, path }: UseFetchProps) => {
  const [data, setData] = useState<T>();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<{ error: unknown } | null>(null);
  const [totalResults, setTotalResults] = useState(0);

  const fetchData = useCallback(
    async (newParams?: string) => {
      setLoading(true);

      try {
        const { data } = await axios.get(
          `${API_URL}/${path}?apiKey=${API_KEY}&${newParams || params}`
        );
        setData(data.articles);
        setTotalResults(data.totalResults);
      } catch (e) {
        setError({ error: e });
      } finally {
        setLoading(false);
      }
    },
    [setLoading, setError, params, path, setTotalResults]
  );

  const reFetch = useCallback(
    (newParams: string) => {
      if (!loading) {
        fetchData(newParams);
      }
    },
    [loading, fetchData]
  );

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  return { data, loading, error, reFetch, totalResults };
};
