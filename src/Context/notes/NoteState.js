import react from "react";
import NoteContext from "./noteContext";
import { useState } from "react";

const NoteState = (props) => {
  const host = "http://localhost:5000"
  const notesInitial = []

  const [notes, setNotes] = useState(notesInitial)


  // Get All notes
  const getNotes = async () => {

    // API Call
    const response = await fetch(`${host}/api/notes/fetchallnotes`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjkzYzkzODQwYTI2MTk0YmFjZDM1In0sImlhdCI6MTY0NzI4NTg5Nn0.29424Dm3tg42HMpRNtHob3zVrquyTL3CGbMVXbToytY"
        // "auth-token":localStorage.getItem('token')
        "auth-token": localStorage.getItem('token')
      }
    });


    const allnotes = await response.json()
    console.log(allnotes)
    
    setNotes(allnotes)
  }






  // Add a note 
  const addNote = async (title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/addnote`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjA5YzNkNWI1YmI0MWVlMWFmY2JkIn0sImlhdCI6MTY0NTg1ODU0NX0.wg_40RGsgiTSBOlBjalLMZ0R-b_zeCVRh3BCpNabSsE"
        // "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjkzYzkzODQwYTI2MTk0YmFjZDM1In0sImlhdCI6MTY0NzI4NTg5Nn0.29424Dm3tg42HMpRNtHob3zVrquyTL3CGbMVXbToytY"
        // "auth-token":localStorage.getItem('token')
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({title, description, tag})
    });

    // const json=await response.json();
    // console.log(json);
    
    // console.log("plz get printed")

    // const note = {
    //   "_id": "622ee7c36d28bdf6f3783de8",
    //   "user": "621609c3d5b5bb41ee1afcbd",
    //   "title": title,
    //   "description": description,
    //   "tag": tag,
    //   "date": "2022-03-14T06:59:15.277Z",
    //   "__v": 0
    // };

    // setNotes(notes.concat(note))

    const note=await response.json();
    setNotes(notes.concat(note));

  }

  // Delete a note
  const deleteNote = async (id) => {

    // API call
    const response = await fetch(`${host}/api/notes/deletenote/${id}`, {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIxNjA5YzNkNWI1YmI0MWVlMWFmY2JkIn0sImlhdCI6MTY0NTg1ODU0NX0.wg_40RGsgiTSBOlBjalLMZ0R-b_zeCVRh3BCpNabSsE"
        // "auth-token": localStorage.getItem('token')
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjkzYzkzODQwYTI2MTk0YmFjZDM1In0sImlhdCI6MTY0NzI4NTg5Nn0.29424Dm3tg42HMpRNtHob3zVrquyTL3CGbMVXbToytY"
        // "auth-token":localStorage.getItem('token')
        "auth-token": localStorage.getItem('token')
      }
    });

    const json=await response.json();
    console.log(json);

    console.log("Deleting note with id = " + id);
    const newNotes = notes.filter((note) => { return note._id !== id })
    setNotes(newNotes)
  }




  // Edit a note
  const editNote = async (id, title, description, tag) => {

    // API Call
    const response = await fetch(`${host}/api/notes/updatenote/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        // "auth-token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VyIjp7ImlkIjoiNjIyZjkzYzkzODQwYTI2MTk0YmFjZDM1In0sImlhdCI6MTY0NzI4NTg5Nn0.29424Dm3tg42HMpRNtHob3zVrquyTL3CGbMVXbToytY"
        "auth-token": localStorage.getItem('token')
      },
      body: JSON.stringify({ title, description, tag })
    });

    const json = await response.json();

    let newNotes=JSON.parse(JSON.stringify(notes))

    // Edit note logic
    for (let index = 0; index < newNotes.length; index++) {
      const element = newNotes[index];
      if (element._id === id)      /// If we found note to be edited edit it
      {
        newNotes[index].title = title;
        newNotes[index].description = description;
        newNotes[index].tag = tag;
        break;
      }
    }
    setNotes(newNotes);
  }

  return (
    <NoteContext.Provider value={{ notes, addNote, deleteNote, editNote, getNotes }}>
      {props.children}
    </NoteContext.Provider>
  )
}

export default NoteState;