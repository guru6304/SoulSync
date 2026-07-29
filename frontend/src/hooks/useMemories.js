import {

    useDispatch,

    useSelector,

} from "react-redux";

import {

    fetchMemories,

    fetchMemory,

    createMemory,

} from "../store/slices/memorySlice";

const useMemories = () => {

    const dispatch = useDispatch();

    const state = useSelector(

        (store) => store.memories

    );

    return {

        ...state,

        getMemories: (coupleId) => dispatch(fetchMemories(coupleId)),
        getMemory: (id) => dispatch(fetchMemory(id)),

        addMemory: (payload) => dispatch(createMemory(payload)),

    };

};

export default useMemories;