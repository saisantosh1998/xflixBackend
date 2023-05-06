const Joi = require("joi");
const { objectId } = require("./custom.validation");


const validParams = {
  params: Joi.object().keys({
    videoId: Joi.string()
      .custom(objectId, 'custom validation')
      .required()
  })
}


const setVideo = {
  body: Joi.object().keys({
    genre: Joi.string().valid("Education", "Sports", "Movies", "Comedy", "Lifestyle", "All").required(),
    contentRating: Joi.string().valid("Anyone", "7+", "12+", "16+", "18+", "All").required(),
    videoLink:  Joi.string().regex(/^(?:https?:\/\/)?(?:www\.)?youtube\.com\/embed\/[a-zA-Z0-9_-]+$/).required(),
    title: Joi.string().required(),
    releaseDate: Joi.string().required(),
    previewImage : Joi.string().required(),
  }).unknown(),
};
const updateVotes = {
  body: Joi.object().keys({
    vote: Joi.string().valid("upVote", "downVote").required(),
    change: Joi.string().valid("increase", "decrease").required(),
  }),
  params: Joi.object().keys({
    videoId: Joi.string()
      .custom(objectId, 'custom validation')
      .required()
  })
};


module.exports = {
  validParams,
  setVideo,
  updateVotes
};
