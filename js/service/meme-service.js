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
}

]

var gMeme

var gKeywordSearchCountMap = {
    'funny': 12, 'cat': 16, 'baby': 2
}


function getMemesImgs() {
    return gImgs
}

function getMemesText() {

    console.log(gCurrSelectedImg);
    // const meme = gMeme.find(meme => meme.selectedImgId === gCurrSelectedImg.id)
    if (gCurrSelectedImg.id === gMeme.selectedImgId) {
        return gMeme
    }
    console.log(gMeme);


}

function getCurrSelectImg() {
    return gCurrSelectedImg
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text

}

function updateMeme(elImgId) {
    gMeme = {
        selectedImgId: +elImgId,
        selectedLineIdx: 0,
        lines: [{

            txt: 'I sometimes eat Falafel',
            size: 20,
            color: '',
        }]
    }

}

function setImg(elImg, imgUrl) {
    updateMeme(elImg.id)

    var selectedImg = gImgs.find(img => img.url === imgUrl)
    gCurrSelectedImg = selectedImg

    gMeme.lines[gMeme.selectedLineIdx].txt = 'I sometimes eat Falafel'
    document.querySelector('.txt-input').value = ''
}

function setFontColor(color) {
    gMeme.lines[gMeme.selectedLineIdx].color = color


}

function changeSizeUp(newSize) {
    gMeme.lines[gMeme.selectedLineIdx].size = newSize
}