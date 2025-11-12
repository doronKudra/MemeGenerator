'use strict'

function renderGallery(){
    document.querySelector('.editor-tab').classList.add('hidden')
    document.querySelector('.gallery-tab').classList.remove('hidden')
}

function onImgSelect(id){
    setImg(id)
    clearInputs()
    renderMeme()
}

function loadGallery(){
    const elGallery = document.querySelector('.gallery-tab')
    elGallery.innerHTML = ''
    const imgs = getImages()
    for(var i = 1; i < imgs.length-1; i++){
        elGallery.innerHTML += `<img class="gallery-img" onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }
}