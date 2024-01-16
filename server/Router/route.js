import { Router } from "express";

const router = Router();

/**Import all controllers */

import * as controller from "../controllers/appController.js";

/**POST methods */

router.route("/register").post(controller.register);
// router.route("/registerMail").post(); //To send email
router.route("/authenticate").post((req, res) => res.end()); //Authenticate user
router.route("/login").post(controller.login); //Login in app

/**GET methods */

router.route("/user/:username").get(controller.getUser); //Get user by username
router.route("/generateOTP").get(controller.generateOTP); //Generate random OTP
router.route("/verifyOTP").get(controller.verifyOTP); //Verify generated OTP
router.route("/createResetSession").get(controller.createResetSession); //Reset all the variables

/**PUT methods  */
router.route("/updateUser").put(controller.updateUser); //Used to update the user profile
router.route("/resetPassword").put(controller.resetPassword); //Used to reset password

export default router;