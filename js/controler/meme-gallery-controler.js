'use strict'



function onInitGallery() {
    renderGallery()
}



function renderGallery() {

    const imgs = getMemesImgs()

    var strHTMLs = imgs.map(img =>

        `
<img class="${img.id}" id="${img.id}"src="${img.url}" alt="${img.id}" onclick="onImgSelect(this,'${img.url}')">
`)

    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTMLs.join('')
}


function onImgSelect(elImg, imgUrl) {
    console.log(imgUrl);


    setImg(elImg, imgUrl)



    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor-container').style.display = 'block'

    renderMeme()
}