const express = require("express");
const validate = require("../../middlewares/validate");
const videoValidation = require("../../validations/video.validation");
const { videoController } = require("../../controllers");

const router = express.Router();

router.get("/", videoController.getVideos);
router.patch("/:videoId/votes",validate(videoValidation.updateVotes), videoController.updateVideoVotes);
router.patch("/:videoId/views",validate(videoValidation.validParams), videoController.updateVideoViews);

router.post(
  "/",
  validate(videoValidation.setVideo),
  videoController.addVideo
);
router.get("/:videoId",validate(videoValidation.validParams), videoController.getVideoById);



module.exports = router;