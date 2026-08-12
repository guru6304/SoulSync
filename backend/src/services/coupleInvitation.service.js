const ApiError = require('../utils/ApiError');

const {
    validateInvite,
    validateAccept,
    validateReject,
    validateCancel,
} = require('../validations/coupleInvitation.validation');

const validateOrThrow = require('../utils/validateOrThrow');

const invitationRepository = require('../repositories/coupleInvitation.repository');
const coupleRepository = require('../repositories/couple.repository');
const userRepository = require('../repositories/user.repository');
const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

class CoupleInvitationService {

  async sendInvitation(senderId, data) {

    console.log("Incoming Payload:", data);

    const validation = validateInvite(data);

    console.log("Validation Result:", validation);

    validateOrThrow(validation);

const receiverEmail = data.receiver_email;

const receiver =
    await userRepository.findByEmail(receiverEmail);

        if (!receiver) {
            throw new ApiError(
                404,
                "Receiver not found"
            );
        }

        if (receiver.id === senderId) {
            throw new ApiError(
                400,
                "You cannot invite yourself"
            );
        }

        const senderMembership =
            await coupleRepository.findMembershipByUserId(
                senderId
            );

        const receiverMembership =
            await coupleRepository.findMembershipByUserId(
                receiver.id
            );

        if (senderMembership || receiverMembership) {
            throw new ApiError(
                409,
                "One or more users already belong to a couple"
            );
        }

        const existingInvitation =
            await invitationRepository.findPending(
                senderId,
                receiver.id
            );

        if (existingInvitation) {
            throw new ApiError(
                409,
                "A pending invitation already exists"
            );
        }

        const { v4: uuidv4 } = require('uuid');
        return invitationRepository.create({
            id: uuidv4(),
            sender_id: senderId,
            receiver_id: receiver.id,
            message: data.message || null,
            status: "pending",
            expires_at: new Date(
                Date.now() + THIRTY_DAYS
            ),
        });
    }

    async getActiveInvitation(invitationId) {
        const invitation = await invitationRepository.findById(invitationId);
        if (!invitation) {
            throw new ApiError(404, 'Invitation not found');
        }
        if (invitation.status !== 'pending') {
            throw new ApiError(400, `Invitation is already ${invitation.status}`);
        }
        if (invitation.expires_at && new Date(invitation.expires_at) < new Date()) {
            await invitationRepository.update(invitation.id, { status: 'expired' });
            throw new ApiError(400, 'Invitation has expired');
        }
        return invitation;
    }

    async acceptInvitation(receiverId, data) {
        validateOrThrow(validateAccept(data));

        const invitation = await this.getActiveInvitation(data.invitation_id);

        if (invitation.receiver_id !== receiverId) {
            throw new ApiError(403, "Only the receiver can accept this invitation");
        }

        const [senderMembership, receiverMembership] = await Promise.all([
            coupleRepository.findMembershipByUserId(invitation.sender_id),
            coupleRepository.findMembershipByUserId(invitation.receiver_id),
        ]);

        if (senderMembership || receiverMembership) {
            throw new ApiError(409, "One or more users already belong to a couple");
        }

        const { v4: uuidv4 } = require('uuid');

        return invitationRepository.transaction(async (transaction) => {
            const couple = await coupleRepository.create({
                id: uuidv4(),
                status: "active",
            }, transaction);

            await coupleRepository.addMembers([
                {
                    id: uuidv4(),
                    couple_id: couple.id,
                    user_id: invitation.sender_id,
                    role: "initiator",
                },
                {
                    id: uuidv4(),
                    couple_id: couple.id,
                    user_id: invitation.receiver_id,
                    role: "partner",
                },
            ], transaction);

            await Promise.all([
                userRepository.updateActiveCouple(invitation.sender_id, couple.id, transaction),
                userRepository.updateActiveCouple(invitation.receiver_id, couple.id, transaction),
            ]);

            await invitationRepository.update(
                invitation.id,
                {
                    status: "accepted",
                    accepted_at: new Date(),
                },
                transaction
            );

            return coupleRepository.findById(couple.id, transaction);
        });
    }

    async rejectInvitation(receiverId, data) {
        validateOrThrow(validateReject(data));

        const invitation = await this.getActiveInvitation(data.invitation_id);

        if (invitation.receiver_id !== receiverId) {
            throw new ApiError(403, 'Only the receiver can reject this invitation');
        }

        await invitationRepository.update(invitation.id, {
            status: 'rejected',
            rejected_at: new Date(),
        });
    }

    async cancelInvitation(senderId, data) {
        validateOrThrow(validateCancel(data));

        const invitation = await this.getActiveInvitation(data.invitation_id);

        if (invitation.sender_id !== senderId) {
            throw new ApiError(403, 'Only the sender can cancel this invitation');
        }

        await invitationRepository.update(invitation.id, {
            status: 'cancelled',
            cancelled_at: new Date(),
        });
    }

    async expireInvitation(invitationId) {
        const invitation = await invitationRepository.findById(invitationId);
        if (!invitation) {
            throw new ApiError(404, 'Invitation not found');
        }

        await invitationRepository.update(invitation.id, { status: 'expired' });
    }

    async getReceivedInvitations(userId) {
        return invitationRepository.findReceived(userId);
    }

    async getSentInvitations(userId) {
        return invitationRepository.findSent(userId);
    }
}

module.exports = new CoupleInvitationService();