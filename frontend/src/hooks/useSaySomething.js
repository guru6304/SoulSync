import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchSaySomething,
  fetchSaySomethingTimeline,
} from "../store/slices/saySomethingSlice";
import { createSaySomething } from "../services/saySomething.service";

const useSaySomething = () => {
  const dispatch = useDispatch();
  const { timeline, selectedMessage, loading, error } = useSelector(
    (state) => state.saySomething
  );

  const getTimeline = useCallback(
    async (coupleId) => {
      if (!coupleId) return;
      return dispatch(fetchSaySomethingTimeline(coupleId));
    },
    [dispatch]
  );

  const getMessage = useCallback(
    (saySomethingId) => {
      return dispatch(fetchSaySomething(saySomethingId));
    },
    [dispatch]
  );

  const sendMessage = useCallback(
    async (coupleIdOrPayload, possiblePayload) => {
      let coupleId = coupleIdOrPayload;
      let payload = possiblePayload;

      // Handle single object argument e.g. { couple_id, message }
      if (typeof coupleIdOrPayload === "object" && coupleIdOrPayload !== null) {
        coupleId = coupleIdOrPayload.couple_id || coupleIdOrPayload.coupleId;
        payload = coupleIdOrPayload;
      }

      if (!coupleId) throw new Error("Couple ID is required");

      const res = await createSaySomething({
        ...payload,
        couple_id: coupleId,
      });

      return res?.data?.data || res?.data || res;
    },
    []
  );

  return {
    timeline: Array.isArray(timeline) ? timeline : [],
    selectedMessage,
    loading,
    error,
    getTimeline,
    getMessage,
    sendMessage,
  };
};

export default useSaySomething;