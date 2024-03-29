'use strict'

var gmemesFromStorage = []
let gElCanvas
let gCtx
let gStartPos
const TOUCH_EVENTS = ['touchstart', 'touchmove', 'touchend']



function onInitEditor() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    addListeners()
    window.addEventListener('resize', resizeCanvas())
    addKeyBoardListeners()
}

function renderMeme() {
    const currMeme = getMemes()
    const selectedImgId = currMeme.selectedImgId
    drawImg(selectedImgId, currMeme)
}

function renderText(currMeme) {
    document.querySelector('.txt-input').placeholder = currMeme.lines[currMeme.selectedLineIdx].txt

    currMeme.lines.forEach((line, idx) => {
        drawText(line)
        if (idx === currMeme.selectedLineIdx) {
            drawRect(line)
        }
    })
}

function drawImg(selectedImgId, selectedLine) {
    // console.log('hi1');
    // var loadedImgs = loadImageFromStorage()
    // console.log('hi2');
    // console.log(selectedImgId);
    // let imgData = loadedImgs[selectedImgId].url
    // console.log(imgData);
    const img = new Image()
    // img.src = loadedImgs.selectedImgId

    // if (imgData.url.startsWith('data:image/jpeg;base64,')) {
    // console.log('hi4');
    // img.src = imgData.url
    // } else {
    // console.log('hi5');
    img.src = `img/${selectedImgId}.jpg`
    // }

    img.onload = () => {
        gElCanvas.height = (img.naturalHeight / img.naturalWidth) * gElCanvas.width
        gCtx.drawImage(img, 0, 0, gElCanvas.width, gElCanvas.height)
        renderText(selectedLine)
    }
}

function drawText(line) {
    gCtx.beginPath()
    gCtx.lineWidth = 2
    gCtx.strokeStyle = `${line.stroke}`
    gCtx.fillStyle = `${line.color}`
    gCtx.font = `${line.size}px ${line.font}`
    gCtx.textAlign = `${line.align}`
    gCtx.textBaseline = 'middle'
    gCtx.strokeText(line.txt, line.pos.x, line.pos.y)
    gCtx.fillText(line.txt, line.pos.x, line.pos.y)
    gCtx.closePath()
}

function drawRect(line) {
    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size + 20
    const textX = line.pos.x - textWidth / 2
    const textY = line.pos.y - textHeight / 2

    if (line.align === 'right') {
        gCtx.beginPath()
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 1
        gCtx.strokeRect(textX - (textWidth / 2), textY, textWidth, textHeight)
        gCtx.closePath()
    } else if (line.align === 'left') {
        gCtx.beginPath()
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 1
        gCtx.strokeRect(textX + (textWidth / 2), textY, textWidth, textHeight)
        gCtx.closePath()
    } else {
        gCtx.beginPath()
        gCtx.strokeStyle = 'black'
        gCtx.lineWidth = 1
        gCtx.strokeRect(textX, textY, textWidth, textHeight)
        gCtx.closePath()
    }
}

function onRemoveLine() {
    var currMeme = getMemes()
    if (!currMeme.lines.length) return

    removeLine()
    renderMeme()
}

function onAddLine() {
    const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
    createNewLine(center)
    setFontColor('white')
    document.querySelector('.font-color').value = "#000000"
    const newLine = getMemes()
    document.querySelector('.txt-input').placeholder = newLine.lines.txt


    onSwitchLine()
    renderMeme()

}

function onSwitchLine() {
    var memes = getMemes()
    var currLine = memes.selectedLineIdx++
    document.querySelector('.txt-input').placeholder = memes.lines[currLine].txt
    if (memes.selectedLineIdx >= memes.lines.length) {

        document.querySelector('.font-color').value = memes.lines[currLine].color
        memes.selectedLineIdx = 0
    }
    renderMeme()
}

function getRandomImg() {
    const randomImg = getMemesImgs()
    var randomIdx = getRandomIntInclusive(1, randomImg.length - 1)
    var elImg = document.getElementById(randomIdx)
    var selectedImg = randomImg[randomIdx - 1].url

    onImgSelect(elImg, selectedImg)
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

    const elMainStorage = document.querySelector('.main-storage')
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditorContainer = document.querySelector('.editor-container')
    if (!elMainStorage.classList.contains('hidden') && elGalleryContainer.classList.contains('hidden')) {
        elMainStorage.classList.add('hidden')
        elGalleryContainer.classList.remove('hidden')
    }
    if (!elEditorContainer.classList.contains('hidden') && elGalleryContainer.classList.contains('hidden')) {
        elEditorContainer.classList.add('hidden')
        elGalleryContainer.classList.remove('hidden')
    }

    resetMemes()

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

function addListeners() {
    addMouseListeners()
    addTouchListeners()

    window.addEventListener('resize', () => {
        resizeCanvas()

        const center = { x: gElCanvas.width / 2, y: gElCanvas.height / 2 }
        updateTextPos(center)
        resizeCanvas()
    })
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
    gElCanvas.width = elContainer.clientWidth
    gElCanvas.height = elContainer.clientHeight
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

function onDown(ev) {
    gStartPos = getEvPos(ev)

    if (!selectLineOnClick(ev)) return
}

function onMove(ev) {
    const memes = getMemes()
    const isDrag = memes.lines[memes.selectedLineIdx].isDrag
    if (!isDrag) return

    const pos = getEvPos(ev)

    const dx = pos.x - gStartPos.x
    const dy = pos.y - gStartPos.y

    moveLine(dx, dy)
    gStartPos = pos
    renderMeme()
}

function onUp() {
    setLineDrag(false)
    document.body.style.cursor = 'grab'
}

function selectLineOnClick(ev) {
    const currMeme = getMemes()
    gStartPos = getEvPos(ev)
    const clickX = gStartPos.x
    const clickY = gStartPos.y
    currMeme.lines.forEach((line, idx) => {

        const textMatrix = gCtx.measureText(line.txt)
        const textWidth = textMatrix.width

        const textHeight = line.size
        const textT = line.pos.y - textHeight / 2
        const textB = line.pos.y + textHeight / 2
        const textR = line.pos.x + textWidth / 2
        const textL = line.pos.x - textWidth / 2
        if (
            clickX >= textL &&
            clickX <= textR &&
            clickY >= textT &&
            clickY <= textB
        ) {
            currMeme.selectedLineIdx = idx
            setLineDrag(true)
            document.querySelector('.txt-input').value = currMeme.lines[currMeme.selectedLineIdx].txt
            renderText(currMeme)
            renderMeme()
            document.body.style.cursor = 'grabbing'
        }
    })

}

function toggleMenu() {
    var elBody = document.body.classList.toggle('menu-open')
    var dropdownContent = document.querySelector('.main-nav-bar .dropdown-content')

    if (elBody) {
        dropdownContent.style.display = 'inline-block'
    } else {
        dropdownContent.style.display = 'none'
    }
}

function onDownloadImg(elLink) {
    const imgContent = gElCanvas.toDataURL('image/jpeg')
    elLink.href = imgContent
}

function onUploadImg() {
    const imgDataUrl = gElCanvas.toDataURL('image/jpeg')

    function onSuccess(uploadedImgUrl) {
        const url = encodeURIComponent(uploadedImgUrl)
        window.open(`https://www.facebook.com/sharer/sharer.php?u=${url}&t=${url}`)
    }
    doUploadImg(imgDataUrl, onSuccess)
}

function doUploadImg(imgDataUrl, onSuccess) {
    const formData = new FormData()
    formData.append('img', imgDataUrl)

    const XHR = new XMLHttpRequest()
    XHR.onreadystatechange = () => {
        if (XHR.readyState !== XMLHttpRequest.DONE) return
        if (XHR.status !== 200) return console.error('Error uploading image')
        const { responseText: url } = XHR

        console.log('Got back live url:', url)
        onSuccess(url)
    }
    XHR.onerror = (req, ev) => {
        console.error('Error connecting to server with request:', req, '\nGot response data:', ev)
    }
    XHR.open('POST', '//ca-upload.com/here/upload.php')
    XHR.send(formData)
}

function addKeyBoardListeners() {
    document.addEventListener('keydown', onkeydown)
}

function onkeydown(ev) {

    if (ev.key === 'ArrowDown') {
        setLinePosDown()
        renderMeme()
    }

    if (ev.key === 'ArrowUp') {
        setLinePosUp()
        renderMeme()
    }

    if (ev.key === 'ArrowLeft') {
        onSetLinePosLeft()
        renderMeme()
    }

    if (ev.key === 'ArrowRight') {
        onSetLinePosRight()
        renderMeme()
    }
}

function onSaveMemeAndImg() {
    const randomId = makeId(3)
    const canvasURL = gElCanvas.toDataURL()
    SaveCanvas(randomId, canvasURL)
}