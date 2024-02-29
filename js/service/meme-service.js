'use strict'

let gCurrSelectedImg


var gImgs = [{
    id: 1,
    url: 'img/1.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 2,
    url: 'img/2.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 3,
    url: 'img/3.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 4,
    url: 'img/4.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 5,
    url: 'img/5.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 6,
    url: 'img/6.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 7,
    url: 'img/7.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 8,
    url: 'img/8.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 9,
    url: 'img/9.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 10,
    url: 'img/10.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 11,
    url: 'img/11.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 12,
    url: 'img/12.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 13,
    url: 'img/13.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 14,
    url: 'img/14.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 15,
    url: 'img/15.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 16,
    url: 'img/16.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 17,
    url: 'img/17.jpg',
    keywords: ['funny', 'cat']
},
{
    id: 18,
    url: 'img/18.jpg',
    keywords: ['funny', 'cat']
}

]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        color: '#ffffff',
        stroke: 'black',
        isDrag: false,
        font: 'Impact',
        align: 'center',
        pos: {
            x: 250,
            y: 250,
        },
        wordSize: {
            width: 200,
            height: 20,
        }
    }]
}


var gKeywordSearchCountMap = {
    'funny': 12, 'cat': 16, 'baby': 2
}


function getMemesImgs() {


    return gImgs
}

function getMemesText() {
    // const meme = gMeme.find(meme => meme.selectedImgId === gCurrSelectedImg.id)
    if (gCurrSelectedImg && gCurrSelectedImg.id === gMeme.selectedImgId) {
        return gMeme
    }
}

function getCurrSelectImg() {
    return gCurrSelectedImg
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text

}

function setImg(elImg, imgUrl) {

    gMeme.selectedImgId = +elImg.id
    var selectedImg = gImgs.find(img => img.url === imgUrl)
    gCurrSelectedImg = selectedImg

    gMeme.lines[gMeme.selectedLineIdx].txt = gMeme.lines[gMeme.selectedLineIdx].txt
    // document.querySelector('.txt-input').value = ''
}

function createNewLine(center) {
    console.log(center);
    const { x, y } = center
    console.log(x, y);
    var newLine =
    {
        txt: 'more....',
        size: 20,
        color: 'white',
        font: 'Impact',
        stroke: 'black',
        align: 'center',
        isDrag: false,
        pos: {
            x: x,
            y: y
        },
        wordSize: {
            width: 200,
            height: 20,
        }
    }

    gMeme.lines.push(newLine)
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color
}

function changeSizeUp() {
    gMeme.lines[gMeme.selectedLineIdx].size += 1
}
function changeSizeDown() {
    gMeme.lines[gMeme.selectedLineIdx].size -= 1
}

function updateTextPos(center) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = center.x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = center.y
}

function getNewLinePos(x, y, width, height) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x = x
    gMeme.lines[gMeme.selectedLineIdx].pos.y = y
    gMeme.lines[gMeme.selectedLineIdx].wordSize.width = width
    gMeme.lines[gMeme.selectedLineIdx].wordSize.height = height
    console.log(x, y, width, height);
}

function removeLine(currLine) {
    console.log(currLine);


    if (gMeme.lines.length === 0) {
        gMeme.lines.selectedLineIdx = 0
    } else {
        gMeme.lines.selectedLineIdx = Math.max(0, gMeme.lines.selectedLineIdx - 1)
    }
    gMeme.lines.splice(gMeme.lines[currLine], 1)

}

function setFontFamily(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function updateAlignToCenter(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function isLineClicked({ x, y }) {
    const { pos, wordSize } = gMeme.lines[gMeme.selectedLineIdx]


    return x >= pos.x && x <= pos.x + wordSize.width &&
        y >= pos.y && y <= pos.y + wordSize.height


}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag

}

function moveLine(dx, dy) {
    const line = gMeme.lines[gMeme.selectedLineIdx]
    const { pos, size, isDrag } = line
    const clickX = ev.offsetX
    const clickY = ev.offsetY

    const textWidth = gCtx.measureText(line.txt).width
    const textHeight = line.size
    const textX = line.pos.x - textWidth / 2

    const textY = line.pos.y + (currMeme.selectedLineIdx * 50) - textHeight / 2
    return (
        clickX >= textX &&
        clickX <= textX + textWidth &&
        clickY >= textY &&
        clickY <= textY + textHeight
    )

    pos.x += dx
    pos.y += d

    console.log(gElCanvas.width, gElCanvas.height)

    if (pos.x < 0) pos.x = 0
    if (pos.y < 0) pos.y = 0
    if (pos.x + gCtx.measureText(line.txt).width > gElCanvas.width) {
        pos.x = gElCanvas.width - gCtx.measureText(line.txt).width

    }
    if (pos.y + size > gElCanvas.height) {

        pos.y = gElCanvas.height - size
    }
    renderText(getMemesText())
}

function selectLineOnClick(ev) {

    const currMeme = getMemesText()
    const clickX = ev.offsetX
    const clickY = ev.offsetY
    gStartPos = getEvPos(ev)
    currMeme.lines.forEach((line, idx) => {

        const textWidth = gCtx.measureText(line.txt).width
        const textHeight = line.size
        const textX = line.pos.x - textWidth / 2
        const textY = line.pos.y + (idx * 50) - textHeight / 2

        if (
            clickX >= textX &&
            clickX <= textX + textWidth &&
            clickY >= textY &&
            clickY <= textY + textHeight
        ) {
            currMeme.selectedLineIdx = idx
            renderText(currMeme)
            document.querySelector('.txt-input').value = currMeme.lines[currMeme.selectedLineIdx].txt

            renderMeme()
            return
        }
    })
}