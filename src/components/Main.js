import React from 'react'
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Index from "../pages/Index";
import Show from "../pages/Show";

export const Main = (props) => {
    const [ directories, setDirectories ] = useState(null);

  const URL = "http://localhost:4000/api/directory/";

  const getDirectories = async () => {
    console.log("i've been hit!")
    const response = await fetch(URL);
    const data = await response.json();
    setDirectories(data);
  };

  const createDirectories = async (directory) => {
    // make post request to create directories
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(directory),
    });
    // update list of people
    getDirectories();
  };

  const updateDirectories = async (person, id) => {
    // make put request to create people
    await fetch(URL + id, {
      method: "PUT",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getDirectories();
  }

  useEffect(() => getDirectories, []);

    return (
        <main>
            <Routes>
                <Route exact path="/" element={ <Index directories={directories} createDirectories={createDirectories}/> }/>
                {/* <Route path="/api/directory/:id" element={ <Show/> }/> */}
            </Routes>
        </main>
    )
}
export default Main;