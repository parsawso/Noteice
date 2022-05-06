const burgerMenuIcon = document.querySelector("burger-menu-icon");
const sidebar = document.querySelector("sidebar");

let sidebarOpen = false;

function toggleSidebar(){
    if (!sidebarOpen) {
        sidebarOpen = true;
        sidebar.style.right = "15%";
    }
    else {
        sidebarOpen = false;
        sidebar.style.right = "100%";
    }
}

burgerMenuIcon.addEventListener("click",()=>toggleSidebar);