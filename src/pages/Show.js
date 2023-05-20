import React from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useEffect, useState } from 'react'

const Show = (props) => {
  const { id } = useParams()
  const navigate = useNavigate()
  const directories = props.directories
  console.log(id);
  
  const directory = directories ? directories.find((d) => d._id === id ) : null

  const [ editForm, setEditForm ] = useState(directories)

  //stop autoloading 5/17
  const [ isEditing, setIsEditing ] = useState(false)

    useEffect( () => {
      if (directory) {
        setEditForm(directory)
      }

    }, [directory])

  // handling form data change
  const handleChange = (e) => {
    setEditForm( {
      ...editForm,
     [e.target.name]: e.target.value 
    })
  }
  
  // handling submit event for edit form
  const handleUpdate = (e) => {
    e.preventDefault()
    props.updateDirectory(editForm, directory._id)
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
        <img 
          className="avatar-image" 
          src={directory.title} 
          alt={directory.description} 
        />
        {/* to */}
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
      { directory ? loaded() : loading() }
      {/* if this AND this is turn no render */}
      { isEditing && 
      <form onSubmit={handleUpdate}>
        <input
          type="text"
          value={editForm.title}
          name="title"
          placeholder="title"
          onChange={handleChange}
        />
        <input
          type="text"
          value={editForm.description}
          name="description"
          placeholder="description"
          onChange={handleChange}
        />
        <input type="submit" value="Add Snippet" />
      </form>
    }
    </div>

  )
}

export default Show