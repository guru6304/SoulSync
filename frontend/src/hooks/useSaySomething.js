import { useDispatch, useSelector } from "react-redux";

import {

    fetchSaySomething,

    fetchSaySomethingTimeline,

} from "../store/slices/saySomethingSlice";

import {

    createSaySomething,

} from "../services/saySomething.service";

const useSaySomething = () => {

    const dispatch = useDispatch();

    const {

        timeline,

        selectedMessage,

        loading,

        error,

    } = useSelector(

        (state) => state.saySomething

    );

    const getTimeline = async (coupleId) => {

    if (!coupleId) return;

    dispatch(
        fetchSaySomethingTimeline(coupleId)
    );

};

    const getMessage = (saySomethingId) => {

        dispatch(

            fetchSaySomething(saySomethingId)

        );

    };

    const sendMessage = async (coupleId, payload) => {

    if (!coupleId) return;

    return await createSaySomething({
        ...payload,
        couple_id: coupleId,
    });

};

    return {

        timeline,

        selectedMessage,

        loading,

        error,

        getTimeline,

        getMessage,

        sendMessage,

    };

};

export default useSaySomething;