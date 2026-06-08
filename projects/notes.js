const heroBtn = document.getElementById('projectsBtn');
const contactBtn = document.getElementById("contactBtn");
const themeBtn = document.getElementById("themeBtn");

// Change theme light/dark
themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");

    if (document.body.classList.contains("dark")) {
        themeBtn.textContent = "☀️";
    } else {
        themeBtn.textContent = "🌙";
    }
});

function scrollDownIntoSection(targetId)
{
    const element = document.getElementById(targetId);

    if (element)
    {
        element.scrollIntoView({
            behavior: "smooth"
        });
    }
}

// Scrolls down to PROJECTS section
heroBtn.addEventListener("click", () => {
    scrollDownIntoSection("projects");
});

// Scrolls down to CONTACT section
contactBtn.addEventListener("click", () => {
    scrollDownIntoSection("contact");
});


import { setupModal } from "../modal.js";

setupModal("notesCard", "notesWindow", "notesCloseBtn")


const noteInput = document.getElementById("noteInput");
const addNoteBtn = document.getElementById("addNoteBtn");
const notesContainer = document.getElementById("notesContainer");

const warningMsg = document.getElementById("warningMsg")


let notes = JSON.parse(localStorage.getItem("notes")) || [];
let editingId = null;

function saveNotesToStorage()
{
    localStorage.setItem("notes", JSON.stringify(notes));
}

import { elements } from "../dom.js";

function createNoteElements(note)
{
    const time = elements("small", null, [
        elements("div", null, `Created: ${note.createdAt}`)
    ]);

    if (note.updatedAt) 
    {
        time.appendChild
        (
            elements("div", null, `Edited: ${note.updatedAt}`)
        );
    }

    const editBtn = elements("button", "btn editBtn", "Edit");
    editBtn.dataset.id = note.id;

    const deleteBtn = elements("button", "btn deleteBtn", "Delete");
    deleteBtn.dataset.id = note.id;

    const actions = elements("div", "note-actions", [
        time,
        editBtn,
        deleteBtn
    ]);

    return elements("div", "note", [
        elements("div", "note-text", note.text),
        actions
    ]);
}

function renderNotes() 
{
    notesContainer.innerHTML = "";

    if (notes.length === 0) {
        notesContainer.innerHTML = "<p>No notes yet 👀</p>";
        return;
    }

    notes.forEach(note => {
        notesContainer.appendChild(createNoteElements(note))
    });
}

// ADD/EDIT note
addNoteBtn.addEventListener("click", () => 
{
    const text = noteInput.value.trim();

    if (text.length < 2) 
    {
        showWarning("Note is too short!");
        return;
    }

    if (editingId !== null) 
    {
        notes = notes.map(note => {
            if (note.id === editingId) 
            {
                return {
                    ...note,  // Get's everything from the note
                    text: text,
                    updatedAt: new Date().toLocaleString()
                };
            }    
            return note;
        });

        editingId = null;
        addNoteBtn.textContent = "Add";
    }
    else {
        const newNote = {
            id: Date.now(),
            text: text,
            createdAt: new Date().toLocaleString(),
            updatedAt: null
        };

        notes.push(newNote);
    }

    saveNotesToStorage();
    renderNotes();

    noteInput.value = "";
    warningMsg.textContent = "";
});

// DELETE and Edit note
notesContainer.addEventListener("click", (e) => 
{
    if (e.target.classList.contains("deleteBtn")) 
    {
        const id = Number(e.target.dataset.id);

        notes = notes.filter(note => note.id !== id);

        saveNotesToStorage();
        renderNotes();
    }

    if (e.target.classList.contains("editBtn")) 
    {
        const id = Number(e.target.dataset.id);

        const note = notes.find(n => n.id === id);

        noteInput.value = note.text;

        editingId = id;

        addNoteBtn.textContent = "Update";
        openWindowModal();
    }
});

// INITIAL LOAD
renderNotes();

// Key support
noteInput.addEventListener("keydown", (e) => {
    if (e.key == "Enter"){
        addNoteBtn.click();
    }
});

function showWarning(msg) 
{
    warningMsg.textContent = msg;

    setTimeout(() => {
        warningMsg.textContent = "";
    }, 2000);
}
