'use strict'

const NUM_IMAGES = 18
var gImgs = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            color: '#ffffff'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'happy': 16, 'baby': 2 }

function getImgbyID(id) {
    return gImgs.find((img) => img.id === id)
}

function setImg(id) {
    gMeme.selectedImgId = id
    gMeme.selectedLineIdx = 0
    gMeme.lines = [
        {
            txt: 'I sometimes eat Falafel',
            size: 40,
            color: '#ffffff'
        }
    ]
}

function getMeme() {
    return gMeme
}

function setLineTxt(txt){
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}

function loadImages(){
    for(var i = 1; i <= NUM_IMAGES; i++){
        gImgs.push({ id: i, url: `img/${i}.jpg`, keywords: ['trump', 'funny'] }) // TODO: implement keyword bank
    }
}

function getImages(){
    return gImgs
}

function setColor(color){
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setSize(diff){
    const newSize = gMeme.lines[gMeme.selectedLineIdx].size + diff
    if(newSize < 2 || newSize > 100) return
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}

function nextText(){
    if(!gMeme.lines.length) return
    gMeme.selectedLineIdx++
    gMeme.selectedLineIdx %= gMeme.lines.length
}

function addText(){
    gMeme.lines.push({
            txt: 'Your Text Here',
            size: 40,
            color: '#ffffff'
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeText(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    if(!gMeme.lines.length) return // if deleted last line we dont need to change selected line
    gMeme.selectedLineIdx--
}

function getLine(){
    return gMeme.lines[gMeme.selectedLineIdx]
}