import {
    Heart,
    Images,
    Envelope,
    Smiley,
    ChatCircle,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./RecentActivity.css";

const iconMap = {
    memory: Images,
    letter: Envelope,
    mood: Smiley,
    question: ChatCircle,
    love: Heart,
};

const RecentActivity = ({ activities = [] }) => {

    return (

        <Card className="ss-recent-activity">

            <div className="ss-recent-activity__header">

                <h3>Recent Activity</h3>

                <span>{activities.length} Activities</span>

            </div>

            {

                activities.length === 0 ? (

                    <div className="ss-recent-activity__empty">

                        <Heart
                            size={40}
                            weight="fill"
                        />

                        <p>

                            Your beautiful journey starts here ❤️

                        </p>

                    </div>

                ) : (

                    <div className="ss-recent-activity__list">

                        {

                            activities.map((activity) => {

                                const Icon =
                                    iconMap[activity.type] || Heart;

                                return (

                                    <div
                                        key={activity.id}
                                        className="ss-activity-item"
                                    >

                                        <div className="ss-activity-item__icon">

                                            <Icon
                                                size={22}
                                                weight="fill"
                                            />

                                        </div>

                                        <div className="ss-activity-item__content">

                                            <h4>

                                                {activity.title}

                                            </h4>

                                            <p>

                                                {activity.description}

                                            </p>

                                        </div>

                                        <span>

                                            {activity.time}

                                        </span>

                                    </div>

                                );

                            })

                        }

                    </div>

                )

            }

        </Card>

    );

};

export default RecentActivity;