const sidebar = document.getElementById("sidebar");

sidebar.style.left = "-40rem";
sidebar.style.boxShadow = "none";

function openSidebar() {
  sidebar.style.left = "0";
  sidebar.style.boxShadow = "0 0 100rem black";
}

function closeSidebar() {
  sidebar.style.left = "-40rem";
  sidebar.style.boxShadow = "none";
}

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
const addNotesSection = document.getElementById("add-notes-section");

function openAddNotes() {
  addNotesSection.style.top = "2rem";
}