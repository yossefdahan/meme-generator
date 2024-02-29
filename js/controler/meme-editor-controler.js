'use strict'


let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']



function onInit() {
    onInitGallery()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    updateTextPos(center)

    addListeners()
    window.addEventListener('resize', resizeCanvas)

}



function renderMeme() {
    const memeImg = getCurrSelectImg()
    const currMeme = getMemesText()

    drawImg(memeImg, currMeme)
}



function renderText(currMeme) {


    // var selectedLineIdx = currMeme.selectedLineIdx
    // var selectedLine = currMeme.lines[currMeme.selectedLineIdx]
    document.querySelector('.txt-input').value = currMeme.lines[currMeme.selectedLineIdx].txt



    let textWidth
    let textHeight
    let textX
    let textY
    let curIdx
    currMeme.lines.forEach((line, idx) => {
        gCtx.beginPath()
        gCtx.lineWidth = 2
        gCtx.strokeStyle = `${line.stroke}`
        gCtx.fillStyle = `${line.color}`
        gCtx.font = `${line.size}px ${line.font}`
        gCtx.textAlign = `${line.align}`
        gCtx.textBaseline = 'middle'
        gCtx.strokeText(line.txt, line.pos.x, line.pos.y + (idx * 50))
        gCtx.fillText(line.txt, line.pos.x, line.pos.y + (idx * 50))
        gCtx.closePath()

        if (idx === currMeme.selectedLineIdx) {
            gCtx.beginPath()

            textWidth = gCtx.measureText(line.txt).width
            textHeight = line.size + 20

            textX = line.pos.x - textWidth / 2

            textY = line.pos.y + (idx * 50) - textHeight / 2
            console.log(line.pos.x, line.pos.y);
            gCtx.strokeStyle = 'black'

            gCtx.lineWidth = 1
            gCtx.strokeRect(textX, textY, textWidth, textHeight)
            gCtx.closePath()
        }
    })
    // console.log();
    // console.log();

    // getNewLinePos(textX, textY, textWidth, textHeight)
}

function drawRect(line, width, space) {
    const paddingX = 5
    const paddingY = 10
    const rectX = line.pos.x - paddingX - width
    const rectY = line.pos.y + space + paddingY
    const rectWidth = width + paddingX
    const rectHeight = space + paddingY
    gCtx.beginPath()
    gCtx.strokeStyle = 'black'
    gCtx.lineWidth = 2
    gCtx.strokeRect(rectX, rectY, rectWidth, rectHeight)
}

function onRemoveLine() {
    var currMeme = getMemesText()
    if (currMeme.lines.length === 0) return
    removeLine(currMeme)



    renderMeme()
}

function onAddLine() {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createNewLine(center)
    onSwitchLine()
    renderMeme()
    setFontColor('white')
    document.querySelector('.font-color').value = "#000000"

}

function onSwitchLine() {
    var memes = getMemesText()
    var currLine = memes.selectedLineIdx++
    document.querySelector('.txt-input').value = memes.lines[currLine].txt
    if (memes.selectedLineIdx >= memes.lines.length) {

        // console.log(memes.selectedLineIdx);
        document.querySelector('.font-color').value = memes.lines[currLine].color

        memes.selectedLineIdx = 0
    }


    renderMeme()
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
    document.querySelector('.editor-container').classList.add('hidden')
}

function onChangeSizeUp() {
    changeSizeUp()
    renderMeme()
}

function onChangeSizeDown() {
    changeSizeDown()
    renderMeme()
}

function onSetLinePosDown() {
    setLinePosDown()
    renderMeme()
}

function onSetLinePosUp() {
    setLinePosUp()
    renderMeme()
}

function onSetLinePosRight() {
    setLinePosRight()
    renderMeme()
}
function onSetLinePosLeft() {
    setLinePosLeft()
    renderMeme()
}


function onSetFontFamily(value) {

    setFontFamily(value)
    renderMeme()
}

function onSetAlignCenter() {
    const align = 'center'
    updateAlignToCenter(align)
    renderMeme()
}

function onSetAlignLeft() {
    const align = 'left'
    updateAlignToCenter(align)
    renderMeme()
}

function onSetAlignRight() {
    const align = 'right'
    updateAlignToCenter(align)
    renderMeme()
}

function drawImg(selectedImg, selectedLine) {
    const img = new Image()
    img.src = selectedImg.url
    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)

        renderText(selectedLine)
    }
}

function onClearCanvas() {
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', resizeCanvas)
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

    // gElCanvas.width = elContainer.offset.width
    // gElCanvas.height = elContainer.offset.height


    renderMeme()
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

function downloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg') // image/jpeg the default format
    elLink.href = imgContent
}

function onDown(ev) {

    gStartPos = getEvPos(ev)

    selectLineOnClick(ev)
    if (!isLineClicked(ev)) return
    // onSwitchLine()
    setLineDrag(true)
    document.body.style.cursor = 'grabbing'
    console.log('hi');



}

function onMove(ev) {
    const memes = getMemesText()
    const isDrag = memes.lines[gMeme.selectedLineIdx].isDrag
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    // Calc the delta, the diff we moved
    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}