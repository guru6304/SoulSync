import "./EmptyQuestion.css";

const EmptyQuestion = ({ onRefresh }) => {
    return (
        <div className="empty-question">

            <div className="empty-question__emoji">
                💜
            </div>

            <h2 className="empty-question__title">
                No Questions Available
            </h2>

            <p className="empty-question__description">
                Looks like there are no questions for today.
                Come back tomorrow or refresh to check again.
            </p>

            <button
                type="button"
                className="empty-question__button"
                onClick={onRefresh}
            >
                Refresh
            </button>

        </div>
    );
};

export default EmptyQuestion;