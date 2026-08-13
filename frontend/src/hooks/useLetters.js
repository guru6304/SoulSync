import { useCallback } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  fetchLetters,
  fetchLetter,
  createLetter,
} from "../store/slices/letterSlice";

const useLetters = () => {
  const dispatch = useDispatch();
  const state = useSelector((store) => store.letters);

  const getLetters = useCallback(() => {
    return dispatch(fetchLetters());
  }, [dispatch]);

  const getLetter = useCallback(
    (id) => {
      return dispatch(fetchLetter(id));
    },
    [dispatch]
  );

  const addLetter = useCallback(
    (payload) => {
      return dispatch(createLetter(payload));
    },
    [dispatch]
  );

  return {
    ...state,
    letters: Array.isArray(state?.letters) ? state.letters : [],
    getLetters,
    getLetter,
    addLetter,
  };
};

export default useLetters;