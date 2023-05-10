import asyncHandler from "express-async-handler";
import Note from "../models/noteModel.js";

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  //After going through 'protect' middleware, we have 'req.user' which contains a user document
  //Then we find all of the notes that was created by that user
  const notes = await Note.find({ user: req.user._id });

  res.status(200).json(notes);
});

// @desc    Get a single note
// @route   GET /api/notes/:id
// @access  Private
const getSingleNote = asyncHandler(async (req, res) => {
  const note = await Note.findById({ _id: req.params.id });
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }

  res.status(200).json(note);
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Please fill up the fields");
  }

  const note = await Note.create({
    user: req.user._id,
    title: title,
    category: category,
    content: content,
  });

  if (note) {
    res.status(201).json(note);
  } else {
    res.status(500);
    throw new Error("Faild to create the note");
  }
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  const { title, category, content } = req.body;

  if (!title || !category || !content) {
    res.status(400);
    throw new Error("Please fill up the fields");
  }

  //To be able to update a note:
  //1. The user of the note needs to log in
  //2. The note has to belong to the logged-in user

  //1. The user of the note needs to log in
  //Check if a user is logged-in
  if (!req.user) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //2. The note has to belong to the logged-in user
  //Find the note that we want to update
  const note = await Note.findById({ _id: req.params.id });
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }
  //Check if the user of the note matches the logged-in user
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //If both the conditions are met, the user can update the note
  const updatedNote = await Note.findByIdAndUpdate(
    note._id,
    { title, category, content },
    { new: true }
  );

  res.status(200).json(updatedNote);
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  //To be able to delete a note:
  //1. The user of the note needs to log in
  //2. The note has to belong to the logged-in user

  //1. The user of the note needs to log in
  //Check if a user is logged-in
  if (!req.user) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //2. The note has to belong to the logged-in user
  //Find the note that we want to delete
  const note = await Note.findById({ _id: req.params.id });
  if (!note) {
    res.status(400);
    throw new Error("Note not found");
  }
  //Check if the user of the note matches the logged-in user
  if (note.user.toString() !== req.user._id.toString()) {
    res.status(401);
    throw new Error("User not authorized");
  }

  //If both the conditions are met, the user can delete the note
  const deletedNote = await Note.findByIdAndDelete(note._id);

  res.status(200).json({ _id: deletedNote._id });
});

export { getNotes, getSingleNote, createNote, updateNote, deleteNote };
