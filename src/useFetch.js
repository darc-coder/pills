import { useEffect, useState } from "react";

const useFetch = (url) => {
    const [isPending, setIsPending] = useState(true);
    const [data, setData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        async function fetchData() {
            try {
                let res = await fetch(url);
                let data = await res.json();
                setData(data.results);
                setIsPending(false);
            } catch (error) {
                setError(error.message || error);
                setIsPending(false);
            }
        };
        fetchData();
    }, [url]);

    return { isPending, data, error };
}

export default useFetch;