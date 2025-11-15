'use strict'

const NUM_IMAGES = 18
var gImgs = []
var gSavedMemes = []
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    isSaved: false,
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

var gCurrEditIdx

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
    var keywordBank = [['trump','funny','political'],['dog','cute'],['baby','dog','cute'],['cat','tired','sleep','cute'],['baby','success','happy'],['funny','history','explain','conspiracy'],['shocked','baby','sad','cute'],['explain','funny'],['evil','baby','cute'],['obama','laugh','funny','political'],['boxing','kissing'],['point','blame'],['cheers','success','drink','leonardo'],['matrix','morpheus'],['explain','funny'],['laugh','funny'],['putin','two','political'],['woody','toystory','sad']]
    for(var i = 1; i <= NUM_IMAGES; i++){
        gImgs.push({ id: i, url: `img/${i}.jpg`, keywords: keywordBank[i-1] }) // TODO: implement keyword bank
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

function saveMeme(){
    if(!gMeme.isSaved){ 
        gMeme.isSaved = true
        gSavedMemes.push(JSON.parse(JSON.stringify(gMeme)))
    }
    else gSavedMemes[gCurrEditIdx] = JSON.parse(JSON.stringify(gMeme))
    gMeme.isSaved = false
    saveToStorage('memes',gSavedMemes)
}

function loadMemes(){
    gSavedMemes = loadFromStorage('memes')
    if(!gSavedMemes) gSavedMemes = []
}

function deleteMeme(idx){
    gSavedMemes.splice(idx,1)
    saveToStorage('memes',gSavedMemes)
    onLoadMemes()
}

function editMeme(idx){
    gCurrEditIdx = idx
    gMeme = gSavedMemes[idx]
}

function getSavedMemes(){
    return gSavedMemes
}