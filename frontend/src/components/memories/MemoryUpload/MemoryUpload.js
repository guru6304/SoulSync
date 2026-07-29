import { useRef } from "react";

import {
    UploadSimple,
    Images,
    Trash,
    WarningCircle,
} from "@phosphor-icons/react";

import { Card } from "../../common/ui";

import "./MemoryUpload.css";

const MAX_FILE_SIZE = 5 * 1024 * 1024;

const MemoryUpload = ({
    value = [],
    onChange,
}) => {

    const inputRef = useRef(null);

    const processFiles = (files) => {

        const validFiles = [];
        const previews = [];

        Array.from(files).forEach((file) => {

            if (!file.type.startsWith("image/")) {

                alert("Only image files are allowed.");

                return;

            }

            if (file.size > MAX_FILE_SIZE) {

                alert(`${file.name} exceeds 5 MB.`);

                return;

            }

            validFiles.push(file);

            previews.push({
                id: crypto.randomUUID(),
                file,
                preview: URL.createObjectURL(file),
            });

        });

        onChange([
            ...value,
            ...previews,
        ]);

    };

    const handleInput = (e) => {

        processFiles(e.target.files);

    };

    const handleDrop = (e) => {

        e.preventDefault();

        processFiles(e.dataTransfer.files);

    };

    const removeImage = (id) => {

        onChange(
            value.filter(
                (item) => item.id !== id
            )
        );

    };

    return (

        <div className="ss-memory-upload">

            <label>

                <Images
                    size={18}
                    weight="fill"
                />

                Photos

            </label>

            <Card
                className="ss-memory-upload__dropzone"
                onDragOver={(e) => e.preventDefault()}
                onDrop={handleDrop}
                onClick={() => inputRef.current.click()}
            >

                <UploadSimple
                    size={54}
                    weight="fill"
                />

                <h3>

                    Drag & Drop Images

                </h3>

                <p>

                    or click here to browse

                </p>

                <small>

                    JPG, PNG, WEBP • Max 5 MB each

                </small>

                <input
                    ref={inputRef}
                    hidden
                    multiple
                    type="file"
                    accept="image/*"
                    onChange={handleInput}
                />

            </Card>

            {

                value.length > 0 && (

                    <>

                        <div className="ss-memory-upload__count">

                            {value.length} image(s) selected

                        </div>

                        <div className="ss-memory-upload__grid">

                            {

                                value.map((image) => (

                                    <div
                                        key={image.id}
                                        className="ss-upload-image"
                                    >

                                        <img
                                            src={image.preview}
                                            alt=""
                                        />

                                        <button
                                            type="button"
                                            onClick={() =>
                                                removeImage(image.id)
                                            }
                                        >

                                            <Trash
                                                size={18}
                                                weight="fill"
                                            />

                                        </button>

                                    </div>

                                ))

                            }

                        </div>

                    </>

                )

            }

            <div className="ss-memory-upload__info">

                <WarningCircle
                    size={18}
                    weight="fill"
                />

                <span>

                    Upload high-quality images for the best experience.

                </span>

            </div>

        </div>

    );

};

export default MemoryUpload;