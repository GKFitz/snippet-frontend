import React from 'react'
import { Link } from "react-router-dom"

export const Index = (props) => {
    // loaded function
  const loaded = () => {
    return props.directories.map((directory) => (
      <div key={directory._id} className="directory">
        <Link to={`/directory/${directory._id}`}><h1>{directory.title}</h1></Link>
        <h3>{directory.description}</h3>
      </div>
    ));
  };

  const loading = () => {
    return <h1>Loading...</h1>;
  };

  return props.directories ? loaded() : loading();
}
    
    

export default Index;
