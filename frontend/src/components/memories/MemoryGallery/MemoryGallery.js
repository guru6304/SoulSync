import { useState } from "react";

import {
    CaretLeft,
    CaretRight,
    X,
    Images,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./MemoryGallery.css";

const MemoryGallery = ({
    images = [],
}) => {

    const [activeIndex, setActiveIndex] = useState(0);

    const [open, setOpen] = useState(false);

    const previousImage = () => {

        setActiveIndex((prev) =>
            prev === 0
                ? images.length - 1
                : prev - 1
        );

    };

    const nextImage = () => {

        setActiveIndex((prev) =>
            prev === images.length - 1
                ? 0
                : prev + 1
        );

    };

    return (

        <>

            <Card className="ss-memory-gallery">

                <div
                    className="ss-memory-gallery__hero"
                    onClick={() => setOpen(true)}
                >

                    <img
                        src={images[activeIndex]}
                        alt=""
                    />

                    <div className="ss-memory-gallery__counter">

                        <Images
                            size={18}
                            weight="fill"
                        />

                        {activeIndex + 1} / {images.length}

                    </div>

                </div>

                <div className="ss-memory-gallery__thumbs">

                    {

                        images.map((image, index) => (

                            <button
                                key={index}
                                type="button"
                                onClick={() =>
                                    setActiveIndex(index)
                                }
                                className={
                                    activeIndex === index
                                        ? "active"
                                        : ""
                                }
                            >

                                <img
                                    src={image}
                                    alt=""
                                />

                            </button>

                        ))

                    }

                </div>

            </Card>

            {

                open && (

                    <div className="ss-memory-lightbox">

                        <button
                            className="close"
                            onClick={() => setOpen(false)}
                        >

                            <X
                                size={28}
                                weight="bold"
                            />

                        </button>

                        <button
                            className="prev"
                            onClick={previousImage}
                        >

                            <CaretLeft
                                size={34}
                                weight="bold"
                            />

                        </button>

                        <img
                            src={images[activeIndex]}
                            alt=""
                            className="ss-memory-lightbox__image"
                        />

                        <button
                            className="next"
                            onClick={nextImage}
                        >

                            <CaretRight
                                size={34}
                                weight="bold"
                            />

                        </button>

                        <div className="ss-memory-lightbox__footer">

                            {activeIndex + 1} of {images.length}

                        </div>

                    </div>

                )

            }

        </>

    );

};

export default MemoryGallery;