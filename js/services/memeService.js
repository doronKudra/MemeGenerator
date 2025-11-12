'use strict'

var gImgs = [{ id: 1, url: 'img/1.jpg', keywords: ['trump', 'funny'] }, { id: 5, url: 'img/5.jpg', keywords: ['success', 'happy', 'baby'] }]
var gMeme = {
    selectedImgId: 5,
    selectedLineIdx: 0,
    lines: [
        {
            txt: 'I sometimes eat Falafel',
            size: 20,
            color: 'white'
        }
    ]
}

var gKeywordSearchCountMap = { 'funny': 12, 'happy': 16, 'baby': 2 }

function getImgbyID(id) {
    return gImgs.find((img) => img.id === id)
}

function setImg() {

}

function getMeme() {
    return gMeme
}

function setLineTxt(txt){
    gMeme.lines[gMeme.selectedLineIdx].txt = txt
}