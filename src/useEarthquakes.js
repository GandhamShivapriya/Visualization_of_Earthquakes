import { useState, useEffect } from "react";

export function useEarthquakes(feedUrl) {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    setLoading(true);
    fetch(feedUrl)
      .then((r) => r.json())
      .then((json) => {
        setData(json.features || []);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, [feedUrl]);

  return { data, loading, error };
}
