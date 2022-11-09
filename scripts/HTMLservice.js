class htmlService {
    constructor(data=[]) {
        this.data = gameService.data
    }

    // currentLevel = 0;
    // score = 0;

    renderLevel() {
        this.renderOptions()
        this.setCurrentLevelTab()
        this.renderQuestion()
    }

    renderOptions() {
        const OPTIONS = document.querySelectorAll('.options__list-item')
        const CURRENT_LEVEL = gameService.currentLevel
        for (let i=0; i<OPTIONS.length; i++) {
            OPTIONS[i].innerText = this.data[CURRENT_LEVEL][i].name
            OPTIONS[i].dataset.option = i
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
        for (let i=0; i<LEVEL_ITEMS.length; i++) {
            if (i == CURRENT_LEVEL) LEVEL_ITEMS[i].classList.add('progress__item--active')
            else LEVEL_ITEMS[i].classList.remove('progress__item--active')
        }
    }

    handleClick(option) {
        this.renderCard(option)
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
}