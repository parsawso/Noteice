const sidebar = document.getElementById('sidebar');
const sidebarHeader = document.getElementById('sidebar-header');

sidebar.style.width = '0';
sidebarHeader.style.opacity = '0';

function openSidebar() {
    sidebar.style.width = '90%';
    sidebarHeader.style.opacity = '1';
}

function closeSidebar() {
    sidebarHeader.style.opacity = '0';
    sidebar.style.width = '0';
}

let prevScrollpos = window.pageYOffset;
window.onscroll = function() {
  let currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("top-bar").style.top = "1rem";
  } else {
    document.getElementById("top-bar").style.top = "-6rem";
  }
  prevScrollpos = currentScrollPos;
}