import React, { useEffect, useState } from "react";
import { useSnackbar } from "notistack";
import axios from "axios";
import { SentimentDissatisfied } from "@mui/icons-material";
import { Box, Grid, Typography } from "@mui/material";
import VideoCard from "./VideoCard";
import "./Dashboard.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
function Dashboard() {
  const [videos, setVideos] = useState([]);
  const [params, setParams] = useState([]);
  const { enqueueSnackbar } = useSnackbar();
  const { genres, content, sortBy, search } = useContext(MyContext);
  const queryParams = (genres, content, search) => {
    let params = "";
    if (genres.length > 0) {
      let finalGenre = genres.includes("All Genre")?"All":genres.join(",");
      if (params === "") {
        params += `genres=${finalGenre}`;
      } else {
        params += `&genres=${finalGenre}`;
      }
    }
    if (content) {
      if(content === "Any age group")content="All"
      if (params === "") {
        params += `contentRating=${content.replace("+","%2B")}`;
      } else {
        params += `&contentRating=${content.replace("+","%2B")}`;
      }
    }
    if (search) {
      if (params === "") {
        params += `title=${search}`;
      } else {
        params += `&title=${search}`;
      }
    }
    return params;
  };
  useEffect(() => {
    let currParams = queryParams(genres, content, search);
    setParams(currParams);
    performAPICall();
  }, []);
  useEffect(() => {
    addFilters();
  });
  useEffect(()=>{
    sortVedios();
  },[sortBy])
  const performAPICall = async () => {
    try {
      let url =
        "http://localhost:8082/v1/videos";
      let result = await axios.get(url);
      if (result.status === 200) {
        setVideos([...result.data.videos]);
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
  const addFilters = async () => {
    try {
      let currParams = queryParams(genres, content, search);
      if (currParams !== params) {
        setParams(currParams);
        let url =
          "http://localhost:8082/v1/videos?" +
          currParams;
        let result = await axios.get(url);
        if (result.status === 200) {
          setVideos([...result.data.videos]);
        }
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
  const sortVedios = async () => {
    try {
        let url = `http://localhost:8082/v1/videos?sortBy=${sortBy==="Released Date"?"releaseDate":"viewCount"}`;
        let result = await axios.get(url);
        if (result.status === 200) {
          setVideos([...result.data.videos]);
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
  return (
    <Box className="dashboard">
      {videos.length > 0 ? (
        <Grid container spacing={2}>
          {videos.map((video) => (
            <Grid key={video._id} item xs={6} md={3} className="product-grid">
              <VideoCard video={video} />
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box
          sx={{
            alignItems: "center",
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            height: "50vh",
            width: "100vw",
          }}
        >
          <SentimentDissatisfied />
          <br />
          <Typography variant="body2">No videos found</Typography>
        </Box>
      )}
    </Box>
  );
}

export default Dashboard;
