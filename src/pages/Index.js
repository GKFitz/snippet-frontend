import { useState } from "react";
import { Link } from "react-router-dom"
// import Main from "../components/Main";

const Index = (props) => {
    // state to hold formData
  const [ newForm, setNewForm ] = useState({
    title: "",
    description: "",
    snippets: []
  });
  // const [ deleteBtn, setDeleteBtn ] = useState(null)

  // handleChange function for form
  const handleChange = (event) => {
    setNewForm({ ...newForm, [event.target.name]: event.target.value });
  };

  // handle submit function for form
  const handleSubmit = (event) => {
    event.preventDefault();
    props.createDirectories(newForm);
    setNewForm({
      title: "",
      description: "",
      snippets: []
    
    });
  };

  // const handleDelete = (id) => {
  //   // fetch(`http://localhost:4000/api/snippets/delete/${snippet}`, {
  //   fetch(`https://gillians-code-cache-app-be.onrender.com/api/directory/${id}/`, {
  //     method: "DELETE",
  //     headers:{
  //       "content-Type": "application/json"
  //     }
  //   }).then(res => res.json())
  //   .then(res => console.log(res))
    
  // }
    // loaded function
    const loaded = () => {
        return props.directories.map((directory) => (
            <div key={directory._id} className="directory">
                <Link to={`/directory/${directory._id}`}><h1>{directory.title}</h1></Link>
                <h3>{directory.description}</h3>
                {/* <button onClick={(e)=>deleteDirectory(directory._id)} >Delete </button>  */}
            </div>
        ));
    };

    const loading = () => {
        return <h1>Loading...</h1>;
    };

        


    return (
        <section>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    value={newForm.title}
                    name="title"
                    placeholder="title"
                    onChange={handleChange}
                />
                <input
                    type="text"
                    value={newForm.description}
                    name="description"
                    placeholder="description"
                    onChange={handleChange}
                />
                <input type="submit" value="Create New Directory" />
            </form>
            {props.directories ? loaded() : loading()}
            {/* <Main deleteDirectory={deleteDirectory} /> */}
        </section>
    );
} 

export default Index;
