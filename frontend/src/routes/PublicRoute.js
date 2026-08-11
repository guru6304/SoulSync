import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const PublicRoute = ({ children }) => {

    const {

        isAuthenticated,

        user,

        token,

    } = useSelector(

        (state) => state.auth

    );

    if (

        isAuthenticated &&

        user &&

        token

    ) {

        return (

            <Navigate

                to="/"

                replace

            />

        );

    }

    return children;

};

export default PublicRoute;
