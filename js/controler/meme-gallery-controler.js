'use strict'



function onInitGallery() {
    renderGallery()
}



function renderGallery() {

    const imgs = getMemesImgs()

    var strHTMLs = imgs.map(img =>

        `
<img class="${img.id}" src="${img.url}" alt="${img.id}" onclick="onImgSelect(this)">
`)

    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTMLs.join('')
}


function onImgSelect(elImg) {
    setImg(elImg.alt)
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'block'

    renderMeme()
}