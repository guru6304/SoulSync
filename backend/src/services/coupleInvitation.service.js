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

const THIRTY_DAYS = 30 * 24 * 60 * 60 * 1000;

class CoupleInvitationService {

    async getActiveInvitation(invitationId) {

        const invitation =
            await invitationRepository.findById(invitationId);

        if (!invitation) {
            throw new ApiError(
                404,
                'Invitation not found'
            );
        }

        if (invitation.status !== 'pending') {
            throw new ApiError(
                409,
                'Invitation is no longer pending'
            );
        }

        if (
            invitation.expires_at &&
            invitation.expires_at <= new Date()
        ) {

            await invitationRepository.update(
                invitation.id,
                {
                    status: 'expired',
                }
            );

            throw new ApiError(
                410,
                'Invitation has expired'
            );
        }

        return invitation;
    }

    async sendInvitation(senderId, data) {

        validateOrThrow(
            validateInvite(data)
        );

        if (senderId === data.receiver_id) {
            throw new ApiError(
                400,
                'You cannot invite yourself'
            );
        }

        const [
            senderMembership,
            receiverMembership,
            pendingInvitation,
        ] = await Promise.all([

            coupleRepository.findMembershipByUserId(
                senderId
            ),

            coupleRepository.findMembershipByUserId(
                data.receiver_id
            ),

            invitationRepository.findPending(
                senderId,
                data.receiver_id
            ),
        ]);

        if (senderMembership) {
            throw new ApiError(
                409,
                'Sender already belongs to a couple'
            );
        }

        if (receiverMembership) {
            throw new ApiError(
                409,
                'Receiver already belongs to a couple'
            );
        }

        if (pendingInvitation) {
            throw new ApiError(
                409,
                'A pending invitation already exists'
            );
        }

        return invitationRepository.create({

            sender_id: senderId,

            receiver_id: data.receiver_id,

            message: data.message,

            status: 'pending',

            expires_at:
                new Date(
                    Date.now() + THIRTY_DAYS
                ),
        });
    }

    async acceptInvitation(receiverId, data) {

        validateOrThrow(
            validateAccept(data)
        );

        const invitation =
            await this.getActiveInvitation(
                data.invitation_id
            );

        if (
            invitation.receiver_id !== receiverId
        ) {
            throw new ApiError(
                403,
                'Only the receiver can accept this invitation'
            );
        }

        const [
            senderMembership,
            receiverMembership,
        ] = await Promise.all([

            coupleRepository.findMembershipByUserId(
                invitation.sender_id
            ),

            coupleRepository.findMembershipByUserId(
                invitation.receiver_id
            ),
        ]);

        if (
            senderMembership ||
            receiverMembership
        ) {
            throw new ApiError(
                409,
                'One or more users already belong to a couple'
            );
        }

        return invitationRepository.transaction(
            async (transaction) => {

                const couple =
                    await coupleRepository.create(
                        {},
                        transaction
                    );

                await coupleRepository.addMembers(
                    [
                        {
                            couple_id: couple.id,
                            user_id: invitation.sender_id,
                            role: 'initiator',
                        },
                        {
                            couple_id: couple.id,
                            user_id: invitation.receiver_id,
                            role: 'partner',
                        },
                    ],
                    transaction
                );

                await invitationRepository.update(
                    invitation.id,
                    {
                        status: 'accepted',
                        accepted_at: new Date(),
                    },
                    transaction
                );

                return couple;
            }
        );
    }

    async rejectInvitation(receiverId, data) {

        validateOrThrow(
            validateReject(data)
        );

        const invitation =
            await this.getActiveInvitation(
                data.invitation_id
            );

        if (
            invitation.receiver_id !== receiverId
        ) {
            throw new ApiError(
                403,
                'Only the receiver can reject this invitation'
            );
        }

        await invitationRepository.update(
            invitation.id,
            {
                status: 'rejected',
                rejected_at: new Date(),
            }
        );
    }

    async cancelInvitation(senderId, data) {

        validateOrThrow(
            validateCancel(data)
        );

        const invitation =
            await this.getActiveInvitation(
                data.invitation_id
            );

        if (
            invitation.sender_id !== senderId
        ) {
            throw new ApiError(
                403,
                'Only the sender can cancel this invitation'
            );
        }

        await invitationRepository.update(
            invitation.id,
            {
                status: 'cancelled',
                cancelled_at: new Date(),
            }
        );
    }

    async expireInvitation(invitationId) {

        const invitation =
            await invitationRepository.findById(
                invitationId
            );

        if (!invitation) {
            throw new ApiError(
                404,
                'Invitation not found'
            );
        }

        await invitationRepository.update(
            invitation.id,
            {
                status: 'expired',
            }
        );
    }
    async getReceivedInvitations(userId) {
    return invitationRepository.findReceived(userId);
}

async getSentInvitations(userId) {
    return invitationRepository.findSent(userId);
}

}

module.exports = new CoupleInvitationService();