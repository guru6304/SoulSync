import { useEffect, useState } from "react";

const useApi = (apiFunction) => {

    const [data, setData] = useState(null);

    const [loading, setLoading] = useState(true);

    const [error, setError] = useState(null);

    const fetchData = async () => {

        try {

            setLoading(true);

            const response = await apiFunction();

            setData(response.data);

        } catch (err) {

            setError(err);

        } finally {

            setLoading(false);

        }

    };

    useEffect(() => {

        fetchData();

    }, []);

    return {

        data,

        loading,

        error,

        refresh: fetchData

    };
};

export default useApi;