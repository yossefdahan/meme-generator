'use strict'


var gImgFromStorage
var gMemeFromStorage

function onMoveToStorage() {
    const savedCanvas = loadCanvasFromStorage()
    const elMainStorage = document.querySelector('.main-storage')
    const elGalleryContainer = document.querySelector('.gallery-container')
    const elEditorContainer = document.querySelector('.editor-container')

    if (elMainStorage.classList.contains('hidden') && !elGalleryContainer.classList.contains('hidden')) {
        elMainStorage.classList.remove('hidden')
        elGalleryContainer.classList.add('hidden')
    }
    if (!elEditorContainer.classList.contains('hidden') && elMainStorage.classList.contains('hidden')) {
        elEditorContainer.classList.add('hidden')
        elMainStorage.classList.remove('hidden')
    }
    renderCanvasStorage(savedCanvas)
}

function renderCanvasStorage(savedCanvas) {
    var strHTMLs = savedCanvas.map(img => {
        return `<img class="img-${img.id} ${img.id}" id="${img.id}"src="${img.canvasURL}" alt="${img.id}" onclick="onSelectFromStorage(this,'${img.canvasURL}')">`
    })
    const elStorageContainer = document.querySelector('.storage-container')
    elStorageContainer.innerHTML = strHTMLs.join('')
}

function onSelectFromStorage(elImg, imgUrl) {
    const elMainStorage = document.querySelector('.main-storage')
    const elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hidden')
    elMainStorage.classList.add('hidden')

    const savedMemes = loadMemeFromStorage()
    const selectedImg = { url: imgUrl }
    var selectedLine = savedMemes[0].gMeme.lines

    SavedMeme(selectedImg, selectedLine)
    onInitEditor()
    resizeCanvas()
}

function SavedMeme(selectedImg, selectedLine) {
    gImgFromStorage = selectedImg
    gMemeFromStorage = selectedLine
}