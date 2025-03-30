// editor.js – handles note creation and live preview

const editor = document.getElementById("editor");
const titleInput = document.getElementById("note-title");
const tagsInput = document.getElementById("note-tags");
const preview = document.getElementById("preview");
const saveBtn = document.getElementById("save-note");

// 💡 Live Markdown Preview (basic)
editor?.addEventListener("input", () => {
  updatePreview(editor.value);
});

function updatePreview(markdown) {
  preview.innerHTML = markdownToHTML(markdown);
}

// Basic markdown parser (replace with real lib later if needed)
function markdownToHTML(md) {
  return md
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")
    .replace(/\*\*(.*)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*)\*/gim, "<em>$1</em>")
    .replace(/\n$/gim, "<br />");
}

// Save note to backend
saveBtn?.addEventListener("click", async () => {
  const title = titleInput.value.trim() || "Untitled";
  const content = editor.value.trim();
  const tags = tagsInput.value.split(",").map(t => t.trim()).filter(Boolean);

  if (!content) {
    alert("Note content is empty.");
    return;
  }

  const note = {
    title,
    content,
    tags
  };

  try {
    const res = await fetch("http://localhost:8000/notes/new", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(note)
    });

    const data = await res.json();
    if (data?.id) {
      alert(`✅ Note saved! ID: ${data.id}`);
    } else {
      alert("⚠️ Failed to save note.");
    }
  } catch (err) {
    console.error("Save error:", err);
    alert("❌ Could not connect to backend.");
  }
});