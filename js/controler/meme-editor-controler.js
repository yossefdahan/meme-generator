'use strict'


var gElCanvas
let gCtx
let gStartPos
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    // resizeCanvas()
    // window.addEventListener('resize', () => resizeCanvas())
}

function onSetLineTxt(text) {

    setLineTxt(text)

    renderMeme()
}

function onChangeColor(color) {

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
    onSwitchLine()
    renderMeme()
    setFontColor('black')
    document.querySelector('.font-color').value = "#000000"

}

function onSwitchLine() {
    var memes = getMemesText()
    var currLine = memes.selectedLineIdx++
    document.querySelector('.txt-input').value = memes.lines[currLine].txt
    if (memes.selectedLineIdx >= memes.lines.length) {

        document.querySelector('.font-color').value = memes.lines[currLine].color

        memes.selectedLineIdx = 0
    }



    renderMeme()
}

function onChangeSizeUp() {
    changeSizeUp()
    renderMeme()
}

function onChangeSizeDown() {
    changeSizeDown()
    renderMeme()
}

function renderText(currMeme) {


    var selectedLineIdx = currMeme.selectedLineIdx
    var selectedLine = currMeme.lines[selectedLineIdx]
    document.querySelector('.txt-input').value = currMeme.lines[selectedLineIdx].txt



    currMeme.lines.forEach((line, idx) => {
        gCtx.fillStyle = line.color
        gCtx.font = line.size + 'px Arial'
        gCtx.textAlign = 'center'
        gCtx.fillText(line.txt, (gElCanvas.width / 2), (gElCanvas.height / 2) + (idx * 50))

        if (idx === currMeme.selectedLineIdx) {
            const textWidth = gCtx.measureText(line.txt + 20).width
            const textHeight = line.size + 30
            const textX = gElCanvas.width / 2 - textWidth / 2
            const textY = (gElCanvas.height / 2) + (idx * 50) - textHeight / 2

            gCtx.strokeStyle = 'black'
            gCtx.lineWidth = 2
            gCtx.strokeRect(textX, textY, textWidth, textHeight)

        }

    })

    renderMeme()
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
    gElCanvas.addEventListener('mousedown', onDown)
    gElCanvas.addEventListener('mousemove', onMove)
    gElCanvas.addEventListener('mouseup', onUp)
}

function addTouchListeners() {
    gElCanvas.addEventListener('touchstart', onDown)
    gElCanvas.addEventListener('touchmove', onMove)
    gElCanvas.addEventListener('touchend', onUp)
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
    console.log(pos);
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

function onDown(ev) {
    // console.log(ev);
    // gStartPos = getEvPos(ev)        // Get the ev pos from mouse or touch
    // if (!isCircleClicked(gStartPos)) return

    // setCircleDrag(true)
    //Save the pos we start from
    document.body.style.cursor = 'grabbing'
}

function onMove(ev) {
    // const { isDrag } = getCircle()
    // if (!isDrag) return

    // const pos = getEvPos(ev)
    // Calc the delta, the diff we moved
    // const dx = pos.x - gStartPos.x
    // const dy = pos.y - gStartPos.y
    // moveCircle(dx, dy)

    // Save the last pos, we remember where we`ve been and move accordingly
    // gStartPos = pos

    // The canvas is rendered again after every move
    // renderCanvas()
}

function onUp() {
    // setCircleDrag(false)
    document.body.style.cursor = 'grab'
}