
import noteContext from "../Context/notes/noteContext"
import React, { useContext, useEffect, useRef, useState } from 'react'
import NoteItem from "./NoteItem";
import AddNote from "./AddNote";
import { useNavigate } from "react-router-dom";


const Notes = () => {
    const context = useContext(noteContext);
    const { notes, getNotes,editNote } = context;
    const [note,setNote] = useState({id:"", etitle:"",edescription:"",etag:"default"})

    let navigate=useNavigate();

    useEffect(() => {
        // console.log(localStorage.getItem('token'))
        if(localStorage.getItem('token'))
        {
            console.log("Inside useEffect hook "+localStorage.getItem('token'))
            getNotes();
        }
        else
        {
            navigate("/login")
        }
        // getNotes()
    }, [])

    const updateNote = (currentNote) => {
        ref.current.click();
        setNote({id:currentNote._id, etitle:currentNote.title, edescription:currentNote.description, etag:currentNote.tag})
    }

    const ref = useRef(null)
    const closeRef=useRef(null);

    const handleClick =  (e) =>{
        console.log("Updating the note....."+note)
        // e.preventDefault();
        editNote(note.id, note.etitle, note.edescription, note.etag);
        closeRef.current.click();
    }

    const handleChange = (e) =>{
        setNote({...note,[e.target.name]: e.target.value})
    }


    return (
        <>
            <AddNote />

            <button ref={ref} type="button" className="btn btn-primary d-none" data-bs-toggle="modal" data-bs-target="#exampleModal">
                Launch Edit note
            </button>

            <div className="modal fade" id="exampleModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
                <div className="modal-dialog">
                    <div className="modal-content">
                        <div className="modal-header">
                            <h5 className="modal-title" id="exampleModalLabel">Edit note</h5>
                            <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                        </div>
                        <div className="modal-body">
                            <form>
                                <div className="mb-3">
                                    <label htmlFor="title" className="form-label">Note Title</label>
                                    <input type="text" className="form-control" id="etitle" name="etitle" value={note.etitle} aria-describedby="emailHelp" onChange={handleChange} minLength={5} required/>

                                </div>
                                <div className="mb-3">
                                    <label htmlFor="description" className="form-label">Title Description</label>
                                    <input type="text" className="form-control" id="edescription" name="edescription" value={note.edescription} onChange={handleChange} minLength={5} required/>
                                </div>
                                <div className="mb-3">
                                    <label htmlFor="tag" className="form-label">Tag</label>
                                    <input type="text" className="form-control" id="etag" name="etag" value={note.etag} onChange={handleChange} />
                                </div>
                                {/* <button type="submit" className="btn btn-primary" onClick={handleClick}>Add note</button> */}
                            </form>
                        </div>
                        <div className="modal-footer">
                            <button ref={closeRef} type="button" className="btn btn-secondary" data-bs-dismiss="modal">Cancel</button>
                            <button disabled={note.etitle.length<5 || note.edescription.length<5} onClick={handleClick}  type="button" className="btn btn-primary">Save note</button>
                        </div>
                    </div>
                </div>
            </div>

            <div className="row my-3">
                <h1>Your Notes</h1>
                <div className="mycontainer">
                    {notes.length===0 && "No notes to display"}
                </div>
                
                {notes.map((note) => {
                    return <NoteItem key={note._id} updateNote={updateNote} note={note} />;
                })}
            </div>
        </>
    )
}

export default Notes;