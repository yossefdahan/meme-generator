'use strict'


function onMoveToStorage() {
    const savedImgs = loadImgFromStorage()
    const savedMemes = loadMemeFromStorage()
    document.querySelector('.gallery-container').style.display = 'none'
    // renderStorage(savedImgs, savedMemes)
    renderMemeStorage()
}

function renderStorage(savedImgs, savedMemes) {
    const memes = savedMemes
    const images = savedImgs
    const elStorageContainer = document.querySelector('.storage-container')
    console.log('Type of memes:', typeof savedMemes)
    console.log('loaded Img', images);
    console.log('loaded meme', memes);


    var strHTMLs = Object.keys(savedMemes).forEach((key, idx) => {
        const meme = savedMemes[key]
        const elMeme = document.createElement('div')
        elMeme.classList.add('saved-meme')
        elMeme.textContent = `Meme${idx + 1}`

        elMeme.addEventListener('click', () => {
            openSavedEditor(meme)

        })

        elStorageContainer.appendChild(elMeme)
        return elMeme.outerHTML
    })



    //         `
    // <img class="${img.id}" id="${img.id}"src="${img.url}" 
    // alt="${img.id}" onclick="onImgSelect(this,'${img.url}')">

    // `)

    // elStorageContainer.innerHTML = strHTMLs.join('')

}

function renderMemeStorage() {

}


function SavedMeme() {
    // const savedMemes=
}

