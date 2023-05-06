const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");
const catchAsync = require("../utils/catchAsync");
const { videoService } = require("../services");


const getVideos = catchAsync(async (req, res) => {
  const videos = await videoService.getVideos(req.query);
  res.status(httpStatus.OK).json({videos});
});

const getVideoById = catchAsync(async (req, res) => {
  const video = await videoService.getVideoById(req.params.videoId);
  res.status(httpStatus.OK).json(video);
});

const addVideo = catchAsync(async (req, res) => {
  const video = await videoService.createVideo(req.body);
  res.status(httpStatus.CREATED).json(video);
});

const updateVideoVotes = catchAsync(async (req, res) => {
  await videoService.updateVideoVotes(req.body,req.params);
  res.status(httpStatus.NO_CONTENT).send();
});
const updateVideoViews = catchAsync(async (req, res) => {
  await videoService.updateVideoViews(req.params.videoId);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  getVideos,
  addVideo,
  getVideoById,
  updateVideoVotes,
  updateVideoViews,
};
