import {
    CalendarBlank,
    Heart,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./UpcomingEvents.css";

const UpcomingEvents = ({
    events = [],
}) => {

    return (

        <Card className="ss-upcoming-events">

            <div className="ss-upcoming-events__header">

                <h3>Upcoming Events</h3>

                <span>{events.length} Events</span>

            </div>

            {

                events.length === 0 ? (

                    <div className="ss-upcoming-events__empty">

                        <Heart
                            size={42}
                            weight="fill"
                        />

                        <p>

                            No upcoming events yet ❤️

                        </p>

                    </div>

                ) : (

                    <div className="ss-upcoming-events__list">

                        {

                            events.map((event) => (

                                <div
                                    key={event.id}
                                    className="ss-event-item"
                                >

                                    <div className="ss-event-item__icon">

                                        <CalendarBlank
                                            size={24}
                                            weight="fill"
                                        />

                                    </div>

                                    <div className="ss-event-item__content">

                                        <h4>

                                            {event.title}

                                        </h4>

                                        <p>

                                            {event.description}

                                        </p>

                                    </div>

                                    <div className="ss-event-item__date">

                                        {event.date}

                                    </div>

                                </div>

                            ))

                        }

                    </div>

                )

            }

        </Card>

    );

};

export default UpcomingEvents;