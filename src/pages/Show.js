import React from 'react'
import { useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'
import SnipList from "../components/SnipList"



const Show = (props) => {
  const { id } = useParams()
  const directories = props.directories
  console.log(id);
    
  const directory = directories ? directories.find((d) => d._id === id ) : null
  const [snippets, setSnippets] = useState([])
  //This will control the state between creating/adding the snippet
    const [snippetId, setSnippetId] = useState('')
  //The State of the EditForm, performs duel add and edit function
  const [editForm, setEditForm] = useState({
    title: "",
    description: "",
    codeSnip: "",
    articles: ""
  })
  // Using this to control the switch between the add and edit buttons ref: https://kentcdodds.com/blog/wrapping-react-use-state-with-type-script
  const [mode, setMode] = useState("Add Snippet")
  //stop autoloading 5/17
  const [ isEditing, setIsEditing ] = useState(false)
  //This is the state between edit/update form
  const [ inShow, setInShow ] = useState(false)

  
  //this loads the snips to the corresponding Directory
  useEffect( () => {
   
    fetch(`http://localhost:4000/api/directory/get/${id}`, {
      method: "GET",
      headers: {
        "content-Type": "application/json"
      }
      }).then(res=>res.json())
        .then(res=>{
          console.log(res.snippets)
          setSnippets(res.snippets)
      })
  }, [id])
  
  console.log(snippets)
  //This handles the Form Data Change
  const handleChange = (e) => {
    setEditForm({
      ...editForm,
      [e.target.name]: e.target.value
    })
  }

  // Add new snippet
    const handleSubmit = (e) => {
    e.preventDefault()
    console.log(id)
    console.log(isEditing)
    console.log(snippetId)
  if(mode === "Add Snippet") {
      //Using the editForm to Add/Patch snippet and the and Edit/Put the Snippets
      // Edit
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
          alert('New snippet added');
        }).catch(error=>{
          console.log(error)
        })
      }else if (mode === "Update Snippet") {
      //Add
      fetch(`http://localhost:4000/api/snippets/update/${snippetId}`,{
        method: "PUT",
        headers:{
          "content-Type": "application/json"
        },
        body: JSON.stringify({
          title: editForm.title,
          description: editForm.description,
          codeSnip: editForm.codeSnip,
          articles: editForm.articles
        })
      }).then(res => res.json())
        .then(res => console.log(res))
      }
    }
      
  const handleEdit = (id) => {
    setInShow(prevState => !prevState)
    fetch(`http://localhost:4000/api/snippets/${id}`,{
      method: "GET",
      headers: {
        "content-Type": "application/json"
      }
      }).then(res=>res.json())
        .then(res => {
          console.log(res)
      setEditForm({
        title: res.title,
        description: res.description,
        codeSnip: res.codeSnip,
        articles: res.articles
      });
    //Call State
      setIsEditing(!isEditing)
      setSnippetId(res._id)
      setMode('Update Snippet')
        
    })
  }
      
  //This Handles the Add a new Snippet logic
  const handleShowForm = () => {
    setInShow(prevState => !prevState)
  }
  
  //This in the Function for the Delete button on the Snips
  const handleDelete = (snippet) => {
    fetch(`http://localhost:4000/api/snippets/delete/${snippet}`, {
      method: "DELETE",
      headers:{
        "content-Type": "application/json"
      }
    }).then(res => res.json())
    .then(res => console.log(res))
    
  }


  

  const loaded = () => {
    return (
      <>
        <h1>{directory.title}</h1>
        <h2>{directory.description}</h2>
        
        <button onClick={handleShowForm}>Add New Snippet</button>
        
      </>
    );
  };
  const loading = () => {
    return <h1>Loading ...</h1>;
  };

  return (
    <div className="directory">
      { directory ? loaded() : loading()}
      { (inShow === true)  &&
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
          <textarea
            type="text"
            value={editForm.codeSnip}
            name="codeSnip"
            placeholder="snippets"
            onChange={handleChange}
            rows="4"
            cols="50"
            required
          ></textarea>

          <input
            type="article"
            value={editForm.articles}
            name="articles"
            placeholder="article"
            onChange={handleChange}
          />  
          <input type="submit" value={mode} />
        </form>
      }
      <SnipList snippets={snippets} handleDelete={handleDelete} handleEdit={handleEdit}/>
    </div>
  )
}

export default Show








































