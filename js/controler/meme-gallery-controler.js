'use strict'


function onInitGallery() {
    renderGallery()
}

function renderGallery() {
    const imgs = getMemesImgs()

    var strHTMLs = imgs.map(img =>
    `
<img class="img-${img.id} ${img.id}" id="${img.id}"src="${img.url}" alt="${img.id}" onclick="onImgSelect(this,'${img.url}')">
`)
    const elImgsContainer = document.querySelector('.imgs-container')
    elImgsContainer.innerHTML = strHTMLs.join('')
}

function onImgSelect(elImg, imgUrl) {
    setImg(elImg, imgUrl)
    document.querySelector('.gallery-container').style.display = 'none'
    document.querySelector('.editor-container').classList.remove('hidden')
    onInitEditor()
    renderMeme()
    resizeCanvas()
}

function onImgInput(ev) {
    loadImageFromInput(ev, AddToImgs)
}

function loadImageFromInput(ev, onImageReady) {
    const reader = new FileReader()

    reader.onload = ev => {
        let img = new Image()
        img.src = ev.target.result
        img.onload = () => onImageReady(img)
    }
    reader.readAsDataURL(ev.target.files[0])
}

function getRandomImgUrl() {


}