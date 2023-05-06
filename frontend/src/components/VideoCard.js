import { Card, CardContent, CardMedia, Typography } from '@mui/material'
import React from 'react'
import { useNavigate } from 'react-router-dom' ;

function VideoCard({ video }) {
  const navigate = useNavigate();
  let displayTime;
  const convertToYears = () => {
    let date = new Date(Date.parse(video?.releaseDate || video?.uploadDate));
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
  displayTime=convertToYears();
  return (
    <Card className="card" onClick={() => navigate(`/video/${video._id}`)}>
      <CardMedia
        component="img"
        height="194"
        image={video.previewImage}
        alt="Paella dish"
      />
      <CardContent sx={{backgroundColor:"#121212",color:"white"}}>
        <Typography variant="body2" >
          {video.title}
        </Typography><br />
        <Typography variant="body2" >
          {displayTime}
        </Typography><br />
      </CardContent>
    </Card>
  )
}

export default VideoCard