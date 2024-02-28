'use strict'


let gElCanvas
let gCtx

const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    // resizeCanvas()
    // window.addEventListener('resize', () => resizeCanvas())
}


function onSetLineTxt(text) {

    setLineTxt(text)

    renderMeme()
}



function renderMeme() {

    // const memeImg = getMemesImgs()
    const memeImg = getCurrSelectImg()
    const memeText = getMemesText()

    var selectedImgId = memeText.selectedImgId

    var selectedLineIdx = memeText.selectedLineIdx
    var selectedLine = memeText.lines[selectedLineIdx]


    // const selectedImg = memeImg.find(img => img.id === selectedImgId)

    var { id, url, keywords } = memeImg

    drawImg(memeImg, selectedLine)
    // renderText(selectedLine)

}





function renderText(selectedLine) {
    gCtx.fillStyle = selectedLine.color
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
        coverCanvasWithImg(img)
        renderText(selectedLine)
    }
}

function coverCanvasWithImg(elImg) {
    gElCanvas.height = (elImg.naturalHeight / elImg.naturalWidth) * gElCanvas.width
    gCtx.drawImage(elImg, 0, 0, gElCanvas.width, gElCanvas.height)
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', resizeCanvas)


    // const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
}

function addMouseListeners() {
    // gElCanvas.addEventListener('mousedown', onDown)
    // gElCanvas.addEventListener('mousemove', onMove)
    // gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    // gElCanvas.addEventListener('touchstart', onDown)
    // gElCanvas.addEventListener('touchmove', onMove)
    // gElCanvas.addEventListener('touchend', onUp)
}

function resizeCanvas() {
    const elContainer = document.querySelector('.canvas-container')

    gElCanvas.width = elContainer.offsetWidth
    gElCanvas.height = elContainer.offsetHeight
    renderMeme()
    console.log(gElCanvas.width);
}

function getEvPos(ev) {
    let pos = {
        x: ev.offsetX,
        y: ev.offsetY,
    }

    if (TOUCH_EVENTS.includes(ev.type)) {

        ev.preventDefault()
        ev = ev.changedTouches[0]


        pos = {
            x: ev.pageX - gElCanvas.offsetLeft,
            y: ev.pageY - gElCanvas.offsetTop,
        }
    }
    return pos
}