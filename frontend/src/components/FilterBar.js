import React, { useState } from 'react';
import {Button,Box} from '@mui/material';
import './FilterBar.css';

const FilterBar = (props) => {
  const [selectedFilters, setSelectedFilters] = useState([]);
  const [filters,setFilters] = useState(props.filtersFromParent);

  const handleFilterChange = (e) => {
    let filter = e.target.value;
    let newFilters=[];
    if(!props.multiSelect){
      if(!selectedFilters.includes(filter)){
        newFilters = [filter];
      }else{
        newFilters= [];
      }
    }else{
      if(!selectedFilters.includes(filter)){
        newFilters = [...selectedFilters,filter];
      }else{
        newFilters= selectedFilters.filter(item=>item!==filter);
      }
    }
    setSelectedFilters(newFilters);
    if(props.setGenres){
      props.setGenres(newFilters);
    }else if(props.setContent){
      props.setContent(newFilters[0]);
    }
  };

  return (
      <Box className="filter-bar">
        {filters.map(filter => (
        <Button className={selectedFilters.includes(filter)?"custom-button clicked":"custom-button"} key={filter} value={filter} onClick={handleFilterChange}>
          {filter}
        </Button>
      ))}
      </Box>
  );
};

export default FilterBar;
