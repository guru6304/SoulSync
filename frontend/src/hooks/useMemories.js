import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchMemories,
  fetchMemory,
  createMemory,
} from "../store/slices/memorySlice";

const useMemories = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.memories);

  const getMemories = useCallback(
    (coupleId) => {
      if (!coupleId) return;
      return dispatch(fetchMemories(coupleId));
    },
    [dispatch]
  );

  const getMemory = useCallback(
    (id) => {
      return dispatch(fetchMemory(id));
    },
    [dispatch]
  );

  const addMemory = useCallback(
    (payload) => {
      return dispatch(createMemory(payload));
    },
    [dispatch]
  );

  return {
    ...state,
    memories: Array.isArray(state?.memories) ? state.memories : [],
    getMemories,
    getMemory,
    addMemory,
  };
};

export default useMemories;