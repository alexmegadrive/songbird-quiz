

class gameService {
    constructor(data=[]) {
        this.data = data
        this.answers = this.generateAnswers()
    }
    
    currentLevel = 0;
    score = 0;

    generateAnswers() {
        let answersObj = {}
        for (let i=0; i<this.data.length; i++) {
            answersObj[i] = Math.round(Math.random() * (this.data.length - 1))
        }
        return answersObj;
    }
}

