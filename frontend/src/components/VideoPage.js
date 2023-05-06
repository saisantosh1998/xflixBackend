import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useSnackbar } from "notistack";
import Header from "./Header";
import Dashboard from "./Dashboard";
import "./VideoPage.css";
import { Box, Button, Stack, Typography } from "@mui/material";
import { ThumbUp, ThumbDown } from '@material-ui/icons';
import { useLocation } from "react-router-dom";

function VideoPage() {
  const [video, setVideo] = useState({});
  const [upVoteCount, setUpVoteCount] = useState(0);
  const [downVoteCount, setDownVoteCount] = useState(0);
  const [views,setViews] = useState(0);
  const { enqueueSnackbar } = useSnackbar();
  const params = useParams();
  const location = useLocation();
  useEffect(() => {
    performAPICall();
  }, [params.videoId]);
  useEffect(() => {
    if(location){
      increaseView();
    }
  }, [location]);
  const increaseView = async () => {
    try {
      let url = `http://localhost:8082/v1/videos/${params.videoId}/views`;
      let result = await axios.patch(url);
      if(result.status === 204){
        setViews(views+1);
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }

  }
  const performAPICall = async () => {
    try {
      let url =
        "http://localhost:8082/v1/videos/" +
        params.videoId;
      let result = await axios.get(url);
      if (result.status === 200) {
        setVideo(result.data);
        setUpVoteCount(result.data?.votes?.upVotes);
        setDownVoteCount(result.data?.votes?.downVotes);
        setViews(result.data?.viewCount)
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }
  };
  let displayTime;
  const convertToYears = () => {
    let date = new Date(Date.parse(video?.releaseDate));
    let today = new Date();
    let diff = today - date;
    const diffSeconds = Math.floor(diff / 1000);
    const diffMinutes = Math.floor(diffSeconds / 60);
    const diffHours = Math.floor(diffMinutes / 60);
    const diffDays = Math.floor(diffHours / 24);
    const diffMonths = Math.floor(diffDays / 30);
    const diffYears = Math.floor(diffDays / 365);

    if (diffSeconds < 60) {
      return 'Just now';
    } else if (diffMinutes < 60) {
      return `${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
    } else if (diffHours < 24) {
      return `${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
    } else if (diffDays < 30) {
      return `${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
    } else if (diffMonths < 12) {
      return `${diffMonths} month${diffMonths > 1 ? 's' : ''} ago`;
    } else {
      return `${diffYears} year${diffYears > 1 ? 's' : ''} ago`;
    }
  }
  displayTime = convertToYears();
  const upVote = async () => {
    try {
      let url =
        `http://localhost:8082/v1/videos/${params.videoId}/votes`;
      let result = await axios.patch(url, {
        "vote": "upVote",
        "change": "increase"
      });
      if (result.status === 204) {
        setUpVoteCount(upVoteCount + 1)
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }
  }
  const downVote = async () => {
    try {
      let url =
        `http://localhost:8082/v1/videos/${params.videoId}/votes`;
      let result = await axios.patch(url, {
        "vote": "downVote",
        "change": "increase"
      });
      if (result.status === 204) {
        setDownVoteCount(downVoteCount + 1)
      }
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }
  }
  return (
    <Box sx={{
      background: "black"
    }}>
      <Header hide />
      <Box
        sx={{
          width: "80%",
          hieght: "100%",
          background: "black",
          margin: "auto",
        }}
      >
        <iframe
          title={video.title}
          src={`https://${video.videoLink}`}
          width="100%"
          height="500"
          frameBorder="0"
          allow="autoplay; encrypted-media"
          allowFullScreen
          style={{ borderRadius: '10px', marginTop: "10px" }}
        />
        <Box sx={{ background: "black", color: "white", padding: "20px" }}>
          <Typography>{video.title}</Typography>
          <Stack direction="row" spacing={2} style={{ position: "absloute", float: "right", margin: "-10px" }}>
            <Button className="custom-button-primary" onClick={upVote}><ThumbUp />&nbsp;{upVoteCount}</Button>
            <Button className="custom-button-grey" onClick={downVote}><ThumbDown />&nbsp;{downVoteCount}</Button>
          </Stack>
          <Stack direction="row" spacing={2}>
            <Typography>{video.contentRating}</Typography>
            <Typography>{displayTime}</Typography>
            <Typography>{views} views</Typography>
          </Stack>
        </Box>
        <hr style={{ borderColor: "#292929" }} />
        <br />
        <Box height="20">dummy</Box>
        <Dashboard />
      </Box>
    </Box>
  );
}

export default VideoPage;
