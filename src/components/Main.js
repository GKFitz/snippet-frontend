import React from 'react'
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Index from "../pages/Index";
import Show from "../pages/Show";
import About from "../pages/About";
import SnipDetails from "./SnippetDetails";


export const Main = (props) => {
    const [ directories, setDirectories ] = useState(null);

  // const URL = "process.env.REACT_APP_BASE_URL";
  const URL = `${process.env.REACT_APP_BASE_URL}/api/directory/`;

  const getDirectory = async () => {
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
    getDirectory();
  };

  // const updateDirectory = async (person, id) => {
  //   // make put request to create people
  //   await fetch(URL + id, {
  //     method: "PUT",
  //     headers: {
  //       "Content-Type": "Application/json",
  //     },
  //     body: JSON.stringify(person),
  //   });
    // update list of people
  //   getDirectory();
  // }

  const deleteDirectory = async id => {
    // make delete request to create directory
    await fetch(URL + id, {
      method: "DELETE",
    })
    // update list of people
    getDirectory();
  }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {getDirectory()}, []);

    return (
        <main>
            <Routes>
                <Route exact path="/" element={ <Index 
                directories={directories} 
                createDirectories={createDirectories}
                deleteDirectory={deleteDirectory}
                /> }/>
                <Route path='about' element= { <About/>} />
                <Route path="/directory/:id" element={ <Show
                directories={directories}
                /> }/>
                <Route path="/snip/:id" element= {<SnipDetails /> } />
                {/* <Route path = "/directory/:id/snippets/:id" element={<SnippetDetails /> } /> */}
            </Routes>
        </main>
    )
}
export default Main;