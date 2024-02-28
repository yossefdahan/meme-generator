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
}

]

var gMeme = {
    selectedImgId: 0,
    selectedLineIdx: 0,
    lines: [{
        txt: 'I sometimes eat Falafel',
        size: 20,
        color: '',
        pos: {
            x: 50,
            y: 100,
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
    if (gCurrSelectedImg.id === gMeme.selectedImgId) {
        return gMeme
    }
    return
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

function createNewLine() {
    var newLine =
    {
        txt: 'more....',
        size: 20,
        color: '',
    }

    gMeme.lines.push(newLine)
    console.log(gMeme);
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