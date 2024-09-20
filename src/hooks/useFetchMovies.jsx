import { useEffect, useMemo, useState } from "react";

const useFetchMovies = (url) => {

    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const options = useMemo(() => ({
        method: 'GET',

        headers: {

            accept: 'application/json',

            Authorization: `Bearer ${import.meta.env.VITE_API_KEY}`

        },
    }), []);

    useEffect(() => {

        async function fetchData() {

            try {

                setLoading(true);

                const response = await fetch(url, options);

                const result = await response.json();

                setData(result);

            } catch (error) {

                setError("Failed to fetch data");

            } finally {

                setLoading(false);

            }

        }

        fetchData();

    }, [url, options])


    return { data, error, loading };
}

export default useFetchMovies
