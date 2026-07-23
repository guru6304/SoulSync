import "./StatCard.css";

import Card from "../../common/ui/Card";

const StatCard = ({
    title,
    value,
}) => {

    return (

        <Card className="ss-stat-card">

            <h3>{value ?? 0}</h3>

            <p>{title}</p>

        </Card>

    );

};

export default StatCard;