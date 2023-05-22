import React from 'react'

const SnipList = (props) => {
    
  
    return (
        <div className= "snip-list">
            The Snip List on the directory show page
        </div>
        // Need a snippet map
        // Link to the the Snippet Details from snip
        {snippets.map((snip) =>
            <div key={snip._id} className="snip">
              <Link to={`/snip/${snip._id}`}><h3>{snip.title}</h3></Link>
              <button onClick={(e)=>handleEdit(snip._id)} >Edit</button> 
              <button onClick={(e)=>handleDelete(snip._id)} >Delete </button>
            </div>
          
        )}
    )
        
    
}

export default SnipList