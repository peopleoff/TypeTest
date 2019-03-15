<template>
  <div id="index">
    <div id="main-body" class="container">
      <section id="instructions" class="row">
        <h3>Instructions</h3>
        Type as many words as possible in
        <span class="green-text">{{secondsLeft}}</span> seconds!
        <br>
        High Scores for each mode are displayed under the mode selection
        <br> Start typing to start the timer.
      </section>
      <section id="mode" class="row">
        <h3>Mode:</h3>
        <div class="col s12 m8 offset-m2" id="modeButtons">
          <button class="btn waves-effect waves-light active" v-on:click="changeMode(0)" id="mode0">
            Common
            <br> ({{highScores[0]}})
          </button>
          <button class="btn waves-effect waves-light" v-on:click="changeMode(1)" id="mode1">
            Easy
            <br> ({{highScores[1]}})
          </button>
          <button class="btn waves-effect waves-light" v-on:click="changeMode(2)" id="mode2">
            Medium
            <br> ({{highScores[2]}})
          </button>
          <button class="btn waves-effect waves-light" v-on:click="changeMode(3)" id="mode3">
            Hard
            <br> ({{highScores[3]}})
          </button>

        </div>
      </section>

      <section id="wordList" class="row  grey lighten-2 z-depth-3">
        <span v-for="(word,index) in currentWords" class="col s6 flow-text" v-bind:class="wordSpacing" :key="index">
          <span v-bind:class="{ 'green-text': !index }">{{currentWords[index]}}</span>
        </span>
      </section>

      <section id="typingInput" class="row">
        <div class="col s5 offset-s3">
          <input type="text" id="input" class="white-text" autofocus v-model="input" v-on:keyup.space="checkWord()">
        </div>
        <div class="col s1">
          <a class="btn-floating btn-large waves-effect teal lighten-1" v-on:click="resetGame()">
            <i class="material-icons">refresh</i>
          </a>
        </div>
      </section>

      <div class="divider"></div>

      <section id="finishedWords" class="row">
        <div class="completed col s6">
          <h4>Completed Words</h4>
          <br>
          <span class="green-text" v-for="(word,index) in completedWords" :key="index">
            {{word}}
            <span v-if="index !== completedWords.length - 1">,</span>
          </span>
        </div>
        <div class="failed col s6">
          <h4>Failed Words</h4>
          <br>
          <span class="red-text" v-for="(word,index) in failedWords" :key="index">
            {{word}}
            <span v-if="index !== failedWords.length - 1">,</span>
          </span>
        </div>
      </section>
    </div>
    <div id="modals">
      <!-- Modal Structure -->
      <div id="game-over-modal" class="modal modal-fixed-footer">
        <div class="modal-content">
          <h3>Congratulations!</h3>
          <h4>You finished at
            <p class="green-text">{{WPM}} WPM </p>
          </h4>
        </div>
        <div class="modal-footer">
          <button class="btn modal-trigger" v-on:click="closeModal()">Continue</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  let wordAPI = require('../services/Api.js')

  export default {
    name: 'Index',
    data() {
      return {
        gameRunning: false,
        modeID: 0,
        input: "",
        secondsLeft: 60,
        intervalID: "",
        words: [],
        currentWords: [],
        completedWords: [],
        failedWords: [],
        highScores: {
          0: 0,
          1: 0,
          2: 0,
          3: 0
        }
      }
    },
    methods: {
      getNewWord: function () {
        this.currentWords.splice(0, 1);
        this.currentWords.push(this.words[Math.floor(Math.random() * this.words.length)]);
      },
      checkWord: function () {
        if (this.gameRunning) {
          if (this.input.trim() === this.currentWords[0].trim()) {
            this.completedWords.push(this.currentWords[0]);
            this.getNewWord();
            this.input = "";
          } else {
            this.failedWords.push(this.currentWords[0]);
            this.getNewWord();
            this.input = "";
          }
        } else {
          this.input = "";
        }
      },
      setupGame: function () {
        this.words = wordAPI.showJSON(this.modeID);
        this.currentWords = this.words;
      },
      resetGame: function () {
        this.secondsLeft = 60;
        this.input = "";
        this.gameRunning = false;
        this.completedWords = [];
        this.failedWords = [];
        this.setupGame();
      },
      changeMode: function (modeID) {
        let buttons = document.getElementsByClassName('waves-light');
        let newButton = document.getElementById('mode' + modeID);
        for (let i = 0; i < buttons.length; i++) {
          buttons[i].classList.remove('active');
        }
        newButton.classList.add('active');
        this.modeID = modeID;
      },
      closeModal: function () {
        var modal = document.getElementById('game-over-modal');
        var body = document.getElementById('main-body');
        modal.style.display = "none";
        body.classList.remove("blurred");
      },
      startGame: function () {
        this.gameRunning = true;
      },
      countdownTimer: function () {
        let self = this;
        if (this.secondsLeft === 60) {
          this.intervalID = setInterval(function () {
            self.secondsLeft--
          }, 1000)
        }
      },
    },
    mounted() {
      this.setupGame();
      if (localStorage.getItem('highScores')) this.highScores = JSON.parse(localStorage.getItem('highScores'));
    },
    watch: {
      gameRunning: function (nv) {
        if (nv) {
          this.countdownTimer()
        } else {
          clearInterval(this.intervalID);
        }
      },
      modeID: function () {
        this.resetGame();
      },
      secondsLeft: function (nv) {
        if (nv === 0) {
          this.gameRunning = false;
          var modal = document.getElementById('game-over-modal');
          var body = document.getElementById('main-body');
          modal.style.display = "block";
          body.classList.add("blurred");
          if (this.highScores[this.modeID] < this.completedWords.length) {
            this.highScores[this.modeID] = this.completedWords.length;
            localStorage.setItem('highScores', JSON.stringify(this.highScores));
          }
        }
      },
      input: function (nv) {
        if (nv !== "" && this.secondsLeft === 60) {
          this.startGame();
        }
      },
    },
    computed: {
      WPM: function () {
        return (this.completedWords.length);
      },
      wordSpacing: function () {
        switch (this.modeID) {
          case 0:
            return "m3"
          case 1:
            return "m3"
          case 2:
            return "m4"
          case 3:
            return "m6"
          default:
            break;
        }
      }
    }
  }
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
  .blurred {
    -webkit-filter: blur(5px) grayscale(50%);
    -webkit-transform: scale(0.9);
    filter: blur(5px) grayscale(50%);
    transform: scale(0.9);
    transition: all 0.4s ease;
    pointer-events: auto;
  }

  .active {
    color: #26a69a;
    background: #fff;
    border: 1px solid #26a69a;
  }

  .waves-effect {
    overflow: visible;
  }

  #main-body {
    transition: all 0.4s ease;
    -webkit-transform: translateZ(0);
    transform: translateZ((0));
  }

  #modeButtons {
    display: flex;
    justify-content: space-around
  }

  .modal {
    top: 8rem;
    max-height: 31%;
    color: black;

  }

  #wordList {
    color: black;
    padding: 10px;
    margin-top: 2em;
    font-size: 2rem;
    height: 4em;
    overflow: hidden;
  }

  #finishedWords div {
    height: 15em;
    overflow-y: scroll;
  }

  #finishedWords div::-webkit-scrollbar {
    display: none;
  }

  .completed {
    border-right: 1px solid #e0e0e0;
  }

  .failed {
    border-left: 1px solid #e0e0e0;
  }

  section {
    margin: 2rem 0;
  }

  @media only screen and (max-width: 770px) {
    #wordList {
      height: 7rem;
    }

    h4 {
      font-size: 1.5rem;
    }
  }

  @media only screen and (max-width: 500px) {
    #wordList {
      height: 6rem;
    }
  }

  @media only screen and (max-width: 300px) {
    #wordList span {
      width: 100%;
    }

    h4 {
      font-size: 1rem;
    }
  }
</style>