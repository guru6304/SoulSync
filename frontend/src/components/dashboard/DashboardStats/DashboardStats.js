import {
    Heart,
    Images,
    Envelope,
    CalendarHeart,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./DashboardStats.css";

const DashboardStats = ({
    stats = {},
}) => {

    const items = [
        {
            id: 1,
            title: "Together",
            value: stats.daysTogether ?? 0,
            suffix: "Days",
            icon: CalendarHeart,
        },
        {
            id: 2,
            title: "Memories",
            value: stats.memories ?? 0,
            icon: Images,
        },
        {
            id: 3,
            title: "Letters",
            value: stats.letters ?? 0,
            icon: Envelope,
        },
        {
            id: 4,
            title: "Love Score",
            value: stats.loveScore ?? 100,
            suffix: "%",
            icon: Heart,
        },
    ];

    return (

        <section className="ss-dashboard-stats">

            {

                items.map((item) => {

                    const Icon = item.icon;

                    return (

                        <Card
                            key={item.id}
                            className="ss-dashboard-stat-card"
                        >

                            <div className="ss-dashboard-stat-card__icon">

                                <Icon
                                    size={30}
                                    weight="fill"
                                />

                            </div>

                            <div className="ss-dashboard-stat-card__content">

                                <h2>

                                    {item.value}

                                    {

                                        item.suffix && (

                                            <span>

                                                {item.suffix}

                                            </span>

                                        )

                                    }

                                </h2>

                                <p>

                                    {item.title}

                                </p>

                            </div>

                        </Card>

                    );

                })

            }

        </section>

    );

};

export default DashboardStats;