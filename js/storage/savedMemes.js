'use strict'

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

    var strHTMLs = savedCanvas.map(meme => {
        return `<img class="img-${meme.id} ${meme.id}" id="${meme.id}" src="${meme.canvasURL}" alt="${meme.id}" onclick="onSelectFromStorage('${meme.id}')">`
    })

    const elStorageContainer = document.querySelector('.storage-container')
    elStorageContainer.innerHTML = strHTMLs.join('')
}

function onSelectFromStorage(id) {
    const elMainStorage = document.querySelector('.main-storage')
    const elEditorContainer = document.querySelector('.editor-container')
    elEditorContainer.classList.remove('hidden')
    elMainStorage.classList.add('hidden')

    clearCanvas()
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')

    getById(id)
    onInitEditor()
    renderMeme()
}

function clearCanvas() {
    gElCanvas = document.querySelector('canvas')
    gCtx = gElCanvas.getContext('2d')
    gCtx.clearRect(0, 0, gElCanvas.width, gElCanvas.height)
}