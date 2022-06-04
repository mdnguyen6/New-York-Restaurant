import { useState, useEffect } from "react";

const useFetch = (url) => {
  const [response, setResponse] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true);
      await fetch(url).then(res => res.json())
                      .then(res => {
                        setIsLoading(false);
                        console.log(res)
                        if (res.error) {
                          setError(res.error);
                          setResponse(null);
                        } 
                        else {
                          setResponse(res);
                          setError(null);
                        }
                      })
    };

    fetchData();
  }, [url]);

  return { response, error, isLoading };
};

export default useFetch;
