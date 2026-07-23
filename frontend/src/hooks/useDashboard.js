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

        if (!dashboard) {

            dispatch(fetchDashboard());

        }

    }, [dispatch, dashboard]);

    return {

        dashboard,
        loading,
        error,

    };

};

export default useDashboard;