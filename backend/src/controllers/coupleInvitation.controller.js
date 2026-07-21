const coupleInvitationService = require('../services/coupleInvitation.service');
const asyncHandler = require('../utils/asyncHandler');
const ApiResponse = require('../utils/ApiResponse');

const sendInvitation = asyncHandler(async (req, res) => {
  const invitation = await coupleInvitationService.sendInvitation(req.user.id, req.body);
  res.status(201).json(new ApiResponse(201, invitation, 'Invitation sent successfully'));
});

const acceptInvitation = asyncHandler(async (req, res) => {
  const couple = await coupleInvitationService.acceptInvitation(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, couple, 'Invitation accepted successfully'));
});

const rejectInvitation = asyncHandler(async (req, res) => {
  await coupleInvitationService.rejectInvitation(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, null, 'Invitation rejected successfully'));
});

const cancelInvitation = asyncHandler(async (req, res) => {
  await coupleInvitationService.cancelInvitation(req.user.id, req.body);
  res.status(200).json(new ApiResponse(200, null, 'Invitation cancelled successfully'));
});

module.exports = {
  sendInvitation,
  acceptInvitation,
  rejectInvitation,
  cancelInvitation,
};
