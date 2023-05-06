import * as React from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import SwapVertIcon from '@mui/icons-material/SwapVert';
import './DropDown.css';

export default function DropDown(props) {
  const [sortFilter, setSortFilter] = React.useState("Released Date");
  const handleChange = (event) => {
    setSortFilter(event.target.value);
    props?.setSortBy(event.target.value);
  };

  return (
    <FormControl sx={{ m: 1, minWidth: 120 }} size="small" >
      <Select
        value={sortFilter}
        onChange={handleChange}
        displayEmpty
        inputProps={{ 'aria-label': 'Without label' }}
        className="dropdown"
      >
        <MenuItem value={"Released Date"}><SwapVertIcon/> Sort By: Uploaded Date</MenuItem>
        <MenuItem value={"View Count"}><SwapVertIcon/> Sort By View Count</MenuItem>
      </Select>
    </FormControl>
  );
}