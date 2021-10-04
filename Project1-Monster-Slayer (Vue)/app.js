function getRandomValue(min, max) {
    return Math.floor(Math.random() * (max - min)) + min;
}
const app = Vue.createApp({
    data() {
        return {
            playerHealth: 100,
            monsterHealth: 100,
            currentRound: 0,
            winner: null,
            specialAttackUsed: false,
            logMessages: [],
        }
    },
    computed: {
        monsterBarStyles() {
            if (this.monsterHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.monsterHealth + '%' };
        },
        playerBarStyles() {
            if (this.playerHealth < 0) {
                return { width: '0%' };
            }
            return { width: this.playerHealth + '%' };
        },
       mayUseSpecialAttack() {
           if (this.currentRound >= 3 && this.specialAttackUsed === false) {
               return false;
           } else {
               return true;
            }
        },  
        mayHeal() {
            if (this.playerHealth === 100) {
                return true;
            }
            else
                return false;
        }  
    },
    watch: {
        playerHealth(value) {
            if (value <= 0 && this.monsterHealth <=0) {
                this.winner = 'draw';
            }
            else if (value<=0){
                this.winner = 'monster';
            }   
        },
        monsterHealth(value) {
            if (value <= 0 && this.playerHealth <=0) {
                this.winner = 'draw';
            }
            else if (value<=0){
                this.winner = 'player';
            }
        }
    },
    methods: {
        startGame() {
            this.playerHealth = 100;
            this.monsterHealth = 100;
            this.currentRound = 0;
            this.winner = null;
            this.logMessages = [];
        },
        surrender() {
            this.winner = 'monster';
        },
        addLogMessage(who, what, value) {
            this.logMessages.unshift({
                actionBy: who,
                actionType: what,
                actionValue: value
            }) //add to the beginning of the array
        },
        attackMonster() {
            this.currentRound++;
            const attackValue = getRandomValue(5, 12); //formula to get a random number between 5 and 12.
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'attack', attackValue);
            this.attackPlayer();    
        },
        attackPlayer() {
            const attackValue = getRandomValue(8, 15); //formula to get a random number between 5 and 12.
            this.playerHealth -= attackValue;
            this.addLogMessage('monster', 'attack', attackValue);
        },
        specialAttackMonster() {
            this.currentRound = 0;
            const attackValue = getRandomValue(15, 20);   
            this.monsterHealth -= attackValue;
            this.addLogMessage('player', 'special', attackValue);
            this.attackPlayer();
        },
        healPlayer() {
            this.currentRound++;    
            const healValue = getRandomValue(5, 10);
            if (this.playerHealth + healValue > 100) {
                this.playerHealth = 100;
            }
            else {
                this.playerHealth += healValue;
            }     
            this.addLogMessage('player', 'heal', healValue);
            this.healMonster();
        },
        healMonster() {
            const healValue = getRandomValue(1, 3);
            if (this.monsterHealth + healValue > 100) {
                this.monsterHealth = 100;
            }
            else {
                this.monsterHealth += healValue;
            }
            this.addLogMessage('monster', 'heal', healValue);
        }
    },
})

app.mount("#game")