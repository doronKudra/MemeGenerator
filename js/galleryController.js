'use strict'

function onImgSelect(id){
    setImg(id)
    clearInputs()
    onEditor()
}

function onRandomMeme(){
    setImg(getRandomInt(1,19))
    setLineTxt(randTextBuilder()) 
    setColor(getRandomColor())
    onEditor()
}

function loadGallery(){
    const elGallery = document.querySelector('.gallery-tab')
    const imgs = getImages()
    for(var i = 1; i <= imgs.length; i++){
        elGallery.innerHTML += `<img class="gallery-img num-${i}" onclick="onImgSelect(${i})" src="img/${i}.jpg">`
    }
}

function randTextBuilder(){
    const start = ['WHEN ','SOMETIMES ', 'EVERY TIME ', 'ME WHEN ']
    const center = ['TEACHER ', 'BRO ', 'MY NEIGHBOR ', 'MY BOSS ']
    const end = ['COMPLAINS', 'GENERATES RANDOM MEMES', 'IS JUST TOO MUCH', 'HAS SOMETHING TO SAY']
    return start[getRandomInt(0,4)] + center[getRandomInt(0,4)] + end[getRandomInt(0,4)]
}

function onSearch(elSearch){
    const search = elSearch.value
    var imgs = getImages()
    var filteredImgs = imgs.filter((img) => (img.keywords).filter((keyword) => keyword.includes(search)).length !== 0)
    console.log(filteredImgs)
    var elImgs = document.querySelectorAll('.gallery-img')
    elImgs.forEach((elImg) => elImg.classList.add('hidden'))
    filteredImgs.forEach((img) => {
        document.querySelector('.num-'+img.id).classList.remove('hidden')
    })
}