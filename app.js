// Define Values
const brightnessGlass = document.querySelector(".brightness-glass");
const sidebarButton = document.querySelector(".burger-menu-icon");
const sidebar = document.querySelector("#sidebar");
const addNotesSection = document.querySelector("#add-notes-section");
const addNoteButton = document.querySelector("#add-note-button");
const submitNoteBTN = document.querySelector(".submit-note-btn");
const cardsSection = document.querySelector(".cards-section");
const card = document.querySelector(".card");
const addCategoryBTN = document.querySelector(".add-category-btn");
const addCategorySection = document.querySelector(".add-category-section");
const categoriesSection = document.querySelector(".categories");
const caret = document.querySelector(".caret");
const menuCategoriesDropdown = document.querySelector(".menu_categories-dropdown");
const selectCategoriesDropdown = document.querySelector(".select_categories-dropdown");
const selectedCategoriesDropdown = document.querySelector(".selected_categories-dropdown");
const dropdownItems = menuCategoriesDropdown.getElementsByTagName("li");

// Default Values
addNotesSection.style.top = "-60rem";
sidebar.style.left = "-50rem";
brightnessGlass.style.display = "none";
sidebar.style.boxShadow = "1rem 0 1rem var(--shadow-color)"
let dropdownIsClose = true;

// sidebar action
function openSidebar() {
  sidebar.style.left = "0";
  sidebar.style.boxShadow = "none"
  brightnessGlass.style.display = "block";
  addNoteButton.style.bottom = "-10rem";
}

function closeSidebar() {
  sidebar.style.left = "-50rem";
  sidebar.style.boxShadow = "1rem 0 1rem var(--shadow-color)"
  brightnessGlass.style.display = "none";
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
  brightnessGlass.style.display = "block";
  addNoteButton.style.bottom = "-10rem";
  document.querySelector(".header-field").focus();
}

function closeAddNotes() {
  addNotesSection.style.top = "-60rem";
  brightnessGlass.style.display = "none";
  addNoteButton.style.bottom = "3rem";
  caret.style.transform = "rotate(90deg)";
  menuCategoriesDropdown.style.display = "none";
  selectedCategoriesDropdown.innerText = "Select Category";
  selectedCategoriesDropdown.style.opacity = "30%";
  dropdownIsClose = true;
}

// add note card
function submitNote() {
  if (document.querySelector(".header-field").value==="" || document.querySelector(".body-field").value==="" || selectedCategoriesDropdown.innerText === "Select Category") {
    alert("Please fill all the fields");
    return;
  }
  
  const noteHeader = document.querySelector(".header-field").value;
  document.querySelector(".header-field").value = null;
  
  const noteBody = document.querySelector(".body-field").value;
  document.querySelector(".body-field").value = null;

  const cardCategoryName = selectedCategoriesDropdown.innerText;
  selectedCategoriesDropdown.innerText = "Select Category";
  selectedCategoriesDropdown.style.opacity = "30%";

  cardsSection.innerHTML += (`<div class="card">
  <section class="card-header">${noteHeader}</section>
  <section class="card-body">${noteBody}
  </section>
  <section class="card-footer">
    <i class="fa-solid fa-trash fa-2x delete-icon"></i>
    <section class="card-category">${cardCategoryName}</section>
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
    //remove category from categories dropdown menu
    const categoryName = e.target.parentElement.innerText;
    for(var counter=0 ; counter<dropdownItems.length ; ++counter) {
      if (dropdownItems[counter].innerText === categoryName) {
        dropdownItems[counter].remove();
      }
    }
    //
    e.target.parentElement.remove();
  }
})

//open and close dropdown menu
selectCategoriesDropdown.addEventListener("click",()=> {
  if(dropdownIsClose == true && categories.length !== 0) {
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
    selectedCategoriesDropdown.style.opacity = "100%";
    caret.style.transform = "rotate(90deg)";
    menuCategoriesDropdown.style.display = "none";
    dropdownIsClose = true;
  }
})