// versioning.js – Manage and display saved versions of notes

const versionList = document.getElementById("version-list");

function loadVersions() {
  const versions = JSON.parse(localStorage.getItem("scriptor_versions") || "[]");
  renderVersions(versions);
}

function renderVersions(versions) {
  versionList.innerHTML = "";

  if (versions.length === 0) {
    versionList.innerHTML = "<p>No saved versions yet.</p>";
    return;
  }

  versions.forEach((v, index) => {
    const div = document.createElement("div");
    div.className = "version-item";
    
    const title = v.title || "Untitled";
    const date = new Date(v.savedAt).toLocaleString();
    const preview = v.content.slice(0, 100).replace(/\n/g, " ") + "...";

    div.innerHTML = `
      <h3>${title}</h3>
      <small>Saved at: ${date}</small>
      <p>${preview}</p>
      <button data-index="${index}">🔍 View</button>
    `;

    div.querySelector("button").addEventListener("click", () => {
      viewVersion(v);
    });

    versionList.appendChild(div);
  });
}

function viewVersion(version) {
  const view = document.getElementById("version-preview");
  view.innerHTML = `
    <h2>${version.title}</h2>
    <small>${new Date(version.savedAt).toLocaleString()}</small>
    <pre>${version.content}</pre>
    <p><strong>Tags:</strong> ${version.tags.join(", ")}</p>
  `;
}

document.addEventListener("DOMContentLoaded", loadVersions);