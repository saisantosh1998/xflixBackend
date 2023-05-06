import React, { useState } from "react";
import { FileUpload } from "@mui/icons-material";
import {
  Box,
  Button,
  IconButton,
  InputAdornment,
  TextField,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  FormHelperText
} from "@mui/material";
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { format } from 'date-fns';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import SearchIcon from "@material-ui/icons/Search";
import "./Header.css";
import { useContext } from "react";
import { MyContext } from "./MyContext";
import axios from "axios";
import { useSnackbar } from "notistack";
import { useNavigate } from 'react-router-dom' ;

function Header(props) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [date,setDate] = useState({});
  const {enqueueSnackbar} = useSnackbar()
  const [formData, setFormData] = useState({
    videoLink: "",
    title: "",
    genre: "",
    contentRating: "",
    releaseDate: "",
    previewImage: "",
  });
  const { search, setSearch } = useContext(MyContext);
  const updateSearch = (e) => {
    setSearch(e.target.value);
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };
  const handleDateChange = (event) => {
    setDate(event)
    let formatedDate = format(event['$d'], "dd MMM yyyy");
    setFormData({ ...formData, releaseDate: formatedDate });
  };
  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async(event) => {
    event.preventDefault();
    try {
      let url ="http://localhost:8082/v1/videos";
      let result = await axios.post(url,formData);
    } catch (err) {
      enqueueSnackbar(
        "Something went wrong. Check the backend console for more details",
        {
          variant: "error",
        }
      );
    }
    handleClose();
  };
  return (
    <Box className="header">
      <Box onClick={() => navigate(`/`)}>
        <img
          src={props.hide ? "../Logo.png" : "Logo.png"}
          alt="xflix logo"
        ></img>
      </Box>
      {!props.hide ? (
        <>
          <TextField
            className="search"
            size="small"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    style={{
                      backgroundColor: "gray",
                      borderRadius: "2px",
                      width: "4vw",
                      margin: "-14px",
                    }}
                  >
                    <SearchIcon style={{ color: "#555" }} />
                  </IconButton>
                </InputAdornment>
              ),
            }}
            placeholder="Search for videos"
            name="search"
            value={search}
            onChange={updateSearch}
          />
          <Box>
            <Button variant="contained" component="label" onClick={handleOpen}>
              <FileUpload />
              &nbsp;Upload
            </Button>
            <Dialog
              sx={{
                "& .MuiDialog-paper": {
                  bgcolor: "#292929",
                  borderRadius: "10px",
                  color: "white!important",
                },
                "& .MuiDialogContent-root, & .MuiTypography-root": {
                  color: "white",
                },
              }}
              open={open}
              onClose={handleClose}
            >
              <DialogTitle>Contact Us</DialogTitle>
              <form onSubmit={handleSubmit}>
                <DialogContent>
                  <TextField
                    helperText="link will be used to derive the video"
                    autoFocus
                    margin="dense"
                    name="videoLink"
                    label="Video Link"
                    type="text"
                    fullWidth
                    value={formData.videoLink}
                    onChange={handleChange}
                    className="text-field"
                  />
                  <TextField
                    helperText="this link will be used to preview the thumbnail image"
                    margin="dense"
                    name="previewImage"
                    label="Thumbnail image Link"
                    type="text"
                    fullWidth
                    value={formData.previewImage}
                    onChange={handleChange}
                    className="text-field"
                  />
                  <TextField
                    helperText="The title will be representative text for video"
                    margin="dense"
                    name="title"
                    label="Title"
                    type="text"
                    fullWidth
                    value={formData.title}
                    onChange={handleChange}
                    className="text-field"
                  />
                  <FormControl fullWidth margin="normal" className="text-field">
                    <InputLabel>Genre</InputLabel>
                    <Select
                      value={formData.genre}
                      onChange={handleChange}
                      name="genre"
                      label="Genre"
                    >
                      <MenuItem value="Education">Education</MenuItem>
                      <MenuItem value="Sports">Sports</MenuItem>
                      <MenuItem value="Comedy">Comedy</MenuItem>
                      <MenuItem value="LifeStyle">LifeStyle</MenuItem>
                    </Select>
                    <FormHelperText>
                      Genre is used for catergorizing the videos
                    </FormHelperText>
                  </FormControl>
                  <FormControl
                    fullWidth
                    margin="normal"
                    className="text-field"
                  >
                    <InputLabel>Content</InputLabel>
                    <Select
                      value={formData.contentRating}
                      onChange={handleChange}
                      name="contentRating"
                      label="Content"
                    >
                      <MenuItem value="7+">7+</MenuItem>
                      <MenuItem value="12+">12+</MenuItem>
                      <MenuItem value="16+">16+</MenuItem>
                      <MenuItem value="18+">18+</MenuItem>
                    </Select>
                    <FormHelperText>
                      this is used to filter videos on age group suitability
                    </FormHelperText>
                  </FormControl>
                  <LocalizationProvider  dateAdapter={AdapterDayjs}>
                    <DemoContainer fullWidth components={['DatePicker']}>
                      <DatePicker
                        label="Release Date"
                        name="releaseDate"
                        value={date}
                        onChange={handleDateChange}
                        inputVariant="outlined"
                        fullWidth
                        className="text-field"
                        format="DD MM YYYY"
                      />
                    </DemoContainer>
                  </LocalizationProvider>

                </DialogContent>
                <DialogActions>
                  <Button className="customButton" onClick={handleClose}>Cancel</Button>
                  <Button className="customButton" type="submit">Upload Vedio</Button>
                </DialogActions>
              </form>
            </Dialog>
          </Box>
        </>
      ) : (
        <></>
      )}
    </Box>
  );
}

export default Header;
