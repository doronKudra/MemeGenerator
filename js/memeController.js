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

function onColorPicked(elColor){
    const value = elColor.value
    setColor(value)
    renderMeme()
}

function onIncrementSize(value){
    setSize(value)
    renderMeme()
}

function onAddText(){
    addText()
    clearInputs()
    renderMeme()
}

function onDeleteText(){
    removeText()
    renderText()
    renderMeme()
}

function onNextText(){
    nextText()
    renderInputs()
    renderMeme()
}

function renderInputs(){
    const line = getLine()
    document.querySelector('.text-input').value = line.txt
    document.querySelector('.color-picker').value = line.color
    // add font
}

function renderMeme(){
    setCanvas()
    const meme = getMeme()
    const img = new Image()
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
    lines.forEach((line, idx) => {
        gCtx.lineWidth = 2
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

function clearInputs(){
    document.querySelector('.color-picker').value = '#ffffff'
    document.querySelector('.select-font').value = 'impact'
    document.querySelector('.text-input').value = ''
}

function onDownloadMeme(elLink){
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onShareMeme(elLink){

}