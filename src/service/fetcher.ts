export const fetcher = async <T>(url: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json'
    }
  });
  if (!res.ok) {
    throw new Error('Failed to fetch data');
  }

  const result = await res.json();
  return result as Promise<T>;
};
