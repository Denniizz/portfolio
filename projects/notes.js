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

function createNoteElements(note)
{
    const noteEl = document.createElement("div");
    noteEl.classList.add("note");    // Adds a class="" to the div

    const text = document.createElement("div");
    text.classList.add("note-text"); // Adds a class="" to the div
    text.textContent = note.text;

    const time = document.createElement("small");

    let timeHTML = `Created: ${note.createdAt}`;

    if (note.updatedAt){
        timeHTML += `<br>Edited: ${note.updatedAt}`;
    }

    time.innerHTML = timeHTML;


    const editBtn = document.createElement("button");
    editBtn.classList.add("btn", "editBtn"); // Adds a class="" to the div
    editBtn.textContent = "Edit";
    editBtn.dataset.id = note.id;

    const btn = document.createElement("button");
    btn.classList.add("btn", "deleteBtn");   // Adds a class="" to the div
    btn.textContent = "Delete";
    btn.dataset.id = note.id;

    const editAndDelete = document.createElement("div");
    editAndDelete.classList.add("note-actions");

    editAndDelete.append(time, editBtn, btn);

    noteEl.append(text, editAndDelete);

    return noteEl;
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
