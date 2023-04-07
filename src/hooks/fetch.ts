import { useState, useCallback } from 'react';

const useFetch = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string>('');

  const request = useCallback(async (url: string) => {
    try {
      const responce = await fetch(url);
      if (!responce.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await responce.json();
      setError('');
      setIsLoading(false);
      return data;
    } catch (error) {
      setIsLoading(false);
      if (error instanceof Error) {
        setError(error.message);
      }
    }
  }, []);

  return { request, isLoading, error };
};

export default useFetch;
