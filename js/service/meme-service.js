'use strict'

let gCurrSelectedImg
const IMG_DB = 'imgDB'
const MEME_DB = 'memeDB'

var gSavedImg = []
var gSavedMeme = []

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

function getMemes() {
    return gMeme
}

function getCurrSelectImg() {
    return gCurrSelectedImg
}

function getStoredImgs() {
    return loadImageFromStorage()
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text
}

function setImg(elImg, imgUrl, imgId) {
    gMeme.selectedImgId = imgId
    // var selectedImg = gImgs.find(img => img.url === imgUrl)
    // gCurrSelectedImg = selectedImg

    // gMeme.lines[gMeme.selectedLineIdx].txt
    // document.querySelector('.txt-input').placeholder = gMeme.lines[gMeme.selectedLineIdx].txt
}

function createNewLine(center) {
    const { x, y } = center
    var newLine = {
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

function setLinePosDown() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y += 10
}

function setLinePosUp() {
    gMeme.lines[gMeme.selectedLineIdx].pos.y -= 10
}

function setLinePosRight() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += 10
}

function setLinePosLeft() {
    gMeme.lines[gMeme.selectedLineIdx].pos.x -= 10
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
}

function removeLine() {
    gMeme.lines = gMeme.lines.filter((line, idx) => idx !== gMeme.selectedLineIdx)
    if (gMeme.selectedLineIdx != 0) gMeme.selectedLineIdx--
}

function setFontFamily(value) {
    gMeme.lines[gMeme.selectedLineIdx].font = value
}

function updateAlignToCenter(align) {
    gMeme.lines[gMeme.selectedLineIdx].align = align
}

function setLineDrag(isDrag) {
    gMeme.lines[gMeme.selectedLineIdx].isDrag = isDrag
}

function moveLine(dx, dy) {
    gMeme.lines[gMeme.selectedLineIdx].pos.x += dx
    gMeme.lines[gMeme.selectedLineIdx].pos.y += dy
}

function saveCanvasToStorage(img) {
    saveToStorage(IMG_DB, img)
}

function saveMemeToStorage(memes) {

    saveToStorage(MEME_DB, memes)
}

function getById(id) {
    const memesFromStorage = loadFromStorage('memeDB')

    const wantedMemeIdx = memesFromStorage.findIndex(m => m.id === id)


    gMeme = memesFromStorage[wantedMemeIdx].gMeme
    console.log(memesFromStorage[wantedMemeIdx].gMeme);
    if (wantedMemeIdx !== -1) return gMeme
    else console.error('meme was not found in storage')
}

function SaveCanvas(id, canvasURL) {
    const savedMemes = loadFromStorage('memeDB') || []
    savedMemes.push({ id, canvasURL, gMeme })

    saveMemeToStorage(savedMemes)
}

function loadCanvasFromStorage() {
    return loadFromStorage('memeDB')
}

function loadImageFromStorage() {
    return loadFromStorage('imgDB')
}

function AddToImgs(img) {

    var count = gImgs.length + 1

    const newImg = {
        id: count,
        url: img.src,
        keywords: ['funny', 'cat']
    }
    gImgs.push(newImg)
    renderGallery()

    saveToStorage(IMG_DB, gImgs)
}

function resetMemes() {
    gMeme = {
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

}

