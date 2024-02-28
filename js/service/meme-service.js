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

var gMeme = {
    selectedImgId: 1,
    selectedLineIdx: 0,
    lines: [{

        txt: 'I sometimes eat Falafel',
        size: 20,
        color: 'red',
    }]
}

var gKeywordSearchCountMap = {
    'funny': 12, 'cat': 16, 'baby': 2
}


function getMemesImgs() {
    return gImgs
}

function getMemesText() {
    return gMeme
}

function getCurrSelectImg() {
    return gCurrSelectedImg
}

function setLineTxt(text) {
    gMeme.lines[gMeme.selectedLineIdx].txt = text

}

function setImg(elImgAlt) {
    var selectedImg = gImgs.find(img => img.id === +elImgAlt)
    gCurrSelectedImg = selectedImg

    gMeme.lines[gMeme.selectedLineIdx].txt = 'I sometimes eat Falafel'
    document.querySelector('.txt-input').value = ''
}

