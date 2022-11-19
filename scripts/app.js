console.log(`Самопроверка \n 
260/270 баллов \n 
Сделал все, кроме "локализация приложения на два языка, выбранный язык хранится в local storage и сохраняется при перезагрузке +10" \n
Ссылка на галерею птиц - на стартовом экране \n
Кастомный аудиоплеер с функционалом перемотки и изменения громкости присутствует \n
В пункте "после правильного ответа на последний вопрос игрок переходит к странице с результатами викторины +10" для удобства сделал не автопереход, а изменение поведения кнопки на "Показать результаты", чтобы игрок мог дослушать пение на последнем экране \n
`)

gameService = new gameService(birdsData)
htmlService = new htmlService()

htmlService.renderLevel()

document.body.addEventListener('click', function (event) {

    if (event.target.classList.contains('playback-progress-container')) {
        let percent = event.offsetX / event.target.offsetWidth
        htmlService.seekTrack(event.target.dataset.progress, percent)
    }
    if (event.target.classList.contains('options__list-item')) {
        gameService.handleSelectOption(event.target.dataset.option)
    }
    if (event.target.dataset?.controls == 'nextLevel') {
        gameService.handleNextLevel()
    }
    if (event.target.dataset?.controls == 'startGame') {
        htmlService.handleStartGame()
    }
    if (event.target.dataset?.controls == 'newGame') {
        gameService.restartGame()
    }
    if (event.target.dataset?.controls == 'showResults') {
        htmlService.handleShowResults()
    }

    if (event.target.classList.contains('playback-button')) {
        htmlService.toggleAudioPlayPause(event.target)
    }
})

document.body.addEventListener("input", function (event) {
    htmlService.handleChangeVolume(event.target)
});
