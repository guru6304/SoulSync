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

        return invitationRepository.create({
            sender_id: senderId,
            receiver_id: receiver.id,
            message: data.message || null,
            status: "pending",
            expires_at: new Date(
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

    if (invitation.receiver_id !== receiverId) {
        throw new ApiError(
            403,
            "Only the receiver can accept this invitation"
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
            "One or more users already belong to a couple"
        );
    }

    return invitationRepository.transaction(
        async (transaction) => {
            console.log("STEP 1");

            const couple =
                await coupleRepository.create(
                    {},
                    transaction
                );
                console.log("STEP 2", couple.id);

            await coupleRepository.addMembers(
                [
                    {
                        couple_id: couple.id,
                        user_id: invitation.sender_id,
                        role: "initiator",
                    },
                    {
                        couple_id: couple.id,
                        user_id: invitation.receiver_id,
                        role: "partner",
                    },
                ],
                transaction
            );
            console.log("STEP 3");
            await Promise.all([

                userRepository.updateActiveCouple(
                    invitation.sender_id,
                    couple.id,
                    transaction
                ),

                userRepository.updateActiveCouple(
                    invitation.receiver_id,
                    couple.id,
                    transaction
                ),

            ]);
            console.log("STEP 4");

            await invitationRepository.update(
                invitation.id,
                {
                    status: "accepted",
                    accepted_at: new Date(),
                },
                transaction
            );
            console.log("STEP 5");
            return coupleRepository.findById(
                couple.id,
                transaction
            );
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