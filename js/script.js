// script.js – Faux SPA navigation + theme toggle

import { loadTheme, saveTheme } from './storage.js';

const viewContainer = document.getElementById("view");
const themeToggleBtn = document.getElementById("toggle-theme");

// === 1. Theme Toggle ===
document.addEventListener("DOMContentLoaded", () => {
  const theme = loadTheme();
  document.body.classList.toggle("dark", theme === "dark");

  if (themeToggleBtn) {
    themeToggleBtn.textContent = theme === "dark" ? "☀️ Light" : "🌓 Dark";

    themeToggleBtn.addEventListener("click", () => {
      const isDark = document.body.classList.toggle("dark");
      const newTheme = isDark ? "dark" : "light";
      saveTheme(newTheme);
      themeToggleBtn.textContent = isDark ? "☀️ Light" : "🌓 Dark";
    });
  }

  // Load view based on URL param or default
  const viewParam = new URLSearchParams(window.location.search).get("view") || "home";
  loadView(viewParam);
});

// === 2. Load View HTML ===
export async function loadView(viewName) {
  try {
    const res = await fetch(`./snippets/${viewName}.html`);
    if (!res.ok) throw new Error("View not found");

    const html = await res.text();
    viewContainer.innerHTML = html;

    // Dynamically load related JS
    switch (viewName) {
      case "write":
        import("./editor.js");
        import("./preview.js");
        break;
      case "history":
        import("./versioning.js");
        break;
      case "search":
        import("./search.js");
        break;
      default:
        break;
    }

    // Push state to URL
    const url = new URL(window.location);
    url.searchParams.set("view", viewName);
    window.history.pushState({}, "", url);
  } catch (err) {
    console.error("❌ Error loading view:", err);
    viewContainer.innerHTML = `<p class="error">View not found: ${viewName}</p>`;
  }
}

// === 3. Navigation Buttons (works from index.html) ===
window.navigate = loadView; // expose globally so <button onclick="navigate('write')"> works

// === 4. Handle back/forward navigation ===
window.addEventListener("popstate", () => {
  const viewParam = new URLSearchParams(window.location.search).get("view") || "home";
  loadView(viewParam);
});