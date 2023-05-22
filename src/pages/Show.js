import React from 'react'
import { useNavigate, useParams, Link } from 'react-router-dom'
import { useEffect, useState } from 'react'



const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const directories = props.directories
  console.log(id);
    
  const directory = directories ? directories.find((d) => d._id === id ) : null
  const [snippets, setSnippets] = useState([])
  const [snippetId, setSnippetId] = useState('')
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    codeSnip: "",
    articles: ""
  })
  

  
  //stop autoloading 5/17
  const [ isEditing, setIsEditing ] = useState(false)
  //showing the snips and the edit/update form
  const [isShow, setIsShow] = useState(false)
  useEffect( () => {
   
    fetch(`http://localhost:4000/api/directory/get/${id}`, {
      method: "GET",
      headers: {
        "content-TYpe": "application/json"
      }
      }).then(res=>res.json())
      .then(res=>{
        console.log(res.snippets)
        setSnippets(res.snippets)
      })
  }, [])
  console.log(snippets)
  // handling form data change
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }
  
    
    // Add a new Snippet
    const handleSubmit = (e) => {
      e.preventDefault()
      console.log(id)
      console.log(isEditing)
      // console.log(snippet);
      console.log(snippetId)
    }
    
    if(!handleEdit) {
    //Using the editForm to Add/Patch snippet and the and Edit/Put the Snippets
    fetch(`http://localhost:4000/api/directory/${id}`, {
      method: "PATCH",
      headers: {
        "content-Type": "application/json"
      },
      body: JSON.stringify({
        title: editForm.title,
        description: editForm.description,
        codeSnip: editForm.codeSnip,
        articles: editForm.articles
      }),
      }).then(res => res.json)
        .then((res) => {
          console.log(res);
          alert('new snippet added');
        }).catch(error=>{
          console.log(error)
        })
      

    }else if (handleEdit) {
      fetch(`http://localhost:4000/api/snippets/update/${snippetId}`,{
        method: "PUT",
        headers:{
          "content-Type": "application?json"
        },
      body: JSON.stringify({
        title: editForm.title,
        description: editForm.description,
        codeSnip: editForm.codeSnip,
        articles: editForm.articles
      })
    }.then(res => res.json)
      .then((res) => {
        console.log(res);
      }






    const handleEdit = () => {
        setIsEditing(prevState => !prevState)
    }
  
  
    const handleDelete = () => {
      props.deleteDirectory(directory._id)
      navigate('/')
    }

  const loaded = () => {
    return (
      <>
        <h1>{directory.title}</h1>
        <h2>{directory.description}</h2>
        


        <button onClick={handleEdit}>{ isEditing ? 'Cancel Edit': 'edit'}</button>
        <button onClick={handleDelete}>Delete</button>
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="directory">
      { directory ? loaded() : loading()}
      {/* if this AND this is turn no render */}
      { (isShow == true)  &&
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            value={editForm.title}
            name="title"
            placeholder="title"
            onChange={handleChange}
            required
          />
          <textarea
            type="text"
            value={editForm.description}
            name="description"
            placeholder="description"
            onChange={handleChange}
            required
          ></textarea> 
          <input
            type="text"
            value={editForm.codeSnip}
            name="codeSnip"
            placeholder="snippets"
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          />

          <input
            type="article"
            value={editForm.articles}
            name="articles"
            placeholder="article"
            onChange={handleChange}
          />  
          <input type="submit" value= "Add Snippet" />
        </form>
      }
      {/* This is where the map needs to go for the snips */}
      {snippets.map((snip) =>
          <div key={snip._id} className="snip">
            <Link to={`/snip/${snip._id}`}><h3>{snip.title}</h3></Link>
            <button onClick={(e)=>handleEdit(snip._id)} >Edit</button> 
            <button onClick={(e)=>handleDelete(snip._id)} >Delete </button>
          </div>
        
        )}
     
</div>
  );
};

export default Show