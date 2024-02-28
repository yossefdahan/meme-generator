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

function onChangeColor(color) {
    console.log(color);
    setFontColor(color)
    renderMeme()
}

function onMoveToGallery() {
    document.querySelector('.gallery-container').style.display = 'block'
    document.querySelector('.editor-container').style.display = 'none'

}

function renderMeme() {
    const memeImg = getCurrSelectImg()
    const currMeme = getMemesText()




    var selectedImgId = currMeme.selectedImgId

    var selectedLineIdx = currMeme.selectedLineIdx
    var selectedLine = currMeme.lines[selectedLineIdx]

    drawImg(memeImg, currMeme)
    // var { id, url, keywords } = memeImg
}

function onAddLine() {
    createNewLine()
    renderMeme()
}

function onChangeSizeUp() {
    var currSize = getMemesText()
    var newSize = currSize.lines[gMeme.selectedLineIdx].size += 1
    changeSizeUp(newSize)
    renderMeme()
}

function onChangeSizeDown() {
    var currSize = getMemesText()
    var newSize = currSize.lines[gMeme.selectedLineIdx].size -= 1
    changeSizeUp(newSize)
    renderMeme()
}

function renderText(currMeme) {
    var selectedLineIdx = currMeme.selectedLineIdx
    var selectedLine = currMeme.lines[selectedLineIdx]

    console.log(selectedLine);
    console.log(currMeme);
    var spaces = 0
    currMeme.lines.forEach(line => {
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px Arial'
        gCtx.textAlign = 'center'
        gCtx.fillText(line.txt, (gElCanvas.width / 2), (gElCanvas.height / 2) + spaces)

        spaces += 50
    })


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

function init() {
    gElCanvas = document.getElementById('my-canvas')
    gCtx = gElCanvas.getContext('2d')
}

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}