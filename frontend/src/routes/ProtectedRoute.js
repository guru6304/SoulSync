import { Navigate, Outlet } from "react-router-dom";
import { useSelector } from "react-redux";

const ProtectedRoute = () => {

    const {

        isAuthenticated,

        user,

        token,

    } = useSelector((state) => state.auth);

    if (

        !isAuthenticated ||

        !user ||

        !token

    ) {

        return (

            <Navigate
                to="/login"
                replace
            />

        );

    }

    return <Outlet />;

};

export default ProtectedRoute;