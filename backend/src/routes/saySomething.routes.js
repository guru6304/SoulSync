const express = require("express");

const {

    authMiddleware: authenticate,

} = require("../middlewares/auth.middleware");

const controller =
    require("../controllers/saySomething.controller");

const router = express.Router();

router.use(authenticate);

router.post(

    "/",

    controller.createSaySomething

);

router.get(

    "/couple/:coupleId",

    controller.listSaySomethings

);

router.get(

    "/:saySomethingId",

    controller.getSaySomething

);

module.exports = router;