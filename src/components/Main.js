import React from 'react'
import { useEffect, useState } from "react";
import { Routes, Route } from 'react-router-dom'
import Index from "../pages/Index";
import Show from "../pages/Show";

export const Main = (props) => {
    const [ directory, setPeople ] = useState(null);

  const URL = "http://localhost:4000/api/directory/";

  const getPeople = async () => {
    const response = await fetch(URL);
    const data = await response.json();
    setPeople(data);
  };

  const createPeople = async (person) => {
    // make post request to create people
    await fetch(URL, {
      method: "POST",
      headers: {
        "Content-Type": "Application/json",
      },
      body: JSON.stringify(person),
    });
    // update list of people
    getPeople();
  };

  useEffect(() => getPeople(), []);

    return (
        <main>
            <Routes>
                <Route exact path="/" element={ <Index/> }/>
                <Route path="/people/:id" element={ <Show/> }/>
            </Routes>
        </main>
    )
}
