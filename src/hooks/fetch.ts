const useFetch = () => {
  const request = async (url: string) => {
    try {
      const responce = await fetch(url);
      if (!responce.ok) {
        throw new Error('Failed to fetch');
      }
      const data = await responce.json();
      return data;
    } catch (error) {
      throw error;
    }
  };

  return { request };
};

export default useFetch;
