// storage.js – Handle localStorage for drafts and versions

const DRAFT_KEY = "scriptor_draft";
const VERSION_KEY = "scriptor_versions";
const THEME_KEY = "scriptor_theme";

// --- Draft Management ---

export function saveDraft(draft) {
  localStorage.setItem(DRAFT_KEY, JSON.stringify(draft));
}

export function loadDraft() {
  const raw = localStorage.getItem(DRAFT_KEY);
  return raw ? JSON.parse(raw) : null;
}

export function clearDraft() {
  localStorage.removeItem(DRAFT_KEY);
}

// --- Versioning ---

export function saveVersion(note) {
  const versions = JSON.parse(localStorage.getItem(VERSION_KEY) || "[]");
  versions.unshift({
    ...note,
    savedAt: new Date().toISOString()
  });
  localStorage.setItem(VERSION_KEY, JSON.stringify(versions));
}

export function loadVersions() {
  return JSON.parse(localStorage.getItem(VERSION_KEY) || "[]");
}

export function clearVersions() {
  localStorage.removeItem(VERSION_KEY);
}

// --- Theme (optional) ---

export function saveTheme(theme) {
  localStorage.setItem(THEME_KEY, theme);
}

export function loadTheme() {
  return localStorage.getItem(THEME_KEY) || "light";
}