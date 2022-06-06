console.log("Notes App");
showNotes()


//Add data to the local storage as user clicks the add note button.
let addBtn = document.getElementById("addBtn")
addBtn.addEventListener("click", btnSave)

function btnSave() {
    let addTxt = document.getElementById("addTxt")
    let notes = localStorage.getItem("notes")
    if (notes == null) { //notes is the key to localstorage
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.push(addTxt.value)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    addTxt.value = ""
    showNotes()
}

//For deleting all notes
let delBtn = document.getElementById("delBtn")
delBtn.addEventListener("click", btnDel)

function btnDel(e) {
    localStorage.clear()
    document.location.reload()
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
            <button id = ${index} onclick = delNotes(this.id) class="btn btn-outline-danger">Delete Note</button>
        </div>
    </div>`
    })
    let notesContainer = document.getElementById("notes")
    if (notesObj.length != 0) {
        notesContainer.innerHTML = html;
    } else {
        notesContainer.innerHTML = `<h2>Use it to keep your notes😀😀 </h2>`
    }
}

//function to delete the items from localstorage
function delNotes(index) {
    let notes = localStorage.getItem("notes")
    if (notes == null) {
        notesObj = []
    } else {
        notesObj = JSON.parse(notes)
    }
    notesObj.splice(index, 1)
    localStorage.setItem("notes", JSON.stringify(notesObj))
    showNotes()
}

//Search copied
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