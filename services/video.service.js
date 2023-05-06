const { Video } = require("../models");
const httpStatus = require("http-status");
const ApiError = require("../utils/ApiError");


// const getVideos = async (queryParams) => {
//     const { sortBy, genres, title, contentRating } = queryParams;
//     if (sortBy) {
//         if (sortBy === 'viewCount') {
//             const result = await Video.aggregate([
//                 {
//                     $addFields: {
//                         myNumberViewCount: { $toInt: "$viewCount" }
//                     }
//                 },
//                 {
//                     $sort: { myNumberViewCount: -1 }
//                 },
//                 {
//                     $project: {
//                         myNumberViewCount: 0
//                     }
//                 }
//             ]);
//             return result;
//         } else if (sortBy === 'releaseDate') {
//             const result = await Video.aggregate([
//                 {
//                     $addFields: {
//                         convertedReleaseDate: { $toDate: "$releaseDate" }
//                     }
//                 },
//                 {
//                     $sort: { convertedReleaseDate: -1 }
//                 },
//                 {
//                     $project: {
//                         convertedReleaseDate: 0
//                     }
//                 }
//             ]);
//             return result;
//         } else {
//             throw new ApiError(httpStatus.BAD_REQUEST, "\"sortBy\" must be one of [viewCount, releaseDate]")
//         }

//     } else {
//         let searchCondition = { $and: [] }, result;
//         if (genres) {
//             let genresArr = genres.split(',');
//             for (let i = 0; i < genresArr.length; i++) {
//                 if (!["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"].includes(genresArr[i])) {
//                     throw new ApiError(httpStatus.BAD_REQUEST, `\"genres[${i}]\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`)
//                 }
//             }
//             if (!genresArr.includes("All")) {
//                 searchCondition.$and.push({
//                     genre: {
//                         $in: genresArr
//                     }
//                 })
//             }
//         }
//         if (title) {
//             searchCondition.$and.push({
//                 title: { $regex: title, $options: "i"  }
//             })
//         }
//         if (contentRating && !["Anyone", "7+", "12+", "16+", "18+", "All"].includes(contentRating)) {
//             throw new ApiError(httpStatus.BAD_REQUEST, "\"contentRating\" must be one of [Anyone, 7+, 12+, 16+, 18+, All]")
//         }
//         if (searchCondition.$and.length > 0) {
//             if (contentRating && !["Anyone", "All"].includes(contentRating)) {
//                 result = await Video.aggregate([
//                     {
//                         $match: searchCondition
//                     },
//                     {
//                         $addFields: {
//                             contentRatingNumber: {
//                                 $cond: {
//                                     if: { $in: ["$contentRating", ["Anyone", "All"]] },
//                                     then: 0,
//                                     else: {
//                                         $toInt: {
//                                             $replaceAll: {
//                                                 input: "$contentRating",
//                                                 find: "+",
//                                                 replacement: "",
//                                             },
//                                         },
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     {
//                         $match: { contentRatingNumber:  parseInt(contentRating.slice(0, -1)) }
//                     },
//                     {
//                         $project: {
//                             contentRatingNumber: 0
//                         }
//                     }
//                 ]);;
//             } else {
//                 result = await Video.find(searchCondition);
//             }
//         } else {
//             if (contentRating && !["Anyone", "All"].includes(contentRating)) {
//                 result = await Video.aggregate([
//                     {
//                         $addFields: {
//                             contentRatingNumber: {
//                                 $cond: {
//                                     if: { $in: ["$contentRating", ["Anyone", "All"]] },
//                                     then: 0,
//                                     else: {
//                                         $toInt: {
//                                             $replaceAll: {
//                                                 input: "$contentRating",
//                                                 find: "+",
//                                                 replacement: "",
//                                             },
//                                         },
//                                     },
//                                 },
//                             },
//                         },
//                     },
//                     {
//                         $match: { contentRatingNumber:  parseInt(contentRating.slice(0, -1)) }
//                     },
//                     {
//                         $project: {
//                             contentRatingNumber: 0
//                         }
//                     }
//                 ]);
//             } else {
//                 result = await Video.find({});
//             }
//         }
//         return result;
//     }
// };

const getVideos = async (queryParams) => {
    const { sortBy, genres, title, contentRating } = queryParams;
    let allVideos = await Video.find({});
    if (sortBy) {
        if (sortBy === 'viewCount') {
            const result = await sortVideos(allVideos, 'viewCount');
            return result;
        } else if (sortBy === 'releaseDate') {
            const result = await sortVideos(allVideos, 'releaseDate');
            return result;
        } else {
            throw new ApiError(httpStatus.BAD_REQUEST, "\"sortBy\" must be one of [viewCount, releaseDate]")
        }
    } else {
        if (genres) {
            let genresArr = genres.split(',');
            for (let i = 0; i < genresArr.length; i++) {
                if (!["Education", "Sports", "Movies", "Comedy", "Lifestyle", "All"].includes(genresArr[i])) {
                    throw new ApiError(httpStatus.BAD_REQUEST, `\"genres[${i}]\" must be one of [Education, Sports, Movies, Comedy, Lifestyle, All]`)
                }
            }
            if (!genresArr.includes("All")) {
                allVideos = await filterByGenres(allVideos, genresArr);
            }
        }
        if (title) {
            allVideos = await filterByTitle(allVideos, title);
        }
        if(contentRating && !["Anyone", "7+", "12+", "16+", "18+", "All"].includes(contentRating)) {
            throw new ApiError(httpStatus.BAD_REQUEST, "\"contentRating\" must be one of [Anyone, 7+, 12+, 16+, 18+, All]")
        }else if(contentRating && !["Anyone", "All"].includes(contentRating)){
            allVideos = await filterByRating(allVideos,contentRating);
        }
        return allVideos;
    }
}
const sortVideos = async (videos, field) => {
    if (field === "viewCount") {
        videos = videos.sort((a, b) => parseInt(b[field]) - parseInt(a[field]));
        return videos;
    } else {
        videos = videos.sort((a, b) => new Date(b[field]) - new Date(a[field]));
        return videos;
    }
};

const filterByGenres = async (videos, genresArr) => {
    videos = videos.filter(video => genresArr.includes(video.genre));
    return videos;
};

const filterByTitle = async (videos, search) => {
    videos = videos.filter(video => video.title.toLowerCase().includes(search));
    return videos;
};

const filterByRating = async (videos, rating) => {
    videos = videos.filter(video => video.contentRating === rating);
    return videos;
}
const getVideoById = async (id) => {
    const result = await Video.findById(id);
    if (result === null) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    return result
};

const createVideo = async (body) => {
    const result = await Video.create(body);
    return result
};

const updateVideoVotes = async (body, params) => {
    const { vote, change } = body;
    const { videoId } = params;
    const result = await Video.findById(videoId);
    if (result === null) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    if (change === "increase") {
        result.votes[`${vote}s`] += 1
    } else if (change === "decrease") {
        result.votes[`${vote}s`] -= 1
    }
    result.save();
}
const updateVideoViews = async (id) => {
    const result = await Video.findById(id);
    if (result === null) {
        throw new ApiError(httpStatus.NOT_FOUND, "No video found with matching id");
    }
    result.viewCount += 1;
    result.save();
}

module.exports = {
    getVideos,
    getVideoById,
    createVideo,
    updateVideoVotes,
    updateVideoViews
}
