import { useCallback } from "react";
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

    const getPendingInvitations = useCallback(() => {
        dispatch(fetchPendingInvitations());
    }, [dispatch]);

    const invitePartner = useCallback(async (payload) => {
        const res = await sendInvitation(payload);
        dispatch(fetchPendingInvitations());
        return res;
    }, [dispatch]);

    const acceptInvite = useCallback(async (invitationId) => {
        const response = await acceptInvitation(invitationId);
        dispatch(fetchPendingInvitations());
        return response;
    }, [dispatch]);

    const rejectInvite = useCallback(async (invitationId) => {
        const response = await rejectInvitation(invitationId);
        dispatch(fetchPendingInvitations());
        return response;
    }, [dispatch]);

    const cancelInvite = useCallback(async (invitationId) => {
        const response = await cancelInvitation(invitationId);
        dispatch(fetchPendingInvitations());
        return response;
    }, [dispatch]);

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