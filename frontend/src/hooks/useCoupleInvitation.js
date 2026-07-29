import { useDispatch, useSelector } from "react-redux";

import {
    fetchPendingInvitations,
} from "../store/slices/coupleInvitationSlice";

import {
    sendInvitation,
    acceptInvitation,
    rejectInvitation,
    cancelInvitation,
} from "../services/coupleInvitation.service";

const useCoupleInvitation = () => {

    const dispatch = useDispatch();

    const {
        pendingInvitations,
        loading,
        error,
    } = useSelector(
        (state) => state.coupleInvitation
    );

    const getPendingInvitations = () => {
        dispatch(fetchPendingInvitations());
    };

    const invitePartner = async (payload) => {
        return await sendInvitation(payload);
    };

    const acceptInvite = async (invitationId) => {
        const response =
            await acceptInvitation(invitationId);

        dispatch(fetchPendingInvitations());

        return response;
    };

    const rejectInvite = async (invitationId) => {
        const response =
            await rejectInvitation(invitationId);

        dispatch(fetchPendingInvitations());

        return response;
    };

    const cancelInvite = async (invitationId) => {
        const response =
            await cancelInvitation(invitationId);

        dispatch(fetchPendingInvitations());

        return response;
    };

    return {

        pendingInvitations,

        loading,

        error,

        getPendingInvitations,

        invitePartner,

        acceptInvite,

        rejectInvite,

        cancelInvite,

    };

};

export default useCoupleInvitation;