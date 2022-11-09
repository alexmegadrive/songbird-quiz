gameService = new gameService(birdsData)
htmlService = new htmlService()


htmlService.renderLevel()
// htmlService.renderOptions()
// htmlService.setCurrentLevelTab()


document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('options__list-item')) {
        gameService.handleSelectOption(event.target.dataset.option)
        // console.log('event.target.dataset.option :', event.target.dataset.option);
    }
    if (event.target.dataset?.controls == 'nextLevel') {
        // console.log('next')
        gameService.handleNextLevel()
    }
})

// TODO
// очки
// звук при нажатии
// стартовый и финальные экраны
// кастомный плеер
// галерея птиц