const sidebar = document.getElementById('sidebar');
sidebar.style.width = '0';

function openSidebar() {
    sidebar.style.width = '90%';
}

function closeSidebar() {
    sidebar.style.width = '0';
}