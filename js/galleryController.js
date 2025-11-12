'use strict'

function onImgSelect(id){
    setImg(id)
    clearInputs()
    onEditor()
}

function loadGallery(){
    const elGallery = document.querySelector('.gallery-tab')
    elGallery.innerHTML = ''
    const imgs = getImages()
    for(var i = 1; i <= imgs.length; i++){
        elGallery.innerHTML += `<img class="gallery-img" onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }
}