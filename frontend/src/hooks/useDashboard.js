// src/hooks/useDashboard.js
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import {
    fetchDashboard,
    selectDashboard,
    selectDashboardLoading,
    selectDashboardError,
} from "../store/dashboard";

const useDashboard = () => {

    const dispatch = useDispatch();

    const dashboard = useSelector(selectDashboard);

    const loading = useSelector(selectDashboardLoading);

    const error = useSelector(selectDashboardError);

    useEffect(() => {
        // Fetch once: only when we have neither data, an in-flight
        // request, nor a previous failure. If it fails, we stop and
        // show the error — we do NOT retry automatically.
        if (!dashboard && !loading && !error) {
            dispatch(fetchDashboard());
        }
    }, [dashboard, loading, error, dispatch]);

    return {

        dashboard,

        loading,

        error,

    };

};

export default useDashboard;