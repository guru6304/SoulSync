import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ArrowLeft, PaperPlaneRight } from "@phosphor-icons/react";
import { useSelector } from "react-redux";
import { Button, Card } from "../../components/common/ui";
import MessageCard from "../../components/saySomething/MessageCard";

import useSaySomething from "../../hooks/useSaySomething";

import "./SaySomethingPage.css";

const SaySomethingPage = () => {

    const navigate = useNavigate();
    const { user } = useSelector((state) => state.auth);

const coupleId = user?.active_couple?.id || user?.active_couple || null;

    const {

        timeline,

        loading,

        error,

        getTimeline,

        sendMessage,

    } = useSaySomething();

    const [message, setMessage] = useState("");

    /*
        TODO:
        Replace this with the logged-in user's couple id.
    */


    useEffect(() => {

        if (coupleId) {

            getTimeline(coupleId);

        }

    }, [coupleId,getTimeline]);

    const handleSubmit = async (e) => {

        e.preventDefault();

        if (!message.trim()) {

            return;

        }

        try {

            await sendMessage({

                couple_id: coupleId,

                message,

            });

            setMessage("");

            getTimeline(coupleId);

        } catch (err) {

            console.error(err);

        }

    };

    if (!coupleId) {
    return (
        <div className="container py-5 text-center">

            <h3 className="mb-3">
                💌 Connect with your Partner
            </h3>

            <p className="text-muted mb-4">
                You haven't connected with your partner yet.
                Send an invitation to start sharing messages,
                memories and moments together.
            </p>

            <button
                className="btn btn-primary"
                onClick={() =>
                    navigate("/couple-invitation")
                }
            >
                Invite Partner ❤️
            </button>

        </div>
    );
}

return (

        <section className="ss-say-page">

            <Button

                variant="ghost"

                onClick={() => navigate(-1)}

            >

                <ArrowLeft size={18} />

                Back

            </Button>

            <Card>

                <h1>Say Something ❤️</h1>

                <p>

                    Send a heartfelt message to your partner.

                </p>

                <form

                    onSubmit={handleSubmit}

                    className="ss-say-form"

                >

                    <textarea

                        rows={8}

                        value={message}

                        maxLength={1000}

                        onChange={(e) =>

                            setMessage(e.target.value)

                        }

                        placeholder="Write something beautiful..."

                    />

                    <div className="ss-say-footer">

                        <span>

                            {message.length}/1000

                        </span>

                        <Button type="submit">

                            <PaperPlaneRight

                                size={18}

                                weight="fill"

                            />

                            Send

                        </Button>

                    </div>

                </form>

            </Card>

            {loading && (

                <p>Loading messages...</p>

            )}

            {error && (

                <p>{error}</p>

            )}

            {!loading &&

                timeline.map((item) => (

                    <MessageCard

                        key={item.id}

                        message={item}

                    />

                ))}

        </section>

    );

};

export default SaySomethingPage;