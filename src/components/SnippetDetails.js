import React, { useState } from 'react'
import { useParams } from "react-router-dom";


 const SnippetDetails = () => {
    const [Snippet,setSnippet] = useState({})
    const {id}= useParams()
//  Need a useEffect here with Fetch Get Request
    
    // const snippetId = params.snippetID
    return (
        <div className= "snippet-details">
            SnippetDetails
            <h2>{Snippet.title}</h2>
            <p>{Snippet.description}</p>
            <p id="codeSnip">{Snippet.codeSnip}</p>
            <p>{Snippet.articles}</p>
        </div>
    )
}
export default SnippetDetails