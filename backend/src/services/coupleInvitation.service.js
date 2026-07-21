const ApiError = require('../utils/ApiError');
const {
  validateInvite,
  validateAccept,
  validateReject,
  validateCancel,
} = require('../validations/coupleInvitation.validation');
const invitationRepository = require('../repositories/coupleInvitation.repository');

const THIRTY_DAYS_IN_MS = 30 * 24 * 60 * 60 * 1000;

const validateOrThrow = (validation) => {
  if (!validation.isValid) {
    throw new ApiError(400, 'Validation failed', validation.errors);
  }
};

const ensurePendingAndActive = async (invitationId) => {
  const invitation = await invitationRepository.findById(invitationId);
  if (!invitation) throw new ApiError(404, 'Invitation not found');
  if (invitation.status !== 'pending') throw new ApiError(409, 'Invitation is no longer pending');

  if (invitation.expires_at && invitation.expires_at <= new Date()) {
    await invitationRepository.updateStatus(invitation.id, 'expired');
    throw new ApiError(410, 'Invitation has expired');
  }

  return invitation;
};

const sendInvitation = async (senderId, data) => {
  validateOrThrow(validateInvite(data));

  if (senderId === data.receiver_id) {
    throw new ApiError(400, 'You cannot invite yourself');
  }

  const [senderMembership, receiverMembership, existingInvitation] = await Promise.all([
    invitationRepository.findMembershipByUserId(senderId),
    invitationRepository.findMembershipByUserId(data.receiver_id),
    invitationRepository.findPending(senderId, data.receiver_id),
  ]);

  if (senderMembership) throw new ApiError(409, 'Sender already belongs to a couple');
  if (receiverMembership) throw new ApiError(409, 'Receiver already belongs to a couple');
  if (existingInvitation) throw new ApiError(409, 'A pending invitation already exists');

  return invitationRepository.create({
    sender_id: senderId,
    receiver_id: data.receiver_id,
    message: data.message,
    status: 'pending',
    expires_at: new Date(Date.now() + THIRTY_DAYS_IN_MS),
  });
};

const acceptInvitation = async (receiverId, data) => {
  validateOrThrow(validateAccept(data));
  const invitation = await ensurePendingAndActive(data.invitation_id);

  if (invitation.receiver_id !== receiverId) {
    throw new ApiError(403, 'Only the invitation receiver can accept it');
  }

  const [senderMembership, receiverMembership] = await Promise.all([
    invitationRepository.findMembershipByUserId(invitation.sender_id),
    invitationRepository.findMembershipByUserId(invitation.receiver_id),
  ]);
  if (senderMembership || receiverMembership) {
    throw new ApiError(409, 'One or more invitation members already belong to a couple');
  }

  return invitationRepository.createCoupleWithMembers(invitation);
};

const rejectInvitation = async (receiverId, data) => {
  validateOrThrow(validateReject(data));
  const invitation = await ensurePendingAndActive(data.invitation_id);

  if (invitation.receiver_id !== receiverId) {
    throw new ApiError(403, 'Only the invitation receiver can reject it');
  }

  await invitationRepository.updateStatus(invitation.id, 'rejected', 'rejected_at');
};

const cancelInvitation = async (senderId, data) => {
  validateOrThrow(validateCancel(data));
  const invitation = await ensurePendingAndActive(data.invitation_id);

  if (invitation.sender_id !== senderId) {
    throw new ApiError(403, 'Only the invitation sender can cancel it');
  }

  await invitationRepository.updateStatus(invitation.id, 'cancelled');
};

const expireInvitation = async (invitationId) => {
  const invitation = await invitationRepository.findById(invitationId);
  if (!invitation) throw new ApiError(404, 'Invitation not found');
  if (invitation.status !== 'pending') throw new ApiError(409, 'Invitation is no longer pending');

  await invitationRepository.updateStatus(invitation.id, 'expired');
};

module.exports = {
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation,
  expireInvitation,
};
