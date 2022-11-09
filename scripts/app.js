gameService = new gameService(birdsData)
htmlService = new htmlService()


htmlService.renderLevel()
// htmlService.renderOptions()
// htmlService.setCurrentLevelTab()


document.body.addEventListener('click', function (event) {
    if (event.target.classList.contains('options__list-item')) {
        htmlService.handleSelectOption(event.target.dataset.option)
        // console.log('event.target.dataset.option :', event.target.dataset.option);
    }
    if (event.target.dataset?.controls == 'nextLevel') {
        // console.log('next')
        htmlService.handleNextLevel()
    }
})


console.log('generateAnswers() :', gameService.answers);
