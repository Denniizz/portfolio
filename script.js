const themeBtn = document.getElementById("themeBtn");

themeBtn.addEventListener("click", () => {
    document.body.classList.toggle("dark");
});


const heroBtn = document.getElementById('heroBtn');

heroBtn.addEventListener('click', () => {
    alert('Projects section coming soon!');
});


const openNotes = document.getElementById("openNotes");
const notesModal = document.getElementById("notesModal");
const closeNotes = document.getElementById("closeNotes");

openNotes.addEventListener("click", () => {
    notesModal.style.display = "flex";
});

closeNotes.addEventListener("click", () => {
    notesModal.style.display = "none";
});