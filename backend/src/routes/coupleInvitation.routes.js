const { Router } = require('express');
const coupleInvitationController = require('../controllers/coupleInvitation.controller');
const authenticate = require('../middlewares/auth.middleware');

const router = Router();

router.use(authenticate);

router.post('/invite', coupleInvitationController.sendInvitation);
router.post('/accept', coupleInvitationController.acceptInvitation);
router.post('/reject', coupleInvitationController.rejectInvitation);
router.post('/cancel', coupleInvitationController.cancelInvitation);

module.exports = router;
