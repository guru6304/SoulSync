import "./SSCard.css";

import useTheme from "../../../hooks/useTheme";

const SSCard = ({

    children,

    className="",

    onClick,

})=>{

    const {theme}=useTheme();

    return(

        <div

            onClick={onClick}

            className={`ss-card ${className}`}

            style={{

                background:theme.gradients.card,

                border:`1px solid ${theme.colors.border}`,

                boxShadow:theme.shadows.card,

                borderRadius:theme.radius.lg,

            }}

        >

            {children}

        </div>

    );

};

export default SSCard;