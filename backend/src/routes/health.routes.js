const { Router } = require('express');
const asyncHandler = require('../utils/asyncHandler');

const router = Router();

router.get('/', asyncHandler(async (_req, res) => {
  res.status(200).json({
    success: true,
    message: 'Soul Sync API Running',
  });
}));

module.exports = router;
