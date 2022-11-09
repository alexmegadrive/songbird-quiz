

class gameService {
    constructor(data=[]) {
        this.data = data
        this.answers = this.generateAnswers()
    }

    currentLevel = 0;
    score = 0;
    levelCompleted = false;

    generateAnswers() {
        let answersObj = {}
        for (let i=0; i<this.data.length; i++) {
            answersObj[i] = Math.round(Math.random() * (this.data.length - 1))
        }
        return answersObj;
    }

    handleCorrectAnswer() {
        
    }
    
    handleWrongAnswer() {

    }

    handleSelectOption(option) {
        htmlService.renderCard(option)
        if (!this.levelCompleted) this.checkAnswer(option)
    }

    checkAnswer(option) {
        const OPTIONS = document.querySelectorAll('.options__list-item')
        const CORRECT_ANSWER = this.answers[this.currentLevel]
        if (+option === CORRECT_ANSWER) {
            const LEVEL_BTN = document.querySelector('.btn--level')
            LEVEL_BTN.classList.add('btn--active')
            OPTIONS[option].classList.add('options__list-item--correct')
            this.levelCompleted = true;
            htmlService.revealCorrectAnswer()
            this.handleCorrectAnswer()
        } else {
            this.handleWrongAnswer()
            OPTIONS[option].classList.add('options__list-item--error')
        }
        htmlService.renderScore()
    }

    handleNextLevel() {
        if (this.levelCompleted) {
            if (this.currentLevel !== this.data.length - 1) {
                this.currentLevel++
                htmlService.renderLevel()
            } else htmlService.navigateResults()
        }
    }

    restartGame() {
        gameService.currentLevel = 0;
        gameService.score = 0;
        htmlService.renderLevel()
    }
}

