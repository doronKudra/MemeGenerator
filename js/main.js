'use strict'

function onInit(){
    loadImages()
    loadGallery()
}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
}

function onGallery() {
    clearTabs()
    showTab('.gallery-tab')
}

function onAbout(){
    clearTabs()
    showTab('.about-tab')
}

function clearTabs(){
    const elTabs = document.querySelectorAll('.tab')
    elTabs.forEach(tab => {
        tab.classList.add('hidden')
    });
}

function onEditor(){
    clearTabs()
    renderMeme()
    showTab('.editor-tab')
}

function showTab(str){
    document.querySelector(str).classList.remove('hidden')
}