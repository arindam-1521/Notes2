console.log("Notes app")
showNotes();

//If user adds a note add it to the local storage;
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", btnsave)

function btnsave() {
    let addTxt = document.getElementById("addTxt")
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ""
    console.log(notesObj);
    showNotes()
}
//function to show elements from local storage.
function showNotes() {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    let html = ""
    notesObj.forEach(function(element, index) {
        html += `<div class="noteCard my-2 mx-2 card" style="width: 18rem;">
        <div class="card-body">
            <h5 class="card-title">Note ${index+1}</h5>
            <p class="card-text">${element}</p>
            <button id = ${index} onclick = deleteNote(this.id) class="btn btn-primary">Delete Note</button>
        </div>
    </div>`
    });
    let notesElm = document.getElementById('notes')
    if (notesObj.length != 0) {
        notesElm.innerHTML = html
    } else {
        notesElm.innerHTML = `<h2>Use it to Write Notes😁😁</h2>`
    }
}


//Function to delete a note from the local storage

function deleteNote(index) {
    console.log("I am deleting", index)
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = [];
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes();
}

let search = document.getElementById("searchTxt");
search.addEventListener("input", function(e) {
    // console.log("Input Event fired");
    let inputVal = search.value.toLowerCase();
    let noteCards = document.getElementsByClassName("noteCard");
    Array.from(noteCards).forEach(function(element) {
        let cardTxt = element.getElementsByTagName("p")[0].innerText;
        // console.log(cardTxt);
        if (cardTxt.includes(inputVal)) {
            element.style.display = "block";
        } else {
            element.style.display = "none";
        }
    })
})