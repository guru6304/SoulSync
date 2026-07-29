import "./SSHeader.css";

const SSHeader=({

    title,

    subtitle,

})=>{

    return(

        <div className="ss-header">

            <h1>{title}</h1>

            <p>{subtitle}</p>

        </div>

    );

};

export default SSHeader;