const {
  sequelize,
  CoupleInvitation,
  Couple,
  CoupleMember,
} = require('../models');
const { Op } = require('sequelize');

const findById = (id) => CoupleInvitation.findByPk(id);

const findPending = (senderId, receiverId) =>
  CoupleInvitation.findOne({
    where: {
      status: 'pending',
      [Op.or]: [
        {
          sender_id: senderId,
          receiver_id: receiverId,
        },
        {
          sender_id: receiverId,
          receiver_id: senderId,
        },
      ],
    },
  });

const create = (data) => CoupleInvitation.create(data);

const updateStatus = (id, status, timestampField) => {
  const updates = { status };
  if (timestampField) updates[timestampField] = new Date();

  return CoupleInvitation.update(updates, { where: { id } });
};

const deleteInvitation = (id) => CoupleInvitation.destroy({ where: { id } });

const findMembershipByUserId = (userId) => CoupleMember.findOne({ where: { user_id: userId } });

const createCoupleWithMembers = async (invitation) => sequelize.transaction(async (transaction) => {
  const couple = await Couple.create(
    { created_by: invitation.sender_id },
    { transaction },
  );

  await CoupleMember.bulkCreate([
    { couple_id: couple.id, user_id: invitation.sender_id, role: 'initiator' },
    { couple_id: couple.id, user_id: invitation.receiver_id, role: 'partner' },
  ], { transaction });

  await CoupleInvitation.update(
    { status: 'accepted', accepted_at: new Date() },
    { where: { id: invitation.id }, transaction },
  );

  return couple;
});

module.exports = {
  findById,
  findPending,
  create,
  updateStatus,
  delete: deleteInvitation,
  findMembershipByUserId,
  createCoupleWithMembers,
};
