from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
from notes_core import (
    load_notes,
    save_notes,
    get_note_by_id,
    create_note,
    export_note_to_file
)

app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# === Pydantic Model ===
class Note(BaseModel):
    id: str
    title: str
    content: str
    tags: list[str]
    timestamp: str

# === Routes ===

@app.get("/notes")
def get_all_notes():
    return load_notes()

@app.get("/notes/{note_id}")
def get_note(note_id: str):
    note = get_note_by_id(note_id)
    if not note:
        raise HTTPException(status_code=404, detail="Note not found")
    return note

@app.post("/notes/new")
def make_note(title: str = "Untitled", content: str = "", tags: list[str] = []):
    note = create_note(title, content, tags)
    return {"status": "created", "id": note["id"]}

@app.post("/export")
def export_note(note: Note):
    filename = export_note_to_file(note.dict())
    return {"status": "exported", "file": filename}