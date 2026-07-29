import "./SSPage.css";

import useTheme from "../../../hooks/useTheme";

const SSPage = ({ children }) => {

    const { theme } = useTheme();

    return (

        <div

            className="ss-page"

            style={{

                background: theme.gradients.page,

                color: theme.colors.textPrimary,

            }}

        >

            {children}

        </div>

    );

};

export default SSPage;