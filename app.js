// Define Values
const mainBody = document.querySelector("#main-body");
const sidebarButton = document.querySelector(".burger-menu-icon");
const sidebar = document.querySelector("#sidebar");
const addNotesSection = document.querySelector("#add-notes-section");
const addNoteButton = document.querySelector("#add-note-button");
const submitNoteBTN = document.querySelector(".submit-note-btn");
const cardsSection = document.querySelector(".cards-section");

// Default Values
mainBody.style.filter = "brightness(1)";
addNotesSection.style.top = "-50rem";
mainBody.style.height = "auto";
mainBody.style.overflow = "visible";
sidebar.style.left = "-40rem";

// sidebar action
function openSidebar() {
  sidebar.style.left = "0";
  mainBody.style.height = "100%";
  mainBody.style.overflow = "hidden";
  mainBody.style.filter = "brightness(0.5)"
}

function closeSidebar() {
  sidebar.style.left = "-40rem";
  mainBody.style.height = "auto";
  mainBody.style.overflow = "visible";
  mainBody.style.filter = "brightness(1)"
}

//top bar action
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("top-bar").style.top = "1rem";
  } else {
    document.getElementById("top-bar").style.top = "-6rem";
  }
  prevScrollpos = currentScrollPos;
};

// Open and close add notes
function openAddNotes() {
  addNotesSection.style.top = "2rem";
  mainBody.style.height = "100%";
  mainBody.style.overflow = "hidden";
  mainBody.style.filter = "brightness(0.5)"
  addNoteButton.style.bottom = "-10rem";
}

function closeAddNotes() {
  addNotesSection.style.top = "-50rem";
  mainBody.style.height = "auto";
  mainBody.style.overflow = "visible";
  mainBody.style.filter = "brightness(1)";
  addNoteButton.style.bottom = "3rem";
}

// collecting data from adding note form
submitNoteBTN.addEventListener("click",() => {
  if (document.querySelector(".header-field").value==="" || document.querySelector(".body-field").value==="") {
    alert("Please fill all the fields")
  }
  
  const noteHeader = document.querySelector(".header-field").value;
  document.querySelector(".header-field").value = null;
  
  const noteBody = document.querySelector(".body-field").value;
  document.querySelector(".body-field").value = null;

  cardsSection.innerHTML += (`<div class="card">
  <section class="card-header">${noteHeader}</section>
  <section class="card-body">${noteBody}
  </section>
  <section class="card-footer">
    <i class="fa-solid fa-trash fa-2x delete-icon"></i>
    <i class="fa-solid fa-pen fa-2x edit-icon"></i>
    <section class="card-category">Category</section>
  </section>
</div>`);

  closeAddNotes();
})