const isPresent = (value) => typeof value === 'string' && value.trim().length > 0;

const inviteSchema = {
    receiver_email: {
        required: true,
    },
    message: {
        required: false,
        maxLength: 500,
    },
};

const invitationActionSchema = {
  invitation_id: { required: true },
};

const validateInvite = (data = {}) => {
  const errors = [];

if (!isPresent(data.receiver_email)) {
    errors.push({
        field: "receiver_email",
        message: "Receiver email is required."
    });
}
  if (data.message !== undefined && data.message !== null &&
      (typeof data.message !== 'string' || data.message.length > 500)) {
    errors.push({ field: 'message', message: 'Message must not exceed 500 characters.' });
  }

  return { isValid: errors.length === 0, errors };
};

const validateInvitationAction = (data = {}) => {
  const errors = isPresent(data.invitation_id)
    ? []
    : [{ field: 'invitation_id', message: 'Invitation ID is required.' }];

  return { isValid: errors.length === 0, errors };
};

const validateAccept = validateInvitationAction;
const validateReject = validateInvitationAction;
const validateCancel = validateInvitationAction;

module.exports = {
  inviteSchema,
  invitationActionSchema,
  validateInvite,
  validateAccept,
  validateReject,
  validateCancel,
};
