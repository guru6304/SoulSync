import React from "react";
import PropTypes from "prop-types";
import "./MusicPreview.css";

const MusicPreview = ({
    songs = [],
    onViewAll,
    onPlay,
}) => {

    const playlist = songs.slice(0, 4);

    return (
        <div className="music-preview">

            <div className="music-preview__header">

                <div>
                    <h2>🎵 Our Playlist</h2>
                    <span>Music that keeps us together</span>
                </div>

                <button
    className="music-preview__btn"
    onClick={onViewAll}
>
    Explore
</button>

            </div>

            {
                playlist.length ? (

                    <div className="music-preview__list">

                        {
                            playlist.map((song) => (

                                <div
                                    key={song.id}
                                    className="music-card"
                                >

                                    <div className="music-card__cover">

                                        {
                                            song.cover ? (
                                                <img
                                                    src={song.cover}
                                                    alt={song.title}
                                                />
                                            ) : (
                                                <span>🎵</span>
                                            )
                                        }

                                    </div>

                                    <div className="music-card__content">

                                        <h3>{song.title}</h3>

                                        <p>{song.artist}</p>

                                    </div>

                                    <button
                                        className="music-play-btn"
                                        onClick={() => onPlay(song)}
                                    >
                                        ▶
                                    </button>

                                </div>

                            ))
                        }

                    </div>

                ) : (

                    <div className="music-preview__empty">

                        <span>🎧</span>

                        <h3>No Songs Added</h3>

                        <p>
                            Build your beautiful love playlist.
                        </p>

                    </div>

                )
            }

        </div>
    );
};

MusicPreview.propTypes = {
    songs: PropTypes.array,
    onViewAll: PropTypes.func,
    onPlay: PropTypes.func,
};

MusicPreview.defaultProps = {
    songs: [],
    onViewAll: () => {},
    onPlay: () => {},
};

export default MusicPreview;