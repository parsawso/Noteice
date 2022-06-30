// +++++++++++++++++++++++++ DEFINE VALUES +++++++++++++++++++++++++++++++++++++++ //
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
const visibleCategory = document.querySelector(".visible-category");
const CategoriesItems = categoriesSection.getElementsByTagName("li");
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

// ++++++++++++++++++++++++++ DEFAULT VALUES +++++++++++++++++++++++++++++++++++++ //
  //select all categories when the app opens for the very first time
  if (localStorage.getItem("selectedCategory") == null){
    localStorage.setItem("selectedCategory","All Categories");
  }
  //close add notes section
  addNotesSection.style.top = "-60rem";
  //close brightness glass
  brightnessGlass.style.display = "none";
  //dropdown is close
  let dropdownIsClose = true;
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

// ++++++++++++++++++++++++++++++ RENDER +++++++++++++++++++++++++++++++++++++++++ //
  // categories
    let categories = JSON.parse(localStorage.getItem("categories") || "[]");
    let newLiForDropdown;
    categories.forEach((item) => {
      //sidebar
      categoriesSection.innerHTML += (`<li>
      <i class="fa-solid fa-trash delete-icon"></i>${item}</li>`);
      //dropdown
      newLiForDropdown = document.createElement('li');
      newLiForDropdown.innerText = item;
      menuCategoriesDropdown.appendChild(newLiForDropdown);
    })
  // cards
    visibleCategory.innerText = localStorage.getItem("selectedCategory");
    let cards = JSON.parse(localStorage.getItem("cards") || "[]");
    //sort note cards from latest
    cards = sortByDate(cards);
    //print cards
    cards.forEach((item) => {
      if (visibleCategory.innerText == item.cardCategoryName || visibleCategory.innerText === "All Categories"){
        cardsSection.innerHTML += (`<div class="card" id="${item.cardID}">
        <section class="card-header">${item.cardHeader}</section>
        <section class="card-body">${item.cardBody}
        </section>
        <section class="card-footer">
          <i class="fa-solid fa-trash fa-2x delete-icon"></i>
          <div class="card-time">${item.cardTime}</div>
          <section class="card-category">${item.cardCategoryName}</section>
        </section>
        </div>`);
      }
    })
  // change selected category background
    for(var counter=0 ; counter<CategoriesItems.length ; counter++) {
      if (CategoriesItems[counter].innerText === visibleCategory.innerText) {
        CategoriesItems[counter].style.backgroundColor = "var(--secondary-color)";
      }
    }
// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //

// ++++++++++++++++++++++++++++ FUNCTIONALITIES ++++++++++++++++++++++++++++++++++ //
// FUNCTION: open and close sidebar
function openSidebar() {
  sidebar.style.left = "0";
  brightnessGlass.style.display = "block";
  addNoteButton.style.bottom = "-10rem";
  sidebar.style.width = "90%";
}
function closeSidebar() {
  sidebar.style.left = "-50rem";
  brightnessGlass.style.display = "none";
  addNoteButton.style.bottom = "3rem";
  sidebar.style.width = "50%";
}

// sticky top bar when scroll up
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

// FUNCTION: Open and close add notes section
function openAddNotes() {
  addNotesSection.style.top = "2rem";
  brightnessGlass.style.display = "block";
  addNoteButton.style.bottom = "-10rem";
  document.querySelector(".header-field").focus();
  //select the filtered category from dropdown menu
  if (visibleCategory.innerText === "All Categories") {
    selectedCategoriesDropdown.innerText = "Select Category";
    selectedCategoriesDropdown.style.opacity = "30%";
  }
  else {
    selectedCategoriesDropdown.innerText = visibleCategory.innerText;
    selectedCategoriesDropdown.style.opacity = "100%";
  }
}
function closeAddNotes() {
  addNotesSection.style.top = "-60rem";
  brightnessGlass.style.display = "none";
  addNoteButton.style.bottom = "3rem";
  //close dropdown
  caret.style.transform = "rotate(90deg)";
  menuCategoriesDropdown.style.display = "none";
  selectedCategoriesDropdown.innerText = "Select Category";
  selectedCategoriesDropdown.style.opacity = "30%";
  //
  dropdownIsClose = true;
}

// FUNCTION: add note card
function submitNote() {
  //ALERT: empty fields
  if (document.querySelector(".header-field").value==="" || document.querySelector(".body-field").value==="" || selectedCategoriesDropdown.innerText === "Select Category") {
    alert("Please fill all the fields");
    return;
  }
  //get header
  const cardHeader = document.querySelector(".header-field").value;
  document.querySelector(".header-field").value = null;
  //get body
  const cardBody = document.querySelector(".body-field").value;
  document.querySelector(".body-field").value = null;
  //get category
  const cardCategoryName = selectedCategoriesDropdown.innerText;
  selectedCategoriesDropdown.innerText = "Select Category";
  selectedCategoriesDropdown.style.opacity = "30%";
  //get time
  const cardTime = nowTime();
  //get card ID
  const cardID = createCardID();
  //add card to local storage
  const card = {
    cardHeader: cardHeader,
    cardBody: cardBody,
    cardTime: cardTime,
    cardCategoryName: cardCategoryName,
    cardID: cardID
  };
  cards.push(card);
  localStorage.setItem("cards",JSON.stringify(cards));
  location.reload();
  closeAddNotes();
}

// remove note card
cardsSection.addEventListener("click" , (e) => {
  //remove card from cards array
  if (e.target.classList[1] === "fa-trash") {
    cards.forEach((item) => {
      if(e.target.parentElement.parentElement.id == item.cardID){
        cards.splice(cards.indexOf(item),1);
      }
    })
    //remove card from local storage
    localStorage.setItem("cards",JSON.stringify(cards));
    //remove card from cards section
    e.target.parentElement.parentElement.remove();
  }
})

// FUNCTION: add category
function submitCategory() {
  //ALERT: emptiness
  if (document.querySelector(".add-category-field").value==="" || document.querySelector(".add-category-field").value===null) {
    alert("Please write a category name.");
    return;
  }
  //ALERT: duplicating categories
  const categoryName = document.querySelector(".add-category-field").value;
  for (let item of categories) {
    if(categoryName === item){
      document.querySelector(".add-category-field").value = null;
      alert(`A category named ${categoryName} already exists. Please select another name.`);
      return;
    }
  }
  //add category to sidebar
  categoriesSection.innerHTML += (`<li>
  <i class="fa-solid fa-trash delete-icon"></i>${categoryName}</li>`);
  categories.push(categoryName);
  //add category to local storage
  localStorage.setItem("categories",JSON.stringify(categories));
  //add category to dropdown menu
  newLiForDropdown = document.createElement('li');
  newLiForDropdown.innerText = categoryName;
  menuCategoriesDropdown.appendChild(newLiForDropdown);
  //emptying field
  document.querySelector(".add-category-field").value = null;
}

// add category by pressing enter
document.onkeydown = function(){
  if(window.event.keyCode=="13" && document.activeElement === document.querySelector(".add-category-field")){
    submitCategory();
  }
  if(window.event.keyCode=="13" && document.activeElement === document.querySelector(".field")){
    submitNote();
  }
}

// remove category
categoriesSection.addEventListener("click" , (e) => {
  if (e.target.classList[1] === "fa-trash") {
    if (confirm(`Deleting this category will also delete ALL ITS CARDS!

Are you sure you want to delete this category?`) == true) {
      //remove all cards
      cards.forEach((item) => {
        if(e.target.parentElement.innerText == item.cardCategoryName){
          cards.splice(cards.indexOf(item),1);
        }
      })
      localStorage.setItem("cards",JSON.stringify(cards));
      //remove category from categories array
      categories.forEach((item) => {
        if(e.target.parentElement.innerText === item){
          categories.splice(categories.indexOf(item),1);
        }
      })
      //remove category from local storage
      localStorage.setItem("categories",JSON.stringify(categories));
      //remove category from categories dropdown menu
      const categoryName = e.target.parentElement.innerText;
      for(var counter=0 ; counter<dropdownItems.length ; ++counter) {
        if (dropdownItems[counter].innerText === categoryName) {
          dropdownItems[counter].remove();
        }
      }
      //remove category from sidebar
      e.target.parentElement.remove();
      location.reload();
    }
  }
})

// open and close dropdown menu
selectCategoriesDropdown.addEventListener("click",()=> {
  //open dropdown
  if(dropdownIsClose == true && categories.length !== 0) {
    caret.style.transform = "rotate(0deg)";
    menuCategoriesDropdown.style.display = "flex";
    dropdownIsClose = false;
  }
  //close dropdown
  else if(dropdownIsClose == false) {
    caret.style.transform = "rotate(90deg)";
    menuCategoriesDropdown.style.display = "none";
    dropdownIsClose = true;
  }
})

// select from categories in the dropdown
menuCategoriesDropdown.addEventListener("click",(e) => {
  if(e.target.nodeName === "LI") {
    selectedCategoriesDropdown.innerText = e.target.innerText;
    selectedCategoriesDropdown.style.opacity = "100%";
    //close dropdown
    caret.style.transform = "rotate(90deg)";
    menuCategoriesDropdown.style.display = "none";
    //
    dropdownIsClose = true;
  }
})

// FUNCTION: get now time
function nowTime() {
  const now = new Date();
  let nowString = "";
  nowString = now.toDateString() + " " + now.getHours() + ":" + now.getMinutes();
  nowString = nowString.substring(4);
  return nowString;
}

// FUNCTION: create card ID
let idHistory = JSON.parse(localStorage.getItem("idHistory") || "[]");
function createCardID() {
  let idNum;
  do {
    idNum = Math.floor(Math.random()*10000000000);
  } while (idHistory.includes(idNum))
  idHistory.push(idNum);
  localStorage.setItem("idHistory" , JSON.stringify(idHistory));
  return idNum;
}

// filter cards
categoriesSection.addEventListener("click" , (e) => {
  if (e.target.nodeName === "LI" && e.target.classList[1] !== "fa-trash") {
    localStorage.setItem("selectedCategory",e.target.innerText);
    location.reload();
    }
})

// FUNCTION: media queries
function mediaQueries(minWidthLaptop) {
  if (minWidthLaptop.matches) {
    sidebar.style.left = "0";
    sidebar.style.width = "100%";
    brightnessGlass.style.display = "none";
  }
}

var minWidthLaptop = window.matchMedia("(min-width: 990px)")
mediaQueries(minWidthLaptop);
minWidthLaptop.addListener(mediaQueries);

// FUNCTION: sort array by date
function sortByDate(array){
  return array.sort((a,b)=>{
    return new Date(a.cardTime) > new Date(b.cardTime) ? -1 : 1;
  })
}

// +++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++ //