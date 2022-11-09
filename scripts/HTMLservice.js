class htmlService {
    constructor(data = []) {
        this.data = gameService.data
    }

    // currentLevel = 0;
    // score = 0;
    levelCompleted = false;

    renderLevel() {
        this.levelCompleted = false;

        const CARD = document.querySelector('.card')
        CARD.innerHTML = 'Прослушайте аудио и выберите вариант ответа'

        const LEVEL_BTN = document.querySelector('.btn--level')
        LEVEL_BTN.classList.remove('btn--active')

        LEVEL_BTN.innerText = (gameService.currentLevel == this.data.length - 1) ?
            'Начать заново' :
            'Следующий уровень'

        this.renderOptions()
        this.setCurrentLevelTab()
        this.renderQuestion()
    }

    restartGame() {
        gameService.currentLevel = 0;
        gameService.score = 0;
        this.renderLevel()
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
            <audio controls>
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

    handleSelectOption(option) {
        this.renderCard(option)
        if (!this.levelCompleted) this.checkAnswer(option)
    }

    checkAnswer(option) {
        const OPTIONS = document.querySelectorAll('.options__list-item')
        const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]

        if (+option === CORRECT_ANSWER) {
            const LEVEL_BTN = document.querySelector('.btn--level')
            LEVEL_BTN.classList.add('btn--active')
            OPTIONS[option].classList.add('options__list-item--correct')
            this.levelCompleted = true;
            this.revealCorrectAnswer()
        } else {
            OPTIONS[option].classList.add('options__list-item--error')
        }
    }
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
        // const CURRENT_LEVEL = gameService.currentLevel
        // const CARD_IMG = document.querySelector('.card__image')
        // const CARD_TITLE = document.querySelector('.card__title')
        // const CARD_TITLE_LATIN = document.querySelector('.card__title-latin')
        // const CARD_MEDIA = document.querySelector('.card__media')
        // const CARD_INFO = document.querySelector('.card__info')

        // CARD_TITLE.innerText = this.data[CURRENT_LEVEL][option].name
        // CARD_TITLE_LATIN.innerText = this.data[CURRENT_LEVEL][option].species
        // CARD_INFO.innerText = this.data[CURRENT_LEVEL][option].description
        // CARD_IMG.src = this.data[CURRENT_LEVEL][option].image
        // CARD_MEDIA.src = this.data[CURRENT_LEVEL][option].audio
        // // console.log('this.data[CURRENT_LEVEL][option] :', this.data[CURRENT_LEVEL][option]);
        // // console.log('this.data[CURRENT_LEVEL][option].title :', this.data[CURRENT_LEVEL][option].title);

    }

    revealCorrectAnswer() {
        const CURRENT_LEVEL = gameService.currentLevel
        const CORRECT_ANSWER = gameService.answers[gameService.currentLevel]
        const TITLE = document.querySelector('.quiz-question__title')
        const IMAGE = document.querySelector('.quiz-question__image')
        TITLE.innerText = this.data[CURRENT_LEVEL][CORRECT_ANSWER].name
        IMAGE.src = this.data[CURRENT_LEVEL][CORRECT_ANSWER].image
    }

    handleNextLevel() {
        if (this.levelCompleted) {

            if (gameService.currentLevel !== this.data.length - 1) {
                gameService.currentLevel++
                this.renderLevel()
            } else this.restartGame()
        }
    }
}