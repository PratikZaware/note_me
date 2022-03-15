import noteContext from "../Context/notes/noteContext"
import React, { useContext } from 'react'
import { useState } from "react";

const AddNote = () => {
    const context = useContext(noteContext);
    const { addNote } = context;

    const [note,setNote] = useState({title:"",description:"",tag:""})

    const handleClick =  (e) =>{
        e.preventDefault();
        addNote(note.title,note.description,note.tag);
        setNote({title:"",description:"",tag:""})
    }

    const handleChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }

    return (
        <div className="container my-3 mx-3">
            <h1>Add a note</h1>
            <form>
                <div className="mb-3">
                    <label htmlFor="title" className="form-label">Note Title</label>
                    <input type="text" className="form-control" id="title" name="title" aria-describedby="emailHelp" value={note.title} onChange={handleChange} minLength={5} required/>
                    
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">Title Description</label>
                    <input type="text" className="form-control" id="description" name="description" value={note.description} onChange={handleChange} minLength={5} required/>
                </div>
                <div className="mb-3">
                    <label htmlFor="tag" className="form-label">Tag</label>
                    <input type="text" className="form-control" id="tag" name="tag" value={note.tag} onChange={handleChange}/>
                </div>
                <button disabled={note.title.length<5 || note.description.length<5} type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button>
            </form>
        </div>
    )
}

export default AddNote;