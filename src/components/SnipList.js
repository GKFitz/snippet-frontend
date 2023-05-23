import React from 'react'
import {Link} from 'react-router-dom'
const SnipList = (props) => {
    
  
    return (
        <>
      
        {props.snippets.map((snip) =>
            <div key={snip._id} className="snip">
              <Link to={`/snip/${snip._id}`}><h3>{snip.title}</h3></Link>
              <span><button onClick={(e)=>props.handleEdit(snip._id)}>Edit</button> 
              <button onClick={(e)=>props.handleDelete(snip._id)} >Delete </button>
              </span>
            </div>
          
        )}
        </>
    )
        
    
}

export default SnipList