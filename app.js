// Define Values
const mainBody = document.querySelector("#main-body");
const sidebarButton = document.querySelector(".burger-menu-icon");
const sidebar = document.querySelector("#sidebar");
const addNotesSection = document.querySelector("#add-notes-section");
const addNoteButton = document.querySelector("#add-note-button");

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