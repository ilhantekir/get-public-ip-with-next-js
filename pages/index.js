import useSWR from 'swr';
import Person from '../components/Person';
import { useEffect } from 'react';
const fetcher = (url) => fetch(url).then((res) => res.json());

export default function Index() {
  useEffect(() => {
    const { referrer } = document;

    console.log(`Referer: ${referrer}`);
  }, []);

  const { data, error } = useSWR('/api/getIp', fetcher);

  if (error) return <div>Failed to load</div>;
  if (!data) return <div>Loading...</div>;

  return <h2>{data.ip}</h2>;
}
