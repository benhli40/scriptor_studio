// search.js – Filter saved notes by title or tags

const searchInput = document.getElementById("search-input");
const tagInput = document.getElementById("tag-filter");
const resultList = document.getElementById("search-results");

async function fetchNotes() {
  try {
    const res = await fetch("http://localhost:8000/notes");
    return await res.json();
  } catch (err) {
    console.error("❌ Failed to fetch notes:", err);
    return [];
  }
}

function filterNotes(notes, query, tagFilter) {
  const q = query.toLowerCase();

  return notes.filter(note => {
    const matchesTitle = note.title.toLowerCase().includes(q);
    const matchesTag = tagFilter
      ? note.tags.map(t => t.toLowerCase()).includes(tagFilter.toLowerCase())
      : true;
    return matchesTitle && matchesTag;
  });
}

function renderResults(notes) {
  resultList.innerHTML = "";

  if (notes.length === 0) {
    resultList.innerHTML = "<p>No matching notes found.</p>";
    return;
  }

  notes.forEach(note => {
    const div = document.createElement("div");
    div.className = "note-result";

    const preview = note.content.slice(0, 100).replace(/\n/g, " ") + "...";

    div.innerHTML = `
      <h3>${note.title}</h3>
      <small>${new Date(note.timestamp).toLocaleString()}</small>
      <p>${preview}</p>
      <button data-id="${note.id}">✍️ Open</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      window.location.href = `index.html?view=write&id=${note.id}`;
    });

    resultList.appendChild(div);
  });
}

async function handleSearch() {
  const query = searchInput.value.trim();
  const tag = tagInput.value.trim();

  const allNotes = await fetchNotes();
  const filtered = filterNotes(allNotes, query, tag);
  renderResults(filtered);
}

// Setup
searchInput?.addEventListener("input", handleSearch);
tagInput?.addEventListener("input", handleSearch);
document.addEventListener("DOMContentLoaded", handleSearch);