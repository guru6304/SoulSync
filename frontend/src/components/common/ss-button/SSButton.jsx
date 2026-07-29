import "./SSButton.css";

import useTheme from "../../../hooks/useTheme";

const SSButton=({

    children,

    type="button",

    onClick,

    fullWidth,

})=>{

    const {theme}=useTheme();

    return(

        <button

            type={type}

            onClick={onClick}

            className="ss-button"

            style={{

                background:theme.gradients.button,

                boxShadow:theme.shadows.button,

                width:fullWidth?"100%":"auto",

            }}

        >

            {children}

        </button>

    );

};

export default SSButton;