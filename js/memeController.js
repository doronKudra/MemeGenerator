'use strict'

var gElCanvas
var gCtx

function onResize(){

}

function onDown(event){

}

function onUp(event){

}

function onDrag(event){

}

function onTextChange(elTxt){
    setLineTxt(elTxt.value)
    renderMeme()
}


function onShareCanvas(elLink){

}

function onDownloadCanvas(elLink){

}

function renderMeme(){
    setCanvas()
    const meme = getMeme()
    const img = new Image()
    console.log(getImgbyID(meme.selectedImgId))
    const imgSrc = getImgbyID(meme.selectedImgId).url
    img.onload = () => {
        onImageReady(img)
        drawText()
    }
    img.src = imgSrc
}

function onImageReady(img){
    const {width, height} = getCanvasSize()
    gCtx.drawImage(img, 0, 0, width, height)
}

function setCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
}

function drawText() {
    const lines = getMeme().lines
    lines.every((line, idx) => {
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px IMPACT'
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        var { width, height } = getCanvasSize()
        if(idx === 0){
            height = height / 8
        }
        else if(idx === 1){
            height = height*15 / 8
        }
        gCtx.fillText(line.txt, width / 2, height / 2)
        gCtx.strokeText(line.txt, width / 2, height / 2)
    })
}

function getCanvasSize() {
    const { width, height } = gElCanvas
    return { width, height }
}
