const noteContainer = document.getElementById("app");
const addNoteButton = noteContainer.querySelector(".add-note");


//We get the notes from the local browser that exist when the pages loads it fills the page with existing notes
getNotes().forEach(note => {
    const notesElement = createNoteElement(note.id, note.content);
    noteContainer.insertBefore(notesElement, addNoteButton);

});

addNoteButton.addEventListener("click", () => addNote());
//this function gets elements from the local storage using JSON
function getNotes() {
    return JSON.parse(localStorage.getItem("stickynotes-notes") || "[]");

}
//this function is to save the notes to the local browser
function saveNotes(notes) {

    localStorage.setItem("stickynotes-notes", JSON.stringify(notes));
}

//this function is to create the Note elements and add classes of the HTML
//Also Should the user change the content inside of a note it renders and update
//Should the user double clicks it renders an delete option
function createNoteElement(id, content) {

    const noteElement = document.createElement("textarea")

    noteElement.classList.add("note");
    noteElement.value = content;
    noteElement.placeholder = "Empty Sticky Note";

    noteElement.addEventListener("change", () => {
        updateNote(id, noteElement.value);
    });

    noteElement.addEventListener("dblclick", () => {
        const doDelete = confirm("Are you sure you wish to delete this sticky note?");

        if (doDelete) {
            deleteNote(id, noteElement)
        }

    })

    return noteElement;
}

//this function is to all the user to add a note to the local storage
function addNote() {

    const notes = getNotes()
    const noteObject = {
        id: Math.floor(Math.random() * 100000),
        content: "",
    }

    const noteElement = createNoteElement(noteObject.id, noteObject.content);
    noteContainer.insertBefore(noteElement, addNoteButton);

    notes.push(noteObject);
    saveNotes(notes);
}

function updateNote(id, newContent) {

    const notes = getNotes();
    const targetNote = notes.filter(note => note.id == id)[0];

    targetNote.content = newContent;
    saveNotes(notes);
}

function deleteNote(id, element) {
    const notes = getNotes().filter(note => note.id != id);

    saveNotes(notes);
    noteContainer.removeChild(element);
}