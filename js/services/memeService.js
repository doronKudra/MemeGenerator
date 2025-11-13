'use strict'

const NUM_IMAGES = 18
var gImgs = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'Your Text Here',
            size: 40,
            color: '#ffffff',
            font: 'impact',
            side: 0,
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
            txt: 'Your Text Here',
            size: 40,
            color: '#ffffff',
            font: 'impact',
            side: 0,
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
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function setSize(diff){
    if(!gMeme.lines.length) return
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
            color: '#ffffff',
            font: 'impact',
            side: 0,
    })
    gMeme.selectedLineIdx = gMeme.lines.length - 1
}

function removeText(){
    gMeme.lines.splice(gMeme.selectedLineIdx,1)
    if(!gMeme.lines.length) return // if deleted last line we dont need to change selected line
    if(gMeme.selectedLineIdx === 0) return
    gMeme.selectedLineIdx--
}

function getLine(idx = gMeme.selectedLineIdx){
    if(!gMeme.lines.length) return
    return gMeme.lines[idx]
}

function getLineIdx(){
    if(!gMeme.lines.length) return
    return gMeme.selectedLineIdx
}

function setLineMetrics(idx,metrics){
    if(!gMeme.lines.length) return
    gMeme.lines[idx].metrics = metrics
}

function setLineIdx(idx){
    if(!gMeme.lines.length) return
    gMeme.selectedLineIdx = idx
}

function setFont(font){
    if(!gMeme.lines.length) return
    gMeme.lines[gMeme.selectedLineIdx].font = font
}

function setLineAlignment(x,offset,side,idx=gMeme.selectedLineIdx){
    gMeme.lines[idx].side = side
    if(!gMeme.lines.length) return
    // if(!gMeme.lines[gMeme.selectedLineIdx].metrics) gMeme.lines[gMeme.selectedLineIdx].metrics = {x:x}
    gMeme.lines[idx].metrics.x = x + offset
}