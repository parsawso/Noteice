const sidebar = document.getElementById('sidebar');
const sidebarHeader = document.getElementById('sidebar-header');

sidebar.style.left = '-40rem';
sidebar.style.boxShadow = 'none';

function openSidebar() {
    sidebar.style.left = '0';
    sidebar.style.boxShadow = '0 0 100rem black';
}

function closeSidebar() {
    sidebar.style.left = '-40rem';
    sidebar.style.boxShadow = 'none';
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