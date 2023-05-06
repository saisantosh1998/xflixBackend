
import React, { createContext, useState } from 'react';

export const MyContext = createContext();

export const MyProvider = (props) => {
  const [genres, setGenres] = useState([]);
  const [content , setContent] = useState("");
  const [sortBy , setSortBy] = useState("Released Date");
  const [search, setSearch] =  useState("");


  return (
    <MyContext.Provider value={{ genres, setGenres, content, setContent, sortBy , setSortBy, search, setSearch}}>
      {props.children}
    </MyContext.Provider>
  );
};