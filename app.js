// Define Values
const mainBody = document.querySelector("#main-body");
const sidebarButton = document.querySelector(".burger-menu-icon");
const sidebar = document.querySelector("#sidebar");
const addNotesSection = document.querySelector("#add-notes-section");
const addNoteButton = document.querySelector("#add-note-button");
const submitNoteBTN = document.querySelector(".submit-note-btn");
const cardsSection = document.querySelector(".cards-section");
const addCategoryBTN = document.querySelector(".add-category-btn");
const addCategorySection = document.querySelector(".add-category-section");
const categoriesSection = document.querySelector(".categories");
const caret = document.querySelector(".caret");
const menuCategoriesDropdown = document.querySelector(".menu_categories-dropdown");
const selectCategoriesDropdown = document.querySelector(".select_categories-dropdown");
const selectedCategoriesDropdown = document.querySelector(".selected_categories-dropdown");

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
  mainBody.style.filter = "brightness(0.5)";
  addNoteButton.style.bottom = "-10rem";
}

function closeSidebar() {
  sidebar.style.left = "-40rem";
  mainBody.style.height = "auto";
  mainBody.style.overflow = "visible";
  mainBody.style.filter = "brightness(1)";
  addNoteButton.style.bottom = "3rem";
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
  document.querySelector(".header-field").focus();
}

function closeAddNotes() {
  addNotesSection.style.top = "-50rem";
  mainBody.style.height = "auto";
  mainBody.style.overflow = "visible";
  mainBody.style.filter = "brightness(1)";
  addNoteButton.style.bottom = "3rem";
}

// add note card
function submitNote() {
  if (document.querySelector(".header-field").value==="" || document.querySelector(".body-field").value==="") {
    alert("Please fill all the fields");
    return;
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
    <section class="card-category">Category</section>
  </section>
  </div>`);

  closeAddNotes();
}

// add category
const categories = [];

function submitCategory() {
  if (document.querySelector(".add-category-field").value==="" || document.querySelector(".add-category-field").value===null) {
    alert("Please write a category name.");
    return;
  }
  const categoryName = document.querySelector(".add-category-field").value;
  for (let item of categories) {
    if(categoryName === item){
      document.querySelector(".add-category-field").value = null;
      alert(`A category named ${categoryName} already exists. Please select another name.`);
      return;
    }
  }
  categoriesSection.innerHTML += (`<li id="${categoryName}">
  <i class="fa-solid fa-trash delete-icon"></i>${categoryName}</li>`)
  categories.push(categoryName);
  //add category to dropdown menu
  const newLiForDropdown = document.createElement('li');
  newLiForDropdown.innerText = categoryName;
  menuCategoriesDropdown.appendChild(newLiForDropdown);
  //
  document.querySelector(".add-category-field").value = null;
}

// add category by pressing enter
document.onkeydown = function(){
  if(window.event.keyCode=="13" && document.activeElement === document.querySelector(".add-category-field")){
    submitCategory();
  }
}

//remove category
categoriesSection.addEventListener("click" , (e) => {
  if (e.target.classList[1] === "fa-trash") {
    categories.forEach((item) => {
      if(e.target.parentElement.id === item){
        categories.splice(categories.indexOf(item),1);
      }
    })
    e.target.parentElement.remove();
  }
})

//open and close dropdown menu
let dropdownIsClose = true;
selectCategoriesDropdown.addEventListener("click",()=> {
  if(dropdownIsClose == true) {
    caret.style.transform = "rotate(0deg)";
    menuCategoriesDropdown.style.display = "flex";
    dropdownIsClose = false;
  }
  else if(dropdownIsClose == false) {
    caret.style.transform = "rotate(90deg)";
    menuCategoriesDropdown.style.display = "none";
    dropdownIsClose = true;
  }
})

//select from categories in the dropdown
menuCategoriesDropdown.addEventListener("click",(e) => {
  if(e.target.nodeName === "LI") {
    selectedCategoriesDropdown.innerText = e.target.innerText;
    caret.style.transform = "rotate(90deg)";
    menuCategoriesDropdown.style.display = "none";
    dropdownIsClose = true;
  }
})