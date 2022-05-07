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