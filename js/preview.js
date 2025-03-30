// preview.js – Render markdown preview
// preview.js – Enhanced Markdown Preview Engine

const editor = document.getElementById("editor");
const preview = document.getElementById("preview");

if (editor && preview) {
  editor.addEventListener("input", () => {
    renderMarkdown(editor.value);
  });

  // Initial render
  renderMarkdown(editor.value);
}

function renderMarkdown(md) {
  if (!preview) return;
  preview.innerHTML = markdownToHTML(md);
}

function markdownToHTML(md) {
  return md
    // Code blocks (```code```)
    .replace(/```([\s\S]*?)```/gim, "<pre><code>$1</code></pre>")

    // Headings
    .replace(/^### (.*$)/gim, "<h3>$1</h3>")
    .replace(/^## (.*$)/gim, "<h2>$1</h2>")
    .replace(/^# (.*$)/gim, "<h1>$1</h1>")

    // Bold and Italic
    .replace(/\*\*(.*?)\*\*/gim, "<strong>$1</strong>")
    .replace(/\*(.*?)\*/gim, "<em>$1</em>")

    // Inline code
    .replace(/`(.*?)`/gim, "<code>$1</code>")

    // Links [text](url)
    .replace(/\[([^\]]+)\]\(([^)]+)\)/gim, '<a href="$2" target="_blank">$1</a>')

    // Images ![alt](url)
    .replace(/!\[([^\]]*)\]\(([^)]+)\)/gim, '<img src="$2" alt="$1" />')

    // Line breaks
    .replace(/\n/g, "<br>");
}