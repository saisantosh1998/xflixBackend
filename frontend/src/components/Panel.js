import React, { useState } from "react";
import { Box, Button, Stack } from "@mui/material";
import "./Panel.css";
import FilterBar from "./FilterBar";
import DropDown from "./DropDown";
import { useContext } from 'react';
import { MyContext } from './MyContext';
function Panel() {
  const genre = [ "All Genre", "Education", "Sports", "Comedy", "LifeStyle"];
  const age = [ "Any age group", "7+", "12+", "16+", "18+"];                                                    
  const {setGenres, setContent, sortBy, setSortBy} = useContext(MyContext);
  return (
    <Box className="panel">
      <Stack direction="row" spacing={2}>
        <FilterBar filtersFromParent={genre}   setGenres={setGenres} multiSelect />
        <DropDown setSortBy={setSortBy}  sortBy={sortBy}/>
      </Stack>
      <FilterBar filtersFromParent={age}  setContent={setContent} />
    </Box>
  );
}

export default Panel;
