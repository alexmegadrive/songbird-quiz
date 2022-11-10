class htmlService {
    constructor(data = []) {
        this.data = gameService.data
    }


    renderLevel() {
        gameService.levelCompleted = false;

        const CARD = document.querySelector('.card')
        CARD.innerHTML = 'Прослушайте аудио и выберите вариант ответа'

        const LEVEL_BTN = document.querySelector('.btn--level')
        LEVEL_BTN.classList.remove('btn--active')

        LEVEL_BTN.innerText = (gameService.currentLevel == this.data.length - 1) ?
            'Показать результаты' :
            'Следующий уровень'

        this.renderOptions()
        this.setCurrentLevelTab()
        this.renderQuestion()
        this.renderScore()
    }

   

    renderOptions() {
        const OPTIONS_LIST = document.querySelector('.options__list')
        const CURRENT_LEVEL = gameService.currentLevel

        OPTIONS_LIST.innerHTML = ''
        for (let i = 0; i < this.data[CURRENT_LEVEL].length; i++) {
            let li = document.createElement('li')
            li.className = 'options__list-item'
            li.innerText = this.data[CURRENT_LEVEL][i].name
            li.dataset.option = i
            OPTIONS_LIST.append(li)
        }

    }

    renderQuestion() {
        const CURRENT_LEVEL = gameService.currentLevel
        // const AUDIO = document.querySelector('.quiz-question__audio')
        const QUESTION_CONTAINER = document.querySelector('.quiz-question')
        const CORRECT_ANSWER = gameService.answers[CURRENT_LEVEL]
        // console.log('current answer :', gameService.answers[CURRENT_LEVEL]);
        // console.log('audio src', this.data[CURRENT_LEVEL][CORRECT_ANSWER].audio)

        QUESTION_CONTAINER.innerHTML = `
        <img class="quiz-question__image" src="/img/unknown-bird.jpg" alt="bird">
        <div class="quiz-question__info">
            <h3 class="quiz-question__title">*****</h3>
            <div class="quiz-question__audio">
            <div class="playback-button">
            <svg class="playback-play" viewBox="-200 0 1200 1000"><path fill="#00bc8c" d="M96.51 11.97c-31.23 8.05-53.26 32.76-63.42 71.27-3.45 12.84-3.64 29.7-3.64 416.71s.19 403.87 3.64 416.71c16.09 60.74 61.69 86.03 120.9 67.25 9-2.87 53.65-25.1 116.49-58.24 56.14-29.51 221.29-116.3 367.28-192.93 145.99-76.64 271.29-143.31 278.38-148.1 39.28-25.68 59.59-63.04 53.26-97.52-4.79-26.63-24.33-53.07-52.88-71.65C892 399.37 172.58 22.32 154.95 16.38c-18.97-6.33-43.3-8.24-58.44-4.41z"></path></svg>
            <svg class="playback-pause" viewBox="0 0 47.607 47.607"><path fill="#00bc8c" d="M17.991 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345zM42.877 40.976a6.631 6.631 0 01-13.262 0V6.631a6.631 6.631 0 0113.262 0v34.345z"></path></svg>
            </div>
            <audio id="question-audio" controls loop>
            <source class="card__media" src='${this.data[CURRENT_LEVEL][CORRECT_ANSWER].audio}' type="audio/mpeg"></source>
          </audio>
            </div>
        </div>
        `
        // AUDIO.innerHTML = `
        // <audio controls>
        //             <source class="card__media" src='${this.data[CURRENT_LEVEL][CORRECT_ANSWER].audio}' type="audio/mpeg"></source>
        //           </audio>
        // `

    }

    setCurrentLevelTab() {
        const LEVEL_ITEMS = document.querySelectorAll('.progress__item')
        const CURRENT_LEVEL = gameService.currentLevel
        for (let i = 0; i < LEVEL_ITEMS.length; i++) {
            if (i == CURRENT_LEVEL) LEVEL_ITEMS[i].classList.add('progress__item--active')
            else LEVEL_ITEMS[i].classList.remove('progress__item--active')
        }
    }

    // handleSelectOption(option) {
    //     this.renderCard(option)
    //     if (!gameService.levelCompleted) this.checkAnswer(option)
    // }

    // checkAnswer(option) {
    //     const OPTIONS = document.querySelectorAll('.options__list-item')
    //     const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]
    //     if (+option === CORRECT_ANSWER) {
    //         const LEVEL_BTN = document.querySelector('.btn--level')
    //         LEVEL_BTN.classList.add('btn--active')
    //         OPTIONS[option].classList.add('options__list-item--correct')
    //         gameService.levelCompleted = true;
    //         this.revealCorrectAnswer()
    //         gameService.handleCorrectAnswer()
    //     } else {
    //         gameService.handleWrongAnswer()
    //         OPTIONS[option].classList.add('options__list-item--error')
    //     }
    //     this.renderScore()
    // }

    renderCard(option) {
        const CURRENT_LEVEL = gameService.currentLevel
        const CARD = document.querySelector('.card')
        CARD.innerHTML = `
        <img class="card__image" src="${this.data[CURRENT_LEVEL][option].image}" alt="">
                <div class="card__title">${this.data[CURRENT_LEVEL][option].name}</div>
                <div class="card__title-latin">${this.data[CURRENT_LEVEL][option].species}
                </div>
                <audio controls>
                    <source class="card__media" src='${this.data[CURRENT_LEVEL][option].audio}' type="audio/mpeg"></source>
                  </audio>
                <div class="card__info">${this.data[CURRENT_LEVEL][option].description}</div>
           
        `
    }

    revealCorrectAnswer() {
        const CURRENT_LEVEL = gameService.currentLevel
        const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]
        const TITLE = document.querySelector('.quiz-question__title')
        const IMAGE = document.querySelector('.quiz-question__image')
        TITLE.innerText = this.data[CURRENT_LEVEL][CORRECT_ANSWER].name
        IMAGE.src = this.data[CURRENT_LEVEL][CORRECT_ANSWER].image
    }

    renderScore() {
        let SCORE = document.querySelector('#score')
        SCORE.innerText = gameService.score
    }

    navigateResults() {

    }

    // handleNextLevel() {
    //     if (gameService.levelCompleted) {

    //         if (gameService.currentLevel !== this.data.length - 1) {
    //             gameService.currentLevel++
    //             this.renderLevel()
    //         } else this.restartGame()
    //     }
    // }
    toggleAudioPlayPause(button) {
        // console.log(button)
        const AUDIO = document.querySelector('#question-audio')
        if (button.classList.contains('playback-button--playing')) {
            AUDIO.pause()
        } else {
            AUDIO.play()
        }
        button.classList.toggle('playback-button--playing')
    }
}