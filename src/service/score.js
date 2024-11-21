const SCORE_LOCAL_STORAGE_NAME = "FoxGameScore";

class ScoreService {
    loadScore() {
        const savedScore = localStorage.getItem(SCORE_LOCAL_STORAGE_NAME);
        if (savedScore !== null) {
            return parseInt(savedScore, 10);
        }
        return 0;
    }

    saveScore(score) {
        localStorage.setItem(SCORE_LOCAL_STORAGE_NAME, score);
    }
}

export const scoreService = new ScoreService();