import React, { useState, useEffect} from 'react'
import { useParams } from "react-router-dom";


 const SnippetDetails = () => {
    const [Snippet,setSnippet] = useState({})
    const {id}= useParams()
//  Need a useEffect here with Fetch Get Request
    useEffect(() => {
        // (`http://localhost:4000/api/snippets/${id}`, {
        fetch(`${process.env.REACT_APP_BASE_URL}/api/snippets/${id}/`, {
        method: "GET",
        headers: {
        "content-Type": "application/json"
    }
    }).then(res => res.json())
    .then(res => {
        //console.log(res);
      setSnippet(res)
    })
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])


    
    // const snippetId = params.snippetID
    return (
        <div className= "snippet-details">
            <h2 id="title">{Snippet.title}</h2>
            Description<p id="description">{Snippet.description}</p>
            CodeSnippet<p id="codeSnip">{Snippet.codeSnip}</p>
            Article<p id="title">{Snippet.articles}</p>
        </div>
    )
}
export default SnippetDetails