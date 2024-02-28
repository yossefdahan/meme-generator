'use strict'


let gElCanvas
let gCtx

function onInit() {

    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    renderMeme()
}


function onSetLineTxt(text) {
    console.log(text);
    setLineTxt(text)

    renderMeme()
}



function renderMeme() {

    const memeImgs = getMemesImgs()
    const memeText = getMemesText()

    var selectedImgId = memeText.selectedImgId

    var selectedLineIdx = memeText.selectedLineIdx
    var selectedLine = memeText.lines[selectedLineIdx]

    const selectedImg = memeImgs.find(img => img.id === selectedImgId)
    var { id, url, keywords } = selectedImg

    drawImg(selectedImg, selectedLine)
    // renderText(selectedLine)
}





function renderText(selectedLine) {
    gCtx.fillStile = selectedLine.color
    gCtx.font = selectedLine.size + 'px Arial'
    gCtx.textAlign = 'center'
    gCtx.fillText(selectedLine.txt, gElCanvas.width / 2, gElCanvas.height / 2)
}

function drawImg(selectedImg, selectedLine) {
    const img = new Image()
    img.src = selectedImg.url
    // console.log(img);
    img.onload = () => {
        gCtx.drawImage(img, 0, 0, img.naturalWidth, img.naturalHeight)
        renderText(selectedLine)
    }
    coverCanvasWithImg(img)
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}