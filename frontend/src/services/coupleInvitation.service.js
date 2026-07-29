import apiClient from "./apiClient";

export const sendInvitation = async (payload) => {
    const response = await apiClient.post(
        "/couple-invitations/invite",
        payload
    );

    return response.data.data;
};

export const getReceivedInvitations = async () => {
    const response = await apiClient.get(
        "/couple-invitations/received"
    );

    return response.data.data;
};

export const getSentInvitations = async () => {
    const response = await apiClient.get(
        "/couple-invitations/sent"
    );

    return response.data.data;
};

export const acceptInvitation = async (invitationId) => {
    const response = await apiClient.post(
        "/couple-invitations/accept",
        {
            invitation_id: invitationId,
        }
    );

    return response.data.data;
};

export const rejectInvitation = async (invitationId) => {
    const response = await apiClient.post(
        "/couple-invitations/reject",
        {
            invitation_id: invitationId,
        }
    );

    return response.data.data;
};

export const cancelInvitation = async (invitationId) => {
    const response = await apiClient.post(
        "/couple-invitations/cancel",
        {
            invitation_id: invitationId,
        }
    );

    return response.data.data;
};