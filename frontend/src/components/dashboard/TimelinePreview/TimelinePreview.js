import React from "react";
import PropTypes from "prop-types";
import "./TimelinePreview.css";

const TimelinePreview = ({
    timelines = [],
    onViewAll,
}) => {

    const preview = timelines.slice(0, 4);

    return (
        <div className="timeline-preview">

            <div className="timeline-preview__header">

                <div>
                    <h2>🗓 Timeline</h2>
                    <span>Your relationship journey</span>
                </div>

                <button
                    className="timeline-preview__btn"
                    onClick={onViewAll}
                >
                    View All
                </button>

            </div>

            {
                preview.length ? (

                    <div className="timeline-preview__list">

                        {
                            preview.map((item) => (

                                <div
                                    key={item.id}
                                    className="timeline-item"
                                >

                                    <div className="timeline-item__dot"></div>

                                    <div className="timeline-item__content">

                                        <h3>{item.title}</h3>

                                        <p>{item.description}</p>

                                        <span>{item.date}</span>

                                    </div>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="timeline-preview__empty">

                        <span>🩷</span>

                        <h3>No Timeline Events</h3>

                        <p>
                            Create your first relationship milestone.
                        </p>

                    </div>

                )
            }

        </div>
    );
};

TimelinePreview.propTypes = {
    timelines: PropTypes.array,
    onViewAll: PropTypes.func,
};

TimelinePreview.defaultProps = {
    timelines: [],
    onViewAll: () => {},
};

export default TimelinePreview;