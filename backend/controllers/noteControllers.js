import asyncHandler from "express-async-handler";

// @desc    Get notes
// @route   GET /api/notes
// @access  Private
const getNotes = asyncHandler(async (req, res) => {
  const data = [
    { _id: 1, title: "Title", category: "Category", content: "Content" },
    { _id: 2, title: "Title", category: "Category", content: "Content" },
    { _id: 3, title: "Title", category: "Category", content: "Content" },
  ];
  res.status(200).json(data);
});

// @desc    Get a single note
// @route   GET /api/notes/:id
// @access  Private
const getSingleNote = asyncHandler(async (req, res) => {
  res.send("Get Single Note");
});

// @desc    Create a note
// @route   POST /api/notes
// @access  Private
const createNote = asyncHandler(async (req, res) => {
  res.send("Create Note");
});

// @desc    Update a note
// @route   PUT /api/notes/:id
// @access  Private
const updateNote = asyncHandler(async (req, res) => {
  res.send("Update Note");
});

// @desc    Delete a note
// @route   DELETE /api/notes/:id
// @access  Private
const deleteNote = asyncHandler(async (req, res) => {
  res.send("Delete Note");
});

export { getNotes, getSingleNote, createNote, updateNote, deleteNote };
