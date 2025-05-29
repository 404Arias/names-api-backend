const express = require("express");
const app = express();
const cors = require("cors");
let notes = [
  {
    id: 1,
    name: "Jaina Proudmoore",
    number: "0912345678",
  },
  {
    id: 2,
    name: "Thrall Durotan",
    number: "0998765432",
  },
  {
    id: 3,
    name: "Sylvanas Windrunner",
    number: "0923456781",
  },
  {
    id: 4,
    name: "Uther Lightbringer",
    number: "0987654321",
  },
  {
    id: 5,
    name: "Illidan Stormrage",
    number: "0976543210",
  },
];
app.use(cors());
app.use(express.json());

app.get("/api/notes", (request, response) => {
  response.json(notes);
});

app.get("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  const note = notes.find((note) => note.id === id);
  if (note) {
    response.json(note);
  } else {
    response.status(404).end();
  }
});

app.delete("/api/notes/:id", (request, response) => {
  const id = Number(request.params.id);
  notes = notes.filter((note) => note.id !== id);
  response.status(204).end();
});

app.post("/api/notes", (request, response) => {
  const note = request.body;
  if (!note || !note.name || !note.number) {
    return response.status(400).json({
      error: "Contenido is required",
    });
  }
  const ids = notes.map((note) => note.id);
  const maxId = Math.max(...ids);
  const newNote = {
    id: maxId + 1,
    name: note.name,
    number: note.number,
  };
  response.status(201).json(newNote);
  notes = notes.concat(newNote);
});

const PORT = 3002;
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
