import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchLetters,

    fetchLetter,

    createLetter,

} from "../store/slices/letterSlice";

const useLetters = () => {

    const dispatch = useDispatch();

    const state = useSelector(

        (store) => store.letters

    );

    return {

        ...state,

        getLetters: () => dispatch(fetchLetters()),

        getLetter: (id) => dispatch(fetchLetter(id)),

        addLetter: (payload) => dispatch(createLetter(payload)),

    };

};

export default useLetters;