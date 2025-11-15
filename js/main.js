'use strict'

var gEditor = false

function onInit(){
    loadImages()
    loadGallery()

}

function toggleMenu() {
    document.body.classList.toggle('menu-open')
    const canvases = document.querySelectorAll('canvas')
    if(gEditor) document.querySelector('.editor-tab').classList.toggle('hidden')
    canvases.forEach((canvas) => {
        canvas.classList.toggle('hidden')
    })
}

function onGallery() {
    gEditor = false
    clearTabs()
    showTab('.gallery-tab')
}

function onAbout(){
    gEditor = false
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
    gEditor = true
    clearTabs()
    renderMeme()
    showTab('.editor-tab')
}

function onSaved(){
    gEditor = false
    clearTabs()
    onLoadMemes()
    showTab('.saved-tab')
}

function showTab(str){
    document.querySelector(str).classList.remove('hidden')
}