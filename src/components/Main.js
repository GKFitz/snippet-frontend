import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Index from "../pages/Index";
import Show from "../pages/Show";

export const Main = (props) => {
    return (
        <main>
            <Routes>
                <Route exact path="/" element={ <Index/> }/>
                <Route path="/people/:id" element={ <Show/> }/>
            </Routes>
        </main>
    )
}
