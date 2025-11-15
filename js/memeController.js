'use strict'

var gElCanvas
var gCtx
var gIsDrag = false
var gElOverlayCanvas
var gCtxOverlay

function onMouseDown(event) {
    gIsDrag = true
}

function onMouseUp(event) {
    gIsDrag = false
    const { offsetX, offsetY } = event
    console.log(event)
    const lines = getMeme().lines
    for (var i = lines.length - 1; i >= 0; i--) {
        const leftBorder = lines[i].metrics.x - (lines[i].metrics.width / 2) + 5
        const rightBorder = lines[i].metrics.x + (lines[i].metrics.width / 2) - 5
        const topBorder = lines[i].metrics.y + (lines[i].metrics.height / 2) + 5
        const botBorder = lines[i].metrics.y - (lines[i].metrics.height / 2) - 5
        if (leftBorder < offsetX && rightBorder > offsetX
            && topBorder > offsetY && botBorder < offsetY) {
            setLineIdx(i)
            renderMeme()
            renderInputs()
            return
        }
    }
    return
}

function onMouseDrag(event) {
    if (!gIsDrag) return
}

function onAlignText(side) {
    wrapMemeText(side)
    renderMeme()
}

function wrapMemeText(side,idx = getLineIdx()) {
    const line = getLine(idx)
    if (!line) return
    const textMetrics = gCtx.measureText(line.txt)
    setLineAlignment((gElCanvas.width / 2) + ((gElCanvas.width / 2) * side), side * textMetrics.actualBoundingBoxLeft * -1 - (side * 7), side,idx)
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

function onChangeFont(elSelect) {
    setFont(elSelect.value)
    document.querySelector('.text-input').style.fontFamily = elSelect.value
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

function renderMeme(meme = getMeme(), isSaved,i) {
    console.log(meme)
    setCanvas()
    const img = new Image()
    const imgSrc = getImgbyID(meme.selectedImgId).url
    img.onload = () => {
        onImageReady(img)
        drawText(meme.lines)
        if(isSaved){
            const elSavedTab = document.querySelector('.saved-tab')
            const imgContent = gElCanvas.toDataURL('image/jpeg')
            elSavedTab.innerHTML += `<div>
            <img src="${imgContent}" onclick="onEditMeme(${i})"></img>
            <button style="display: flex; width: 200px" class="delete-btn fa-solid fa-trash" onclick="onDeleteMeme(${i})"></button>
            </div>`
            
        }
    }
    img.src = imgSrc
}

function onImageReady(img) {
    const { width, height } = getCanvasSize()
    gCtx.drawImage(img, 0, 0, width, height)
}

function setCanvas() {
    gElCanvas = document.querySelector('.main-canvas')
    gCtx = gElCanvas.getContext('2d')
    gElOverlayCanvas = document.querySelector('.overlay-canvas')
    gCtxOverlay = gElOverlayCanvas.getContext('2d')
    gCtxOverlay.canvas.width = 800;
}

function drawText(lines) {
    lines.forEach((line, idx) => {
        gCtx.lineWidth = 1
        gCtx.strokeStyle = 'black'
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px ' + line.font
        gCtx.textAlign = 'center'
        gCtx.textBaseline = 'middle'
        var { width, height } = getCanvasSize()
        const textMetrics = gCtx.measureText(line.txt)
        var newMetrics
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
            newMetrics = getMetricsObj(width, height, textMetrics.width, textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent)
            setLineMetrics(idx, newMetrics)
        }
        else {
            newMetrics = getMetricsObj(line.metrics.x, line.metrics.y, textMetrics.width, textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent)
            setLineMetrics(idx, newMetrics)
            wrapMemeText(line.side,idx)
        }

        gCtx.fillText(line.txt, line.metrics.x, line.metrics.y)
        gCtx.strokeText(line.txt, line.metrics.x, line.metrics.y)
        if (idx === getLineIdx()) {
            const rect = getMetricsObj(line.metrics.x - textMetrics.actualBoundingBoxLeft - 5,
                line.metrics.y - textMetrics.actualBoundingBoxAscent - 5, textMetrics.width + 10,
                textMetrics.actualBoundingBoxDescent + textMetrics.actualBoundingBoxAscent + 10)
            drawRect(rect)
        }
    })
}


function drawRect({ x, y, width, height }) {
    gCtxOverlay.fillStyle = ''
    gCtxOverlay.strokeStyle = 'red'
    gCtxOverlay.strokeRect(x, y, width, height)
}


function getCanvasSize() {
    const { width, height } = gElCanvas
    return { width, height }
}

function getMetricsObj(x, y, width, height) {
    return {
        x, y, width, height
    }
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

function onLoadMemes(){
    loadMemes()
    document.querySelector('.saved-tab').innerHTML = ''
    const savedMemes = getSavedMemes()
    if(!savedMemes || savedMemes.length === 0) {
        document.querySelector('.saved-tab').innerHTML = '<p>Nothing Saved :(</p>'
        return
    }
    for(var i = 0; i < savedMemes.length; i++){
        renderMeme(savedMemes[i],true,i)
    }
}

function onSaveMeme(){
    saveMeme()
}

function onEditMeme(idx){
    editMeme(idx)
    onEditor()
}

function onDeleteMeme(idx){
    deleteMeme(idx)
}