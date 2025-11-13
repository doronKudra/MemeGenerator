'use strict'

var gElCanvas
var gCtx
var gIsDrag = false

function onResize() {

}

function onDown(event) {
    gIsDrag = true
}

function onUp(event) {
    gIsDrag = false
    const { offsetX, offsetY } = event
    const lines = getMeme().lines
    for(var i = lines.length-1;i>=0;i--){
        const leftBorder = lines[i].metrics.x - (lines[i].metrics.width / 2) + 5
        const rightBorder = lines[i].metrics.x + (lines[i].metrics.width / 2) - 5
        const topBorder = lines[i].metrics.y + (lines[i].metrics.height / 2) + 5
        const botBorder = lines[i].metrics.y - (lines[i].metrics.height / 2) - 5
        if(leftBorder < offsetX && rightBorder > offsetX
            && topBorder > offsetY && botBorder < offsetY){
                setLineIdx(i)
                renderMeme()
                renderInputs()
                return
            }
    }
    return
}

function onDrag(event) {
    if(!gIsDrag) return
}

function onAlignText(side){
    // y same x change
    setLineCoords(x,y)
}

function onTextChange(elTxt) {
    setLineTxt(elTxt.value)
    renderMeme()
}

function onColorPicked(elColor) {
    const value = elColor.value
    setColor(value)
    renderMeme()
}

function onIncrementSize(value) {
    setSize(value)
    renderMeme()
}

function onChangeFont(elSelect){
    setFont(elSelect.value)
    renderMeme()
}

function onAddText() {
    addText()
    clearInputs()
    renderMeme()
}

function onDeleteText() {
    removeText()
    renderInputs()
    renderMeme()
}

function onNextText() {
    nextText()
    renderInputs()
    renderMeme()
}

function renderInputs() {
    const line = getLine()
    if (!line) {
        clearInputs()
        return
    }
    document.querySelector('.text-input').value = line.txt
    document.querySelector('.color-picker').value = line.color
    document.querySelector('.select-font').value = line.font
    // add font
}

function renderMeme() {
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

function onImageReady(img) {
    const { width, height } = getCanvasSize()
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
        gCtx.font = line.size + 'px ' + line.font
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        var { width, height } = getCanvasSize()
        const textMetrics = gCtx.measureText(line.txt)
        if (!line.metrics) {
            if (idx === 0) {
                height = height / 16
            }
            else if (idx === 1) {
                height = height * 15 / 16
            }
            else {
                height = height / 2
            }
            width = width / 2
            const newMetrics = {
                x: width,
                y: height ,
                width: textMetrics.width,
                height: textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent
            }
            setLineMetrics(idx, newMetrics)
        }
        else{
            const newMetrics = {
                x: line.metrics.x,
                y: line.metrics.y ,
                width: textMetrics.width,
                height: textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent
            }
            setLineMetrics(idx, newMetrics)
        }
        
        gCtx.fillText(line.txt, line.metrics.x, line.metrics.y)
        gCtx.strokeText(line.txt, line.metrics.x, line.metrics.y)
        if (idx === getLineIdx()) {
            const rect = {
                x: line.metrics.x - textMetrics.actualBoundingBoxLeft - 5,
                y: line.metrics.y - textMetrics.actualBoundingBoxAscent - 5,
                width: textMetrics.width + 10,
                height: textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent + 10
            }
            drawRect(rect)
        }
    })
}


function drawRect({ x, y, width, height }) {
    gCtx.strokeStyle = 'red'
    gCtx.strokeRect(x, y, width, height)
    //   gCtx.fillStyle = ''
    //   gCtx.fillRect(x, y, 120, 120)
}


function getCanvasSize() {
    const { width, height } = gElCanvas
    return { width, height }
}

function clearInputs() {
    document.querySelector('.color-picker').value = '#ffffff'
    document.querySelector('.select-font').value = 'impact'
    document.querySelector('.text-input').value = ''
}

function onDownloadMeme(elLink) { // fix download showing edit box
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onShareMeme(elLink) {

}