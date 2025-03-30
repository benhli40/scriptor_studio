# notes_core.py – helper functions for note management

from uuid import uuid4
from datetime import datetime
import json
import os

DATA_FILE = "data/notes.json"

def load_notes():
    if not os.path.exists(DATA_FILE):
        return []
    with open(DATA_FILE, "r", encoding="utf-8") as f:
        return json.load(f)

def save_notes(notes):
    with open(DATA_FILE, "w", encoding="utf-8") as f:
        json.dump(notes, f, indent=2)

def get_note_by_id(note_id: str):
    notes = load_notes()
    return next((n for n in notes if n["id"] == note_id), None)

def create_note(title: str, content: str, tags: list[str]):
    note = {
        "id": str(uuid4()),
        "title": title,
        "content": content,
        "tags": tags,
        "timestamp": datetime.utcnow().isoformat()
    }
    notes = load_notes()
    notes.append(note)
    save_notes(notes)
    return note

def export_note_to_file(note: dict):
    filename = f"{note['title'].replace(' ', '_')}.md"
    filepath = os.path.join("data", filename)
    with open(filepath, "w", encoding="utf-8") as f:
        f.write(note["content"])
    return filename