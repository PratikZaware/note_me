const express = require('express');
const router = express.Router();
const fetchuser = require('../middleware/fetchuser')
const { body, validationResult } = require('express-validator');
const Notes = require('../modules/Notes')

// Get all the notes using /api/notes/fetchallnotes
router.get('/fetchallnotes', fetchuser, async (req, res) => {
    try {
        const notes = await Notes.find({ user: req.user.id });
        res.json( notes );
    } catch (error) {
        console.log(error)
        return res.status(500).send("Interal server error!");
    }

})

// Add new note using /api/notes/addnote
router.post('/addnote', fetchuser, [
    body('title', "Title must be at least 3 characters long").isLength({ min: 3 }),
    body('description', "Description must be at least 3 characters long").isLength({ min: 3 }),
], async (req, res) => {

    try {
        // if  there are errors while creating note, return error
        const errors = validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(400).json({ errors: errors.array() });
        }

        const { title, description, tag } = req.body;
        const note = new Notes({
            title,
            description,
            tag,
            user: req.user.id
        })
        const savedNote = await note.save()
        res.json( savedNote )
    } catch (error) {
        console.log(error)
        return res.status(500).send("Interal server error!");
    }

})


// update a note using /api/notes/updatenote
router.put('/updatenote/:id', fetchuser, async (req, res) => {
    // get all the fields using destructuring 
    const {title,description,tag} = req.body;

    // create new note object
    const newNote={};
    if(title)
    {
        newNote.title=title;
    }
    if(description)
    {
        newNote.description=description;
    }
    if(tag)
    {
        newNote.tag=tag;
    }

    // Till here in new note there will be updated note
    let note=await Notes.findById(req.params.id)

    // If no note is present with id
    if(!note)
    {
        return res.status(404).send("Not found");
    }

    // If user is trying to update another users note
    if(note.user.toString() !== req.user.id)
    {
        return res.status(401).send("Not allowed")
    }

    note=await Notes.findByIdAndUpdate(req.params.id, {$set : newNote},{new:true})
    res.json({note});
})


// delete a note using /api/notes/deletenote
router.delete('/deletenote/:id', fetchuser, async (req, res) => {

    // Till here in new note there will be updated note
    // find note to be deleted and delete it

    let note=await Notes.findById(req.params.id)

    // If no note is present with id
    if(!note)
    {
        return res.status(404).send("Not found");
    }

    // If user is trying to delete another users note
    if(note.user.toString() != req.user.id)
    {
        return res.status(401).send("Not allowed")
    }

    note=await Notes.findByIdAndDelete(req.params.id)
    res.json({"Success" : "Note has been deleted"});
})

module.exports = router