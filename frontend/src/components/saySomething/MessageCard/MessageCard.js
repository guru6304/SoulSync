import { HeartStraight } from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./MessageCard.css";

const MessageCard = ({
    message,
}) => {

    return (

        <Card className="ss-message-card">

            <div className="ss-message-card__icon">

                <HeartStraight
                    size={20}
                    weight="fill"
                />

            </div>

            <div className="ss-message-card__body">

                <p>

                    {message.content}

                </p>

                <small>

                    {message.createdAt}

                </small>

            </div>

        </Card>

    );

};

export default MessageCard;