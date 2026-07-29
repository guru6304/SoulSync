import {
    Quotes,
    Heart,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./LoveQuote.css";

const LoveQuote = ({
    quote = "Every love story is beautiful, but ours is my favorite.",
    author = "Soul Sync",
}) => {

    return (

        <Card className="ss-love-quote">

            <div className="ss-love-quote__icon">

                <Quotes
                    size={36}
                    weight="fill"
                />

            </div>

            <blockquote>

                {quote}

            </blockquote>

            <div className="ss-love-quote__footer">

                <Heart
                    size={18}
                    weight="fill"
                />

                <span>

                    {author}

                </span>

            </div>

        </Card>

    );

};

export default LoveQuote;