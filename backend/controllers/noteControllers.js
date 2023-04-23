const getNotes = async (req, res) => {
  res.send("Get Notes");
};

const getSingleNote = async (req, res) => {
  res.send("Get Single Note");
};

const createNote = async (req, res) => {
  res.send("Create Note");
};

const updateNote = async (req, res) => {
  res.send("Update Note");
};

const deleteNote = async (req, res) => {
  res.send("Delete Note");
};

export { getNotes, getSingleNote, createNote, updateNote, deleteNote };
