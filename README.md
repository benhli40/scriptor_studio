# ✍️ Scriptor Studio

**Scriptor Studio** is a clean, offline-first markdown writing app with versioning, live preview, and privacy at its core. Built with only HTML, CSS, JavaScript, and a Python FastAPI backend — it’s simple, fast, and fully yours.

> 🧠 *“The Obsidian/Notion that lives on your desktop and doesn’t spy on you.”*

---

## 🚀 Live Demo

🌐 [Launch Scriptor Studio](https://benhli40.github.io/scriptor_studio/?view=home)

---

## 📌 Features

- 🖋️ **Markdown Editor** with live preview
- 🧠 **Version History** – save any version manually
- 🔍 **Search Notes by Tags**
- 📄 **Export Notes as .md files**
- 🌓 **Light & Dark Mode Toggle**
- 💾 **LocalStorage** + optional **FastAPI Backend**
- ⚡ **SPA-like Navigation** using modular HTML views

---

## 🛠️ Tech Stack

| Layer     | Tools                     |
|-----------|---------------------------|
| Frontend  | HTML5, CSS3, JavaScript   |
| Backend   | Python, FastAPI           |
| Storage   | LocalStorage + `notes.json` |
| Markdown  | Custom lightweight parser |

---

## 📁 File Structure

scriptor_studio/ 
├── index.html 
├── js/ 
│    ├── script.js 
│    ├── editor.js 
│    ├── preview.js 
│    ├── search.js 
│    ├── versioning.js 
│    └── storage.js 
├── css/ 
│    ├── style.css 
│    └── themes.css 
├── snippets/ 
│    ├── home.html 
│    ├── write.html 
│    ├── search.html 
│    └── history.html 
├── backend/ 
│    ├── app.py 
│    └── notes_core.py 
├── data/ 
│    └── notes.json 
├── LICENSE 
└── README.md

---

## 🧪 Running Locally

### 📦 Prerequisites

- Python 3.11+
- FastAPI and Uvicorn:
  ```bash
  pip install fastapi uvicorn


---

Built with 💻 + ❤️ + 🧠 by Benjamin Liles, with ChatGPT pair programming
