import { useState, useEffect } from 'react';
import { useStore } from '@/frontend/store';
import { useUser } from '@/frontend/hooks/useAuth';

interface UseFetchProps<T> {
  url: string;
  method?: 'GET' | 'POST' | 'PUT' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit;
  cache?: boolean;
  cacheKey?: string;
  cacheDuration?: number;
}

export const useFetch = <T>(props: UseFetchProps<T>): {
  data: T | null;
  isLoading: boolean;
  error: string | null;
  fetchData: () => Promise<void>;
} => {
  const { user } = useUser();
  const [data, setData] = useState<T | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const { url, method = 'GET', headers = {}, body, cache = false, cacheKey, cacheDuration = 60000 } = props;

  const fetchData = async () => {
    setIsLoading(true);
    setError(null);

    try {
      const response = await fetch(url, {
        method,
        headers: {
          Authorization: `Bearer ${user?.token}`,
          ...headers,
        },
        body,
      });

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      const data = await response.json();
      setData(data);
    } catch (error) {
      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return {
    data,
    isLoading,
    error,
    fetchData,
  };
};