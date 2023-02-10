const container = document.querySelector(".container");
const addBtn = document.querySelector("#btn");

addBtn.addEventListener('click',function(){
    addNote();
});
function saveNote(){
    const notes = document.querySelectorAll(".note textarea");
    console.log(notes);
    const data = [];
    notes.forEach((note)=>{
        data.push(note.value);
    })
    console.log(data);
    if(data.length === 0){
        localStorage.removeItem("notes");
    }
    else{
        localStorage.setItem("notes", JSON.stringify(data));
    }
}
function addNote(text = ""){
    const note = document.createElement("div");
    note.classList.add("note");
    note.innerHTML = `
    <div class="toolbar">
        <i class="save fa-solid fa-floppy-disk"></i>
        <i class="trash fa-solid fa-trash"></i>
    </div>
    <div class="note-area">
        <textarea class="note-write">${text}</textarea>
    </div>
    `;
    note.querySelector(".trash").addEventListener('click',function(){
        note.remove();
        saveNote();
    });
    note.querySelector(".save").addEventListener('click',function(){
        saveNote();
    });
    note.querySelector("textarea").addEventListener('focusout',function(){
        saveNote();
    });
    container.appendChild(note);
    saveNote();
}

function getItem(){
    const lsnotes = JSON.parse(localStorage.getItem("notes"));
    if(lsnotes === null){
        addNote();
    }
    else{
        lsnotes.forEach((note)=>{
            addNote(note);
        })
    }
}
getItem();