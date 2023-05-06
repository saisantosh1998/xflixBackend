const mongoose = require('mongoose');
const voteSchema = new mongoose.Schema({
    upVotes: {
      type: Number,
      default: 0,
    },
    downVotes: {
      type: Number,
      default: 0,
    },
  }, { _id: false });

const videoSchema = {
    videoLink: {
        type: String,
        required: true,
    },
    title: {
        type: String,
        required: true,
    },
    genre: {
        type: String,
        required: true,
    },
    contentRating: {
        type: String,
        required: true,
    }
    ,
    releaseDate: {
        type: String,
        required: true,
    },
    previewImage: {
        type: String,
        required: true,
    },
    votes: {
        type: voteSchema,
        default: { upVotes: 0, downVotes: 0 },
      },
    viewCount: {
        type: Number,
        default: 0,
    }
}

const Video = mongoose.model('Video', videoSchema);

module.exports.Video = Video;