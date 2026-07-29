import { useDispatch, useSelector } from "react-redux";

import {
    fetchMoodHistory,
} from "../store/slices/moodSlice";


import {
    createMood,
} from "../services/mood.service";

const useMoods = () => {

    const dispatch = useDispatch();

    const {
        history,
        loading,
        error,
    } = useSelector(
        (state) => state.moods
    );

    const getMoodHistory = () => {

        dispatch(
            fetchMoodHistory()
        );

    };

    const saveMood = async (payload) => {

        return await createMood(
            payload
        );

    };

    return {

        history,

        loading,

        error,

        getMoodHistory,

        saveMood,

    };

};

export default useMoods;